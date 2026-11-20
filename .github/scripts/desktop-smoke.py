# Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
# SPDX-License-Identifier: MIT
"""Verify the binaries inside the actual desktop bundle, using isolated app data."""
import json
import os
from pathlib import Path
import subprocess
import tempfile
import time
from urllib.request import Request, urlopen


def verify(directory, data):
    suffix = '.exe' if os.name == 'nt' else ''
    for name in ('flowgram-desktop', 'flowgram-server', 'flowgram-service'):
        assert (directory / (name + suffix)).is_file(), f'Missing bundled binary: {name}'
    env = {**os.environ, 'FLOWGRAM_DATA_DIR': str(data / 'app'), 'FLOWGRAM_PORT': '0',
           'FLOWGRAM_SERVICE_DATA_DIR': str(data / 'service')}
    # This is an offline CLI operation that opens the standalone runtime's DB.
    result = subprocess.run([str(directory / ('flowgram-service' + suffix)), 'models'],
                            env=env, capture_output=True, text=True, timeout=60, check=True)
    json.loads(result.stdout)
    with (data / 'backend.log').open('w') as log:
        server = subprocess.Popen([str(directory / ('flowgram-server' + suffix))],
                                  env=env, stdout=log, stderr=log)
        try:
            connection = data / 'app' / 'connection.json'
            deadline = time.monotonic() + 60
            while True:
                assert server.poll() is None, 'Packaged server exited before becoming ready'
                try:
                    info = json.loads(connection.read_text(encoding='utf-8'))
                    break
                except (FileNotFoundError, json.JSONDecodeError):
                    if time.monotonic() >= deadline:
                        raise TimeoutError('Packaged server did not create its connection file')
                    time.sleep(0.1)

            def call(path, body=None):
                headers = {'Authorization': 'Bearer ' + info['token'], 'Content-Type': 'application/json'}
                request = Request(info['endpoint'] + path, headers=headers,
                                  data=json.dumps(body).encode() if body is not None else None)
                with urlopen(request, timeout=15) as response:
                    return json.load(response)

            assert call('/api/bootstrap')['projects'] == [], 'Smoke test must use an empty workspace'
            response = call('/mcp', {'jsonrpc': '2.0', 'id': 1, 'method': 'initialize', 'params': {}})
            assert response['result']['serverInfo']['name'] == 'flowgram'
            tools = call('/mcp', {'jsonrpc': '2.0', 'id': 2, 'method': 'tools/list', 'params': {}})
            assert tools['result']['tools'], 'Packaged MCP server has no tools'
        finally:
            server.terminate()
            try:
                server.wait(timeout=15)
            except subprocess.TimeoutExpired:
                server.kill()
                server.wait(timeout=15)
    print('Packaged server HTTP/MCP and standalone runtime checks passed')


def main():
    target = os.environ['DESKTOP_TARGET']
    bundle = Path('target/release/bundle').resolve()
    with tempfile.TemporaryDirectory(prefix='FlowGram CI 中文 ') as temporary:
        data = Path(temporary)
        mounted = None
        try:
            if target == 'x86_64-pc-windows-msvc':
                installers = list((bundle / 'nsis').glob('*.exe'))
                assert len(installers) == 1, 'Expected exactly one NSIS installer'
                extracted = data / 'installer'
                subprocess.run(['7z', 'x', str(installers[0]), '-o' + str(extracted), '-y'],
                               check=True, stdout=subprocess.DEVNULL, timeout=60)
                executables = list(extracted.rglob('flowgram-desktop.exe'))
                assert len(executables) == 1, 'Installer must contain exactly one GUI binary'
                directory = executables[0].parent
            else:
                assert target in ('aarch64-apple-darwin', 'x86_64-apple-darwin')
                installers = list((bundle / 'dmg').glob('*.dmg'))
                assert len(installers) == 1, 'Expected exactly one DMG installer'
                mount = data / 'mounted'
                mount.mkdir()
                subprocess.run(['hdiutil', 'attach', str(installers[0]), '-readonly',
                                '-nobrowse', '-mountpoint', str(mount), '-quiet'],
                               check=True, timeout=60)
                mounted = mount
                directory = mount / 'FlowGram.app' / 'Contents' / 'MacOS'
            verify(directory, data)
        except BaseException:
            log = data / 'backend.log'
            if log.exists():
                print(log.read_text(encoding='utf-8', errors='replace'))
            raise
        finally:
            if mounted is not None:
                subprocess.run(['hdiutil', 'detach', str(mounted), '-quiet'], check=True, timeout=60)


if __name__ == '__main__':
    main()
