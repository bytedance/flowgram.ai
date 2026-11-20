"""Exercise the built-in agent through its real session and Workflow Tools."""
import json,time,uuid
from client import Client,OUT
m=json.loads((OUT/'manifest.json').read_text());p=m['invoices'];api=Client(p['project']['id'])
session=api.call('/api/sessions',{'projectId':p['project']['id'],'title':'Agent 构建验收 · 采购异常日报'})
prompt=f'''Build and save one executable workflow named "Agent · 采购异常日报" in this project. Use the existing invoice reconciliation workflow {p['parent']['id']} as a constant subworkflow target; inspect it once. Input: apiBase (string). Assemble its input object with data.map-fields. Reuse the existing real reconciliation; do not replace its business logic with canned data. Its output contains results: [{{result:{{id,status,amountMinor}}}}], errors, summary, duplicateCount, missingPoCount.
After calling it, use list.filter to select entries whose item.result.status is not "approved"; use list.aggregate to group those entries by result.status with count and sum of result.amountMinor; assemble template variables with data.map-fields and render a readable daily exception report using text.template. End outputs: exceptions, summary and report. Use the documented input/output field names: list.filter returns items; list.aggregate returns rows; data.map-fields returns result; text.template returns text. Discover full contracts for the five node types you use, then create and validate. Layout left to right. Do not run yet: the acceptance harness is concurrently injecting controlled outages. Finish briefly with the saved workflow ID and validation result.'''
api.call('/api/sessions/'+session['id']+'/inputs',{'clientInputId':str(uuid.uuid4()),'content':prompt,'deliveryMode':'queue','references':None})
(OUT/'agent-session.json').write_text(json.dumps({'projectId':p['project']['id'],'sessionId':session['id']},indent=2))
last=None;deadline=time.monotonic()+500
while time.monotonic()<deadline:
    conversation=api.call('/api/sessions/'+session['id']+'/conversation')
    turns=conversation['turns']
    if turns:
        turn=turns[-1];tools=[i for i in conversation['items'] if i['kind']=='tool'];state=(turn['status'],len(tools))
        if state!=last:print('Agent',*state,flush=True);last=state
        if turn['status'] not in ['running','stopping']:
            (OUT/'agent-build.json').write_text(json.dumps(conversation,ensure_ascii=False,indent=2))
            print('Agent final status:',turn['status'],'error:',turn['error'],flush=True)
            for i in conversation['items']:
                if i['kind']=='tool' and i['status']=='failed':print('Failed tool:',i['payload'].get('name'),str(i['payload'].get('result'))[:300],flush=True)
            break
    time.sleep(1)
else:raise RuntimeError('Agent build exceeded acceptance deadline')
