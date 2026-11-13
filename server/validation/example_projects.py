# Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
# SPDX-License-Identifier: MIT
"""Validate ordinary example projects through the running application API.

Secrets are read only to authenticate the local request and are never printed.
All model output, tool calls, HTTP attempts and snapshots come from actual runs.
"""
import argparse
import concurrent.futures
import json
import time
import urllib.error
import urllib.request
import uuid
from pathlib import Path

class Client:
    def __init__(self, connection, project=None):
        self.connection, self.project = connection, project

    def call(self, path, body=None, method=None):
        connection = json.loads(self.connection.read_text())
        headers = {'Authorization': 'Bearer ' + connection['token'], 'Content-Type': 'application/json'}
        if self.project:
            headers['X-FlowGram-Project'] = self.project
        request = urllib.request.Request(connection['endpoint'] + path, json.dumps(body).encode() if body is not None else None,
                                         headers, method=method or ('POST' if body is not None else 'GET'))
        try:
            with urllib.request.urlopen(request, timeout=240) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            raise RuntimeError(str(error.code) + ': ' + error.read().decode()) from None

    def run(self, workflow, inputs=None, session=None):
        run = self.call('/api/workflows/' + workflow['id'] + '/run', {'inputs': defaults(workflow) if inputs is None else inputs, 'sessionId': session})
        deadline = time.monotonic() + 240
        while time.monotonic() < deadline:
            detail = self.call('/api/runs/' + run['id'])
            if detail['run']['status'] != 'running':
                return detail
            time.sleep(.15)
        raise RuntimeError('Example run did not finish within 240 seconds')

def defaults(workflow):
    start = next(n for n in workflow['schema']['nodes'] if n['type'] == 'start')
    return {k: v['default'] for k, v in start['data']['outputs']['properties'].items()}

def nodes(schema):
    for node in schema['nodes']:
        yield node
        yield from nodes({'nodes': node.get('blocks', [])})

def require(detail, status='succeeded'):
    if detail['run']['status'] != status:
        raise AssertionError(str(detail['run']['error']))

def evidence(client, detail):
    executions = []
    parents = [None]
    while parents:
        parent = parents.pop()
        cursor = None
        while True:
            path = '/api/runs/' + detail['run']['id'] + '?view=executions'
            if parent is not None: path += '&parent=' + parent
            if cursor is not None: path += '&cursor=' + str(cursor)
            page = client.call(path)
            executions.extend(page['executions'])
            parents.extend(e['id'] for e in page['executions'] if e['children'])
            cursor = page.get('nextCursor')
            if cursor is None: break
    kinds = {kind: sum(e['kind'] == kind for e in executions) for kind in ['node', 'model', 'tool', 'http']}
    return {'runId': detail['run']['id'], 'status': detail['run']['status'], 'executions': kinds}

def validate_project(connection, project, models, http_endpoint, reuse_models=False):
    client = Client(connection, project['id'])
    inventory = client.call('/api/bootstrap')
    workflows = inventory['workflows']
    assert len(workflows) == 3, project['name']
    assert len(inventory['sessions']) == 3, project['name']
    result = {'projectId': project['id'], 'name': project['name'], 'nodes': sum(len(list(nodes(w['schema']))) for w in workflows), 'runs': []}
    session = next(s['id'] for s in inventory['sessions'] if s['title'].startswith(('搭建', 'Build')))
    for workflow in workflows:
        assert client.call('/api/workflows/' + workflow['id'] + '/validate', {})['valid']
        model_nodes = [n for n in nodes(workflow['schema']) if n['type'] in ['agent', 'llm']]
        if model_nodes and not models: continue
        candidates = [r for r in inventory['runs'] if r['workflowId'] == workflow['id'] and r['revision'] == workflow['revision'] and r['status'] == 'succeeded' and r['inputs'] == defaults(workflow)] if reuse_models and model_nodes else []
        detail = client.call('/api/runs/' + candidates[0]['id']) if candidates else client.run(workflow, session=session)
        require(detail)
        record = evidence(client, detail)
        record['workflow'] = workflow['name']
        if model_nodes:
            assert record['executions']['model'] >= len(model_nodes), record
            if any(n['type'] == 'agent' for n in model_nodes):
                assert record['executions']['tool'] >= 1, record
        result['runs'].append(record)
        if 'drafts' in detail['run']['outputs']:
            quality = next(w for w in workflows if any(n['id'] == 'channel_limit' for n in nodes(w['schema'])))
            checked = client.run(quality, {'drafts': detail['run']['outputs']['drafts']}, session)
            require(checked)
            assert len(checked['run']['outputs']['results']) == 3
            result['runs'].append(evidence(client, checked))
    if http_endpoint:
        operation = next((w for w in workflows if any(n['id'] == 'retry' for n in nodes(w['schema']))), None)
        if operation:
            inputs = defaults(operation)
            for query, status in [('failures=2', 'succeeded'), ('always=503', 'failed')]:
                inputs = {**inputs, 'source': 'http', 'endpoint': http_endpoint + '/health?' + query + '&case=' + str(uuid.uuid4())}
                detail = client.run(operation, inputs, session)
                require(detail, status)
                record = evidence(client, detail)
                assert record['executions']['http'] == 3, record
                if status == 'succeeded': assert detail['run']['outputs']['result']['attempts'] == 3
                result['runs'].append(record)
    print(project['name'], result['nodes'], 'nodes;', len(result['runs']), 'verified runs', flush=True)
    return result

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--connection', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--models', action='store_true')
    parser.add_argument('--reuse-model-runs', action='store_true', help='Reuse successful model runs with identical inputs during the current acceptance pass')
    parser.add_argument('--http-connection', type=Path)
    args = parser.parse_args()
    projects = Client(args.connection).call('/api/bootstrap')['projects']
    assert len(projects) == 6
    endpoint = json.loads(args.http_connection.read_text())['endpoint'] if args.http_connection else None
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        results = list(pool.map(lambda p: validate_project(args.connection, p, args.models, endpoint, args.reuse_model_runs), projects))
    assert sum(r['nodes'] for r in results) == 294
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(results, ensure_ascii=False, indent=2))
    print('Validated six projects, 18 workflows and 294 canvas nodes.', flush=True)

if __name__ == '__main__':
    main()
