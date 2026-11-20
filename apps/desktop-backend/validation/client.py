"""Acceptance client. Uses the running desktop service; never starts a second owner."""
import json
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / '.flowgram-local/complex-validation'
OUT.mkdir(parents=True, exist_ok=True)
CONNECTION = Path.home() / 'Library/Application Support/ai.flowgram.desktop/connection.json'

class Client:
    def __init__(self, project=None):
        self.project = project
    def call(self, path, body=None, method=None):
        connection = json.loads(CONNECTION.read_text())
        headers = {'Authorization': 'Bearer ' + connection['token'], 'Content-Type': 'application/json'}
        if self.project:
            headers['X-FlowGram-Project'] = self.project
        data = json.dumps(body).encode() if body is not None else None
        request = urllib.request.Request(connection['endpoint'] + path, data=data, headers=headers, method=method or ('POST' if data else 'GET'))
        try:
            return json.load(urllib.request.urlopen(request, timeout=180))
        except urllib.error.HTTPError as error:
            raise RuntimeError(f'{error.code}: {error.read().decode()}') from None
    def tool(self, name, arguments):
        return self.call('/api/tools/call', {'projectId': self.project, 'name': name, 'arguments': arguments})
    def create(self, name, graph):
        return self.tool('create_workflow', {'name': name, 'schema': graph})
    def wait(self, run, timeout=180):
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            result = self.call('/api/runs/' + run['id'])
            if result['run']['status'] != 'running':
                return result
            time.sleep(.15)
        raise RuntimeError('Run did not terminate within acceptance timeout')
    def run(self, workflow, inputs, timeout=180):
        return self.wait(self.tool('run_workflow', {'workflowId': workflow['id'], 'inputs': inputs}), timeout)

def projects():
    api = Client()
    registered = api.call('/api/bootstrap')['projects']
    result = {}
    for slug, name in [('orders','复杂验证 · 订单履约'),('invoices','复杂验证 · 采购对账'),('support','复杂验证 · AI 客服')]:
        directory = OUT / 'projects' / slug
        found = next((p for p in registered if p['directory'] == str(directory)), None)
        result[slug] = found or api.call('/api/projects', {'name': name, 'directory': str(directory)})
    (OUT/'projects.json').write_text(json.dumps(result, ensure_ascii=False, indent=2))
    return result

if __name__ == '__main__':
    projects()
