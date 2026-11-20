"""Launch the acceptance-only standalone host without putting secrets in shell arguments."""
import json, os, sys
from pathlib import Path
root=Path(__file__).resolve().parents[3]
directory=Path(sys.argv[1]).resolve()
config=json.loads((directory/'host-config.json').read_text())
env={**os.environ,'FLOWGRAM_SERVICE_DATA_DIR':str(directory/'data'),'FLOWGRAM_SERVICE_BIND':config['bind'],'FLOWGRAM_SERVICE_ADMIN_TOKEN':config['adminToken'],'FLOWGRAM_CALLBACK_SECRET':config['callbackSecret'],'FLOWGRAM_CONNECTION_ACCEPTANCE':config['outboundSecret']}
model=config.get('model',{})
if model:
    env.update(FLOWGRAM_MODEL_BASE_URL=model['baseUrl'],FLOWGRAM_MODEL=model['model'],FLOWGRAM_MODEL_API_KEY=model.get('apiKey',''))
os.execve(root/'target/release/flowgram-service',['flowgram-service','serve'],env)
