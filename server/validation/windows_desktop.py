# Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
# SPDX-License-Identifier: MIT
"""Acceptance checks against an installed Windows desktop's isolated data directory.

Requires Python 3 only. Never provisions models or copies credentials. Creates and
deletes its own imported test project; the six ordinary examples remain available.
"""
import argparse
import base64
import copy
import json
import os
from pathlib import Path

from example_projects import Client, nodes, require, validate_project


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--connection', type=Path, required=True)
    parser.add_argument('--workspace', type=Path, required=True)
    args = parser.parse_args()
    assert os.name == 'nt', 'Run this acceptance suite on Windows'
    args.workspace.mkdir(parents=True, exist_ok=True)
    api = Client(args.connection)
    api.call('/api/projects/initialize', {'locale': 'zh-CN'})
    projects = api.call('/api/bootstrap')['projects']
    assert len(projects) == 6, 'Use a dedicated, newly initialized app data directory'
    results = [validate_project(args.connection, project, False, None) for project in projects]
    assert sum(item['nodes'] for item in results) == 294
    assert sum(len(item['runs']) for item in results) == 11

    # Export normal history and resources, then import into a Unicode/space path.
    package = api.call('/api/projects/' + projects[0]['id'] + '/export', {'includeHistory': True})
    content = 'Windows 中文资源 and spaces\n'
    package['files'].append({'path': 'assets/中文 路径.txt',
                             'contentBase64': base64.b64encode(content.encode()).decode()})
    directory = args.workspace / '中文 工程 with spaces'
    assert not directory.exists(), 'Use a new workspace for each acceptance run'
    directory.mkdir()
    project = api.call('/api/projects/import', {'package': package, 'directory': str(directory),
                                               'name': 'Windows 中文读写验证'})
    directory = Path(project['directory'])
    project_id = project['id']
    client = Client(args.connection, project_id)
    assert (directory / 'assets/中文 路径.txt').read_text(encoding='utf-8') == content
    for index in range(3):
        project = api.call('/api/projects/' + project_id,
                           {'name': 'Windows 中文读写验证 ' + str(index),
                            'expectedName': project['name']}, method='PUT')
    inventory = client.call('/api/bootstrap')
    workflow = next(w for w in inventory['workflows']
                    if all(n['type'] not in ['agent', 'llm'] for n in nodes(w['schema'])))
    before = client.run(workflow)
    require(before)
    old_schema = copy.deepcopy(workflow['schema'])
    schema = copy.deepcopy(old_schema)
    schema['nodes'][0]['data']['title'] = 'Windows 编辑后标题'
    workflow = client.call('/api/tools/call', {'projectId': project_id, 'name': 'save_workflow',
                           'arguments': {'workflowId': workflow['id'], 'revision': workflow['revision'],
                                         'name': workflow['name'], 'schema': schema}})
    after = client.run(workflow)
    require(after)
    assert after['run']['revision'] == before['run']['revision'] + 1
    historical = client.call('/api/runs/' + before['run']['id'])
    assert historical['snapshot']['schema'] == old_schema
    assert client.call('/api/workflows/' + workflow['id'])['schema'] == schema
    for kind, item_id in [('workflow', workflow['id']), ('session', inventory['sessions'][0]['id'])]:
        client.call('/api/' + ('workflows' if kind == 'workflow' else 'sessions') + '/' + item_id + '/archive', {})
        archived = api.call('/api/archives')['items']
        assert any(item['id'] == item_id for item in archived)
        client.call('/api/archives/' + kind + '/' + item_id + '/restore', {})
        assert not any(item['id'] == item_id for item in api.call('/api/archives')['items'])
    exported = api.call('/api/projects/' + project_id + '/export', {'includeHistory': True})
    assert len(exported['workflows']) == 3 and exported['history']
    assert all('\\' not in item['path'] for item in exported['files'])
    destination = args.workspace / '中文 导出.flowgram.json'
    api.call('/api/projects/' + project_id + '/export', {'destination': str(destination)})
    assert json.loads(destination.read_text(encoding='utf-8'))['name'] == project['name']
    opened = api.call('/api/projects/open', {'directory': str(directory)})
    assert opened['id'] == project_id
    try:
        api.call('/api/projects/' + project_id, {'confirmationName': 'Windows'}, method='DELETE')
    except RuntimeError as error:
        assert 'complete project name' in str(error)
    else:
        raise AssertionError('Partial confirmation must never delete a project')
    api.call('/api/projects/' + project_id, {'confirmationName': project['name']}, method='DELETE')
    assert not directory.exists(), 'Windows handles must be released before deleting project files'
    assert len(api.call('/api/bootstrap')['projects']) == 6
    proof = {'platform': 'Windows', 'projects': results,
             'checks': ['294 example nodes', '11 real offline workflow reruns', 'Unicode and space paths',
                        'repeated project rename', 'workflow save and rerun', 'historical graph snapshot',
                        'workflow and session archive/restore', 'portable export/import',
                        'export to Unicode filename', 'reopen project', 'exact delete confirmation',
                        'delete project with SQLite handles closed']}
    (args.workspace / 'acceptance.json').write_text(json.dumps(proof, ensure_ascii=False, indent=2), encoding='utf-8')
    print('Windows desktop acceptance passed.', flush=True)


if __name__ == '__main__':
    main()
