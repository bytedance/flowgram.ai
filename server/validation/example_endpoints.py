# Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
# SPDX-License-Identifier: MIT
"""Loopback-only HTTP evidence fixture for the ordinary operations example."""
import argparse
import json
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

COUNTERS = {}
LOCK = threading.Lock()

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass

    def do_GET(self):
        url = urlsplit(self.path)
        query = parse_qs(url.query)
        if url.path != '/health':
            self.send_error(404)
            return
        key = query.get('case', ['default'])[0]
        with LOCK:
            COUNTERS[key] = COUNTERS.get(key, 0) + 1
            attempt = COUNTERS[key]
        failures = int(query.get('failures', ['0'])[0])
        status = 503 if query.get('always') == ['503'] or attempt <= failures else 200
        payload = json.dumps({'status': 'degraded' if status == 503 else 'ready',
                              'service': 'example-checkout', 'attempt': attempt,
                              'source': 'loopback-http-fixture'}).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=59146)
    parser.add_argument('--connection', type=Path, required=True)
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    args.connection.parent.mkdir(parents=True, exist_ok=True)
    args.connection.write_text(json.dumps({'endpoint': 'http://127.0.0.1:' + str(server.server_port)}))
    print('Example HTTP fixture ready on loopback port', server.server_port, flush=True)
    server.serve_forever()

if __name__ == '__main__':
    main()
