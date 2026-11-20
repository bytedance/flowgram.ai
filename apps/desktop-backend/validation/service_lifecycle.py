"""Live version switches, then independent consumption with the desktop closed and host restart."""
import copy,hashlib,hmac,json,secrets,subprocess,sys,time,urllib.error
from pathlib import Path
from client import Client,ROOT
from published_services import call,ready,OUT,invoke

C=json.loads((OUT/'connections.json').read_text());CFG=json.loads((OUT/'host-config.json').read_text());TOKEN=CFG['adminToken'];HOST=C['endpoint']
PROJECT=json.loads((ROOT/'.flowgram-local/complex-validation/projects.json').read_text())['orders'];CLIENT=Client(PROJECT['id'])
BUSINESS=json.loads((OUT/'business/business-connection.json').read_text())['endpoint']
RESULTS=[]
def record(name,**details):
    RESULTS.append({'case':name,'passed':True,**details});(OUT/'lifecycle-acceptance.json').write_text(json.dumps(RESULTS,indent=2,ensure_ascii=False));print('PASS '+name,flush=True)
def graph(value,child=None,auth=False):
    nodes=[{'id':'start','type':'start'}]
    if auth:
        nodes += [{'id':'request','type':'http','data':{'inputsValues':{'url':{'type':'template','content':'{{ start.apiBase }}/auth-echo'},'method':{'type':'constant','content':'GET'},'credentialEnv':{'type':'constant','content':'FLOWGRAM_CONNECTION_ACCEPTANCE'}}}},{'id':'end','type':'end','data':{'inputsValues':{'result':{'type':'ref','content':['request','body']}}}}]
    elif child:
        nodes += [{'id':'pause','type':'delay','data':{'inputsValues':{'durationMs':{'type':'constant','content':3000}}}},{'id':'child','type':'subworkflow','data':{'inputsValues':{'workflowId':{'type':'constant','content':child},'inputs':{'type':'constant','content':{}}}}},{'id':'end','type':'end','data':{'inputsValues':{'version':{'type':'ref','content':['child','version']}}}}]
    else:nodes += [{'id':'end','type':'end','data':{'inputsValues':{'version':{'type':'constant','content':value}}}}]
    return {'nodes':nodes,'edges':[{'sourceNodeID':a['id'],'targetNodeID':b['id']} for a,b in zip(nodes,nodes[1:])]}
def finish(s,run):
    for _ in range(500):
        _,run=call(s['remoteBase']+'/runs/'+run['runId'],token=s['remoteToken'])
        if run['status']!='running':return run
        time.sleep(.05)
    raise RuntimeError('Probe did not terminate')
def prepare():
    existing={w['name']:w for w in CLIENT.call('/api/bootstrap')['workflows']}
    def save(name,schema):
        old=existing.get(name)
        return (CLIENT.call('/api/workflows/'+old['id'],{'revision':old['revision'],'name':name,'schema':schema},method='PUT') if old else CLIENT.create(name,schema))
    child=save('服务验收探针 · 子流程版本',graph(1));root=save('服务验收探针 · 发布版本与取消',graph(0,child['id']));auth=save('服务验收探针 · 主机凭证注入',graph(0,auth=True))
    inventory=CLIENT.call('/api/services');n=sum(r['service']=='acceptance-probes' for r in inventory['releases'])
    operations=[{'name':'version_probe','description':'Read the pinned dependency version after a cancellable delay. Acceptance only.','workflowId':root['id'],'inputSchema':{'type':'object','properties':{},'additionalProperties':False},'outputSchema':{'type':'object','properties':{'version':{'type':'integer'}},'required':['version'],'additionalProperties':False},'timeoutMs':10000}, {'name':'credential_probe','description':'Verify that a host credential is injected and never returned. Acceptance only.','workflowId':auth['id'],'inputSchema':{'type':'object','properties':{},'additionalProperties':False},'outputSchema':{'type':'object','properties':{'result':{'type':'object','properties':{'authorization':{'const':'Bearer [redacted]'}},'required':['authorization']}},'required':['result']},'bindings':{'apiBase':'businessApi'},'timeoutMs':10000}]
    def release(version):
        b=CLIENT.call('/api/services',{'service':'acceptance-probes','title':'服务消费验收探针','version':version,'operations':operations});status,result=call(HOST+'/admin/releases',b,TOKEN);assert status==200,(status,result)
        d={'service':'acceptance-probes','environment':'acceptance','version':version,'enabled':True,'maxConcurrency':2,'bindings':{'businessApi':BUSINESS},'callback':None};assert call(HOST+'/admin/deployments',d,TOKEN)[0]==200;return d
    old=release(f'1.0.{n}');_,key=call(HOST+'/admin/consumers/acceptance-probes/acceptance',{'name':'Lifecycle acceptance','operations':['version_probe','credential_probe'],'canCancel':True},TOKEN)
    s={'remoteBase':HOST+'/v1/services/acceptance-probes/acceptance','remoteToken':key['token']}
    _,running=call(s['remoteBase']+'/operations/version_probe/invoke',{},s['remoteToken'],'live-'+secrets.token_hex(4));assert running['status']=='running'
    CLIENT.call('/api/workflows/'+child['id'],{'revision':child['revision'],'name':child['name'],'schema':graph(2)},method='PUT')
    new=release(f'1.0.{n+1}');done=finish(s,running);assert done['outputs']=={'version':1},done
    record('live_upgrade_retains_original_dependency',**done)
    fresh=invoke(s,'version_probe',{},'new-'+secrets.token_hex(4));assert fresh['outputs']=={'version':2};record('new_request_uses_new_release',**fresh)
    assert call(HOST+'/admin/deployments',old,TOKEN)[0]==200
    back=invoke(s,'version_probe',{},'rollback-'+secrets.token_hex(4));assert back['outputs']=={'version':1};record('rollback_uses_immutable_original_release',**back)
    assert call(HOST+'/admin/deployments',new,TOKEN)[0]==200
    saved={'service':s,'deployment':new};(OUT/'lifecycle-connection.json').write_text(json.dumps(saved));(OUT/'lifecycle-connection.json').chmod(0o600)
def offline():
    # This assertion establishes that successful consumption does not depend on the desktop process.
    connection=json.loads((Path.home()/'Library/Application Support/ai.flowgram.desktop/connection.json').read_text())
    try:call(connection['endpoint']+'/health');raise AssertionError('Close the desktop application before the offline check')
    except (OSError,urllib.error.URLError):pass
    previous=json.loads((OUT/'lifecycle-acceptance.json').read_text());RESULTS.extend(previous)
    for slug,s in C['services'].items():
        result=invoke(s,s['operations'][0],{'count':0} if slug=='orders' else {},'desktop-closed-'+secrets.token_hex(4));record('desktop_closed_business_'+slug,**result)
    saved=json.loads((OUT/'lifecycle-connection.json').read_text());s=saved['service'];deployment=saved['deployment']
    injected=invoke(s,'credential_probe',{},'credential-'+secrets.token_hex(4));assert injected['outputs']=={'result':{'authorization':'Bearer [redacted]'}};assert CFG['outboundSecret'] not in json.dumps(injected);record('host_credential_injection_and_echo_redaction',**injected)
    deployment['callback']={'url':BUSINESS+'/completion','secretEnv':'FLOWGRAM_CALLBACK_SECRET'};assert call(HOST+'/admin/deployments',deployment,TOKEN)[0]==200
    call(BUSINESS+'/faults',{'path':'/completion','remaining':1})
    key='cancel-'+secrets.token_hex(4);_,run=call(s['remoteBase']+'/operations/version_probe/invoke',{},s['remoteToken'],key);call(s['remoteBase']+'/runs/'+run['runId']+'/cancel',{},s['remoteToken']);canceled=finish(s,run);assert canceled['status']=='canceled';record('external_cancellation',**canceled)
    for _ in range(200):
        _,ledger=call(BUSINESS+'/ledger');receipt=next((r['body'] for r in ledger['records'] if r['kind']=='completion' and r['id']=='run:'+run['runId']+':finished'),None)
        if receipt:break
        time.sleep(.1)
    assert receipt,'Completion callback was not delivered'
    signature='sha256='+hmac.new(CFG['callbackSecret'].encode(),receipt['timestamp'].encode()+b'.'+receipt['raw'].encode(),hashlib.sha256).hexdigest();assert hmac.compare_digest(signature,receipt['signature'])
    record('signed_completion_callback_recovers_from_503',runId=run['runId'],eventId=receipt['event']['eventId'])
    key='restart-'+secrets.token_hex(4);_,run=call(s['remoteBase']+'/operations/version_probe/invoke',{},s['remoteToken'],key);assert run['status']=='running'
    subprocess.run(['tmux','kill-session','-t','flowgram-services'],check=True);time.sleep(.2)
    subprocess.run(['tmux','new-session','-d','-s','flowgram-services','-c',str(ROOT),f'python3 apps/desktop-backend/validation/service_host.py {OUT}'],check=True);ready(HOST)
    _,interrupted=call(s['remoteBase']+'/runs/'+run['runId'],token=s['remoteToken']);assert interrupted['status']=='interrupted',interrupted
    _,retry=call(s['remoteBase']+'/operations/version_probe/invoke',{},s['remoteToken'],key);assert retry['runId']==run['runId'] and retry['status']=='interrupted';record('host_restart_preserves_run_and_does_not_replay_side_effects',**interrupted)
    new=invoke(s,'version_probe',{},'after-restart-'+secrets.token_hex(4));assert new['outputs']=={'version':2};record('new_run_after_restart',**new)
    # Leave the acceptance-only probe disabled; the three actual business services stay available.
    deployment['enabled']=False;deployment['callback']=None;assert call(HOST+'/admin/deployments',deployment,TOKEN)[0]==200
if __name__=='__main__':
    if '--offline' in sys.argv:offline()
    else:prepare()
