"""Publish actual complex projects and consume them outside the editor process.
Requires the desktop service, existing complex-project fixtures, and built Rust binaries.
Tokens are kept only in an ignored mode-0600 connection file, never in evidence output.
"""
import copy,json,os,secrets,socket,subprocess,time,urllib.request,urllib.error
from pathlib import Path
from collections import Counter
from client import Client,ROOT

OUT=ROOT/'.flowgram-local/service-validation';OUT.mkdir(exist_ok=True)
PROJECTS=json.loads((ROOT/'.flowgram-local/complex-validation/projects.json').read_text())
MANIFEST=json.loads((ROOT/'.flowgram-local/complex-validation/manifest.json').read_text())
OLD=json.loads((ROOT/'.flowgram-local/complex-validation/acceptance.json').read_text())
RESULTS=[]

def call(url,body=None,token=None,key=None,method=None,headers=None):
    h={'Content-Type':'application/json',**(headers or {})}
    if token:h['Authorization']='Bearer '+token
    if key:h['Idempotency-Key']=key
    req=urllib.request.Request(url,data=json.dumps(body).encode() if body is not None else None,headers=h,method=method or ('POST' if body is not None else 'GET'))
    try:
        with urllib.request.urlopen(req,timeout=120) as r:
            data=r.read();return r.status,json.loads(data) if data else None
    except urllib.error.HTTPError as e:
        data=e.read()
        try:value=json.loads(data)
        except ValueError:value=data.decode()
        return e.code,value

def ready(url):
    for _ in range(100):
        try:
            if call(url+'/health')[0]==200:return
        except (OSError,urllib.error.URLError):pass
        time.sleep(.1)
    raise RuntimeError('Service did not become ready')

def record(name,**details):
    RESULTS.append({'case':name,'passed':True,**details});(OUT/'acceptance.json').write_text(json.dumps(RESULTS,ensure_ascii=False,indent=2));print('PASS '+name,flush=True)

def schema(value):
    if value is None:return {'type':'null'}
    if isinstance(value,bool):return {'type':'boolean'}
    if isinstance(value,str):return {'type':'string'}
    if isinstance(value,int):return {'type':'integer'}
    if isinstance(value,float):return {'type':'number'}
    if isinstance(value,list):
        variants={json.dumps(schema(v),sort_keys=True) for v in value}
        return {'type':'array','items':{'anyOf':[json.loads(v) for v in sorted(variants)]} if variants else {}}
    return {'type':'object','properties':{k:schema(v) for k,v in value.items()},'required':list(value),'additionalProperties':False}

def make_operation(name,description,workflow,example,required=()):
    root=next(n for n in workflow['schema']['nodes'] if n['type']=='start')
    inputs=copy.deepcopy(root.get('data',{}).get('outputs',{'type':'object','properties':{}}));inputs['additionalProperties']=False
    inputs.setdefault('properties',{}).pop('apiBase',None);inputs['required']=list(required)
    return {'name':name,'description':description,'workflowId':workflow['id'],'inputSchema':inputs,'outputSchema':schema(example),'bindings':{'apiBase':'businessApi'},'timeoutMs':180000,'readOnly':False}

def setup():
    business=OUT/'business';business.mkdir(exist_ok=True)
    if subprocess.run(['tmux','has-session','-t','flowgram-service-business'],capture_output=True).returncode:
        subprocess.run(['tmux','new-session','-d','-s','flowgram-service-business','-c',str(ROOT),f'python3 apps/desktop-backend/validation/service.py --directory {business}'],check=True)
    for _ in range(100):
        try:
            business_url=json.loads((business/'business-connection.json').read_text())['endpoint']
            if call(business_url+'/health')[0]==200:break
        except (OSError,ValueError,urllib.error.URLError):pass
        time.sleep(.1)
    else:raise RuntimeError('Acceptance business service did not become ready')
    config_path=OUT/'host-config.json'
    if not config_path.exists():
        with socket.socket() as sock:sock.bind(('127.0.0.1',0));port=sock.getsockname()[1]
        model=json.loads((Path.home()/'Library/Application Support/ai.flowgram.desktop/model.json').read_text())
        config={'bind':f'127.0.0.1:{port}','adminToken':secrets.token_urlsafe(40),'callbackSecret':secrets.token_urlsafe(40),'outboundSecret':secrets.token_urlsafe(40),'model':model}
        config_path.write_text(json.dumps(config));config_path.chmod(0o600)
    config=json.loads(config_path.read_text())
    if 'outboundSecret' not in config:
        config['outboundSecret']=secrets.token_urlsafe(40);config_path.write_text(json.dumps(config));config_path.chmod(0o600)
    endpoint='http://'+config['bind']
    if subprocess.run(['tmux','has-session','-t','flowgram-services'],capture_output=True).returncode:
        subprocess.run(['tmux','new-session','-d','-s','flowgram-services','-c',str(ROOT),f'python3 apps/desktop-backend/validation/service_host.py {OUT}'],check=True)
    ready(endpoint)
    services={}
    for slug,service,title in [('orders','order-fulfillment','订单履约服务'),('invoices','procurement','采购对账服务'),('support','customer-support','智能客服服务')]:
        client=Client(PROJECTS[slug]['id']);workflows={w['id']:w for w in client.call('/api/bootstrap')['workflows']};fixture=MANIFEST[slug]
        parent=workflows[fixture['parent']['id']];worker=workflows[fixture['worker']['id']]
        names={'orders':('fulfill_batch','fulfill_order'),'invoices':('reconcile_batch','reconcile_invoice'),'support':('route_tickets','route_ticket')}[slug]
        examples={'orders':'orders_faults_and_partial_validation','invoices':'invoice_three_way_match_all_exception_routes','support':'support_real_model_classification_and_human_guards'}
        example=next(r['outputs'] for r in OLD if r['case']==examples[slug]);worker_example=next(r for r in example['results'] if r is not None)
        required={'orders':['order'],'invoices':['record'],'support':['ticket']}[slug]
        operations=[make_operation(names[0],f'Process a business batch with validated results, bounded concurrency and explicit exception routes.',parent,example),make_operation(names[1],f'Process one business item with validation and idempotent downstream writes.',worker,worker_example,required)]
        if slug=='invoices':
            report=next(w for w in workflows.values() if w['name']=='Agent · 采购异常日报');sample=next(r['outputs'] for r in OLD if r['case']=='agent_authored_report_runs_with_currency_safe_aggregation');operations.append(make_operation('generate_exception_report','Generate an invoice exception report grouped by status and currency.',report,sample))
        inventory=client.call('/api/services');versions=[r['version'] for r in inventory['releases'] if r['service']==service];version=f'1.0.{len(versions)}'
        bundle=client.call('/api/services',{'service':service,'title':title,'version':version,'operations':operations})
        (OUT/f'{service}-{version}.flowgram-service.json').write_text(json.dumps(bundle,ensure_ascii=False,indent=2))
        deployment={'service':service,'environment':'local','version':version,'enabled':True,'maxConcurrency':8,'bindings':{'businessApi':business_url},'callback':None}
        client.call(f'/api/services/{service}/deployments',deployment)
        key=client.call(f'/api/services/{service}/local/consumers',{'name':'业务消费验收','operations':names,'canCancel':True})
        status,result=call(endpoint+'/admin/releases',bundle,config['adminToken']);assert status==200,(status,result)
        remote={**deployment,'environment':'acceptance'};assert call(endpoint+'/admin/deployments',remote,config['adminToken'])[0]==200
        _,remote_key=call(endpoint+f'/admin/consumers/{service}/acceptance',{'name':'External business application','operations':[o['name'] for o in operations],'canCancel':True},config['adminToken'])
        services[slug]={'service':service,'version':version,'projectId':PROJECTS[slug]['id'],'localBase':inventory['publicBase']+f'/services/{service}/local','localToken':key['token'],'remoteBase':endpoint+f'/v1/services/{service}/acceptance','remoteToken':remote_key['token'],'consumerId':remote_key['consumer']['id'],'operations':names}
        record('publish_export_import_'+slug,service=service,version=version,digest=bundle['digest'],workflowCount=len(bundle['workflows']))
    connections={'endpoint':endpoint,'services':services};(OUT/'connections.json').write_text(json.dumps(connections,ensure_ascii=False,indent=2));(OUT/'connections.json').chmod(0o600)
    return connections,config,business_url

def invoke(service,operation,inputs,key,remote=True,wait=30000):
    base=service['remoteBase' if remote else 'localBase'];token=service['remoteToken' if remote else 'localToken']
    status,result=call(base+f'/operations/{operation}/invoke?waitMs={wait}',inputs,token,key)
    assert status in (200,202),(status,result)
    for _ in range(600):
        if result['status']!='running':break
        time.sleep(.1);_,result=call(base+'/runs/'+result['runId'],token=token)
    assert result['status']=='succeeded',result
    return result

def main():
    connections,config,business=setup();services=connections['services']
    for slug,s in services.items():
        result=invoke(s,s['operations'][0],{'count':0} if slug=='orders' else {},'remote-business-'+secrets.token_hex(4))
        output=result['outputs']
        if slug=='orders':assert [r['result']['status'] if r else None for r in output['results']]==['fulfilled','review','backorder','review','fulfilled',None]
        elif slug=='invoices':assert [r['result']['status'] for r in output['results']]==['approved','short-receipt','amount-mismatch','missing-po','currency-mismatch']
        else:
            routes={r['result']['id']:r['result']['status'] for r in output['results']};assert routes['T1']=='replied' and routes['T3']==routes['T4']=='human';assert not output['errors']
        record('remote_http_business_'+slug,**result)
        local=invoke(s,s['operations'][0],{'count':0} if slug=='orders' else {},'local-business-'+secrets.token_hex(4),remote=False)
        assert local['outputs']==output
        record('local_http_same_business_'+slug,**local)
    orders=services['orders'];key='cross-transport-'+secrets.token_hex(4)
    result=invoke(orders,'fulfill_batch',{'count':0},key)
    _,response=call(orders['remoteBase']+'/mcp',{'jsonrpc':'2.0','id':1,'method':'tools/call','params':{'name':'fulfill_batch','arguments':{'count':0,'_flowgram':{'idempotencyKey':key}}}},orders['remoteToken'])
    assert response['result']['structuredContent']['runId']==result['runId']
    record('http_mcp_share_identical_run',runId=result['runId'])
    assert call(orders['remoteBase']+'/operations/fulfill_batch/invoke',{'count':1},orders['remoteToken'],key)[0]==409
    assert call(orders['remoteBase']+'/operations/fulfill_batch/invoke',{'apiBase':'http://untrusted.invalid'},orders['remoteToken'],'override')[0]==422
    record('idempotency_conflict_and_bound_input_override_rejected')
    _,other=call(connections['endpoint']+'/admin/consumers/'+orders['service']+'/acceptance',{'name':'Isolated caller','operations':['fulfill_order'],'canCancel':False},config['adminToken'])
    assert call(orders['remoteBase']+'/runs/'+result['runId'],token=other['token'])[0]==404
    _,tools=call(orders['remoteBase']+'/mcp',{'jsonrpc':'2.0','id':2,'method':'tools/list'},other['token'])
    assert {t['name'] for t in tools['result']['tools']}=={'flowgram_get_run','fulfill_order'}
    assert call(orders['remoteBase']+'/operations/fulfill_batch/invoke',{},other['token'],'not-granted')[0]==403
    assert call(connections['endpoint']+'/api/bootstrap',token=orders['remoteToken'])[0] in (401,404)
    call(connections['endpoint']+'/admin/consumers/'+orders['service']+'/acceptance/'+other['consumer']['id']+'/revoke',{},config['adminToken'])
    assert call(orders['remoteBase']+'/openapi.json',token=other['token'])[0]==401
    record('scope_isolation_discovery_restriction_and_revocation')
    _,doc=call(orders['remoteBase']+'/openapi.json',token=orders['remoteToken']);assert doc['openapi']=='3.1.0'
    (OUT/'orders.openapi.json').write_text(json.dumps(doc,indent=2))
    with urllib.request.urlopen(urllib.request.Request(orders['remoteBase']+'/runs/'+result['runId']+'/events?after=0',headers={'Authorization':'Bearer '+orders['remoteToken']}),timeout=120) as stream:events=stream.read().decode()
    assert 'run_finished' in events and 'durationMs' not in events
    _,download=call(orders['remoteBase']+'/runs/'+result['runId']+'/result',token=orders['remoteToken']);assert download==result['outputs']
    record('openapi_event_replay_and_result_download',runId=result['runId'],progressEvents=events.count('data:'))
    # Current protocol metadata must agree with HTTP routing headers.
    modern={'jsonrpc':'2.0','id':3,'method':'tools/list','params':{'_meta':{'io.modelcontextprotocol/protocolVersion':'2026-07-28','io.modelcontextprotocol/clientInfo':{'name':'acceptance','version':'1'},'io.modelcontextprotocol/clientCapabilities':{}}}}
    status,tools=call(orders['remoteBase']+'/mcp',modern,orders['remoteToken'],headers={'MCP-Protocol-Version':'2026-07-28','Mcp-Method':'tools/list','Accept':'application/json, text/event-stream'})
    assert status==200 and tools['result']['resultType']=='complete'
    record('mcp_stateless_metadata_and_business_tool_discovery')
    print('External business-service acceptance completed',flush=True)

if __name__=='__main__':main()
