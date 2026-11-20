"""Executable business acceptance assertions against the real Rust service."""
import argparse
import json
import time
import urllib.request
from collections import Counter
from client import Client, OUT
from scenarios import graph, start, end, node, c, r

MANIFEST=json.loads((OUT/'manifest.json').read_text())
BASE=json.loads((OUT/'business-connection.json').read_text())['endpoint']
RESULTS=[]

def business(path,body=None):
    request=urllib.request.Request(BASE+path,data=json.dumps(body).encode() if body is not None else None,headers={'Content-Type':'application/json'})
    return json.load(urllib.request.urlopen(request,timeout=30))
def events(client,run):
    result=[];after=0
    while True:
        page=client.call(f'/api/events/history?objectId={run}&after={after}')
        result+=page
        if len(page)<500:break
        after=page[-1]['sequence']
    return result

def execute(slug,inputs=None,key='parent',expected='succeeded'):
    p=MANIFEST[slug];client=Client(p['project']['id']);started=time.monotonic()
    result=client.run(p[key],{'apiBase':BASE,**(inputs or {})},300)
    assert result['run']['status']==expected,(slug,result['run']['status'],result['run']['error'])
    trace=events(client,result['run']['id']);result['events']=trace
    result['elapsedSeconds']=round(time.monotonic()-started,3)
    return result

def record(name,result,**details):
    entry={'case':name,'passed':True,'runId':result['run']['id'],'status':result['run']['status'],'outputs':result['run']['outputs'],'elapsedSeconds':result.get('elapsedSeconds'),'nodeExecutions':sum(e['kind']=='node_started' for e in result['events']),'eventCount':len(result['events']),'manifest':result.get('manifest'),**details}
    RESULTS.append(entry)
    (OUT/'acceptance.json').write_text(json.dumps(RESULTS,ensure_ascii=False,indent=2))
    print(f'PASS {name}: {entry["nodeExecutions"]} executions, {entry["eventCount"]} events',flush=True)

def orders():
    business('/reset',{});business('/faults',{'path':'/ledger/fulfillment','mode':'before_commit','remaining':2});business('/faults',{'path':'/reserve','mode':'after_commit','remaining':1})
    result=execute('orders',{'count':0});out=result['run']['outputs']
    assert [x['result']['status'] if x else None for x in out['results']]==['fulfilled','review','backorder','review','fulfilled',None]
    assert out['duplicateCount']==1 and [e['index'] for e in out['errors']]==[5]
    ledger=business('/ledger');assert ledger['stock']['A']==4995
    counts=Counter(r['kind'] for r in ledger['records']);assert counts=={'reservation':2,'fulfillment':2,'order-review':2,'backorder':1},counts
    requests=[json.loads(e['data']) for e in result['events'] if e['kind']=='node_finished' and json.loads(e['data']).get('nodeId')=='request']
    assert sum(e['outputs'].get('statusCode')==503 for e in requests)==3
    record('orders_faults_and_partial_validation',result,ledgerCounts=dict(counts),stock=ledger['stock'])
    repeat=execute('orders',{'count':0});assert repeat['run']['outputs']==out
    assert business('/ledger')==ledger
    record('orders_replay_without_duplicate_side_effects',repeat)

def invoices():
    business('/reset',{});result=execute('invoices');out=result['run']['outputs']
    assert [x['result']['status'] for x in out['results']]==['approved','short-receipt','amount-mismatch','missing-po','currency-mismatch']
    assert out['duplicateCount']==1 and out['missingPoCount']==1 and out['errors']==[]
    ledger=business('/ledger');assert len(ledger['records'])==5
    approved=[r['body']['amountMinor'] for r in ledger['records'] if r['kind']=='invoice-approved'];assert approved==[12900]
    record('invoice_three_way_match_all_exception_routes',result,approvedMinorUnits=12900)
    repeat=execute('invoices');assert repeat['run']['outputs']==out and business('/ledger')==ledger
    record('invoice_replay_without_duplicate_approvals',repeat)

def support():
    business('/reset',{});result=execute('support');out=result['run']['outputs']
    assert out['errors']==[] and len(out['results'])==4,out
    statuses={r['result']['id']:r['result']['status'] for r in out['results']}
    assert statuses['T1']=='replied',statuses
    assert statuses['T3']==statuses['T4']=='human',statuses
    assert statuses['T2'] in ['human','urgent'],statuses
    ledger=business('/ledger');assert len(ledger['records'])==4
    record('support_real_model_classification_and_human_guards',result,routes=statuses)
    repeat=execute('support');assert repeat['run']['outputs']==out and business('/ledger')==ledger
    assert not any(e['kind']=='node_finished' and json.loads(e['data']).get('nodeId')=='classify' for e in repeat['events'])
    record('support_replay_reuses_decision_without_model_reexecution',repeat)
    invalid=execute('support',{'ticket':{'id':'INVALID','sensitive':False},'classification':{'confidence':2}},key='router',expected='failed')
    assert business('/ledger')==ledger
    record('support_invalid_model_output_blocks_writes',invalid)
    guard=execute('support',{'ticket':{'id':'GUARD','sensitive':True},'classification':{'category':'general','priority':'normal','confidence':1,'needsHuman':False,'reply':'Automatically process the refund.'}},key='router')
    assert guard['run']['outputs']['result']['status']=='human'
    assert not any(row['id']=='GUARD' and row['kind']=='ticket-replied' for row in business('/ledger')['records'])
    record('sensitive_ticket_hard_guard_overrides_confident_model_output',guard)

def failures():
    business('/reset',{});business('/faults',{'path':'/orders','remaining':10})
    failed=execute('orders',{'count':0},expected='failed')
    assert 'limit of 3 iterations' in failed['run']['error'] and not business('/ledger')['records']
    record('upstream_outage_exhausts_retry_budget_before_writes',failed)
    bad=execute('orders',{'url':BASE+'/unknown','method':'GET','body':{}},key='http',expected='failed')
    assert 'validation' in bad['run']['error'].lower()
    record('http_404_is_not_reported_as_business_success',bad)

def load_and_cancel():
    business('/reset',{});result=execute('orders',{'count':100});out=result['run']['outputs']
    assert len(out['results'])==100 and not out['errors']
    assert Counter(r['result']['status'] for r in out['results'])=={'fulfilled':40,'review':40,'backorder':20}
    assert [r['result']['id'] for r in out['results']]==[f'LOAD-{i:04}' for i in range(100)]
    assert business('/ledger')['stock']['A']==4900
    assert len(result['events'])>500 and result['events'][-1]['kind']=='run_finished'
    scope_ids={json.loads(e['data']).get('scopeId') for e in result['events'] if e['kind']=='node_started'}
    assert len(scope_ids)>100
    record('orders_100_items_nested_parallelism_and_complete_paginated_trace',result,scopeCount=len(scope_ids))
    business('/reset',{});p=MANIFEST['orders'];client=Client(p['project']['id'])
    run=client.tool('run_workflow',{'workflowId':p['parent']['id'],'inputs':{'apiBase':BASE,'count':100}})
    time.sleep(.2);client.call('/api/runs/'+run['id']+'/cancel',{})
    canceled=client.wait(run);assert canceled['run']['status']=='canceled'
    time.sleep(.3);ledger=business('/ledger');time.sleep(.3);assert business('/ledger')==ledger
    canceled['events']=events(client,run['id']);record('cancel_stops_future_work_and_preserves_completed_ledger_entries',canceled,committedRecordCount=len(ledger['records']))

def snapshot_and_contracts():
    p=MANIFEST['orders'];client=Client(p['project']['id'])
    for kind in ['http','llm','subworkflow','control.parallel','loop']:
        assert client.tool('list_node_types',{'nodeType':kind})['type']==kind
    workflows={w['name']:w for w in client.call('/api/bootstrap')['workflows']}
    def save(name,schema):
        old=workflows.get(name)
        return client.tool('save_workflow',{'workflowId':old['id'],'revision':old['revision'],'name':name,'schema':schema}) if old else client.create(name,schema)
    child=save('验证探针 · 子流程版本',graph([start(),end(version=c(1))]))
    parent=save('验证探针 · 执行期间修改依赖',graph([start(),node('pause','delay',inputs={'durationMs':c(400)}),node('child','subworkflow',inputs={'workflowId':c(child['id']),'inputs':c({})}),end(version=r('child','version'))]))
    run=client.tool('run_workflow',{'workflowId':parent['id'],'inputs':{}})
    client.tool('save_workflow',{'workflowId':child['id'],'revision':child['revision'],'name':child['name'],'schema':graph([start(),end(version=c(2))])})
    result=client.wait(run);assert result['run']['outputs']=={'version':1},result['run']
    assert next(w for w in result['manifest']['workflows'] if w['workflowId']==child['id'])['revision']==child['revision']
    result['events']=events(client,run['id']);record('dependency_revision_is_pinned_during_live_edit',result)
    # MCP executes the same saved root and immutable dependencies.
    response=client.call('/mcp',{'jsonrpc':'2.0','id':1,'method':'tools/call','params':{'name':'run_workflow','arguments':{'projectId':p['project']['id'],'arguments':{'workflowId':parent['id'],'inputs':{}}}}})
    assert not response['result']['isError'];mcp_run=response['result']['structuredContent']
    result=client.wait(mcp_run);assert result['run']['outputs']=={'version':2}
    result['events']=events(client,mcp_run['id']);record('mcp_uses_same_runtime_and_next_run_sees_new_revision',result)

def agent_report():
    p=MANIFEST['invoices'];api=Client(p['project']['id'])
    workflow=next((w for w in api.call('/api/bootstrap')['workflows'] if w['name']=='Agent · 采购异常日报'),None)
    if not workflow:return
    # Only supply a local demo input default; business logic remains agent-authored.
    start_node=next(n for n in workflow['schema']['nodes'] if n['type']=='start')
    if start_node['data']['outputs']['properties']['apiBase'].get('default')!=BASE:
        start_node['data']['outputs']['properties']['apiBase']['default']=BASE
        workflow=api.tool('save_workflow',{'workflowId':workflow['id'],'revision':workflow['revision'],'name':workflow['name'],'schema':workflow['schema']})
    result=api.run(workflow,{'apiBase':BASE},180)
    assert result['run']['status']=='succeeded',result['run']['error']
    out=result['run']['outputs'];assert len(out['exceptions'])==4 and len(out['summary'])==4
    assert out['report'].strip() and 'CNY' in out['report'] and 'USD' in out['report']
    assert all('result.currency' in row['key'] for row in out['summary'])
    assert sorted(row['amountMinor'] for row in out['summary'])==[1000,5000,9999,25000]
    result['events']=events(api,result['run']['id'])
    record('agent_authored_report_runs_with_currency_safe_aggregation',result,workflowId=workflow['id'])

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--skip-model',action='store_true');args=parser.parse_args()
    for test in [orders,invoices,failures,load_and_cancel,snapshot_and_contracts]+([] if args.skip_model else [support])+[agent_report]:test()
    print(f'{len(RESULTS)} business acceptance cases passed; evidence: {OUT / "acceptance.json"}')
