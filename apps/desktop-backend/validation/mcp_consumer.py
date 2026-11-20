"""Interop proof using the official MCP Python SDK, over HTTP and the Rust stdio bridge."""
import asyncio,json,os,uuid
from pathlib import Path
import httpx2
from mcp import ClientSession,StdioServerParameters
from mcp.client.streamable_http import streamable_http_client
from mcp.client.stdio import stdio_client

ROOT=Path(__file__).resolve().parents[3]
OUT=ROOT/'.flowgram-local/service-validation'
SERVICE=json.loads((OUT/'connections.json').read_text())['services']['orders']
RESULTS=[]
async def check(session,transport):
    tools=await session.list_tools()
    names={t.name for t in tools.tools}
    assert names=={'fulfill_batch','fulfill_order','flowgram_get_run','flowgram_cancel_run'},names
    assert not {'create_workflow','save_workflow'} & names
    key='sdk-'+transport+'-'+uuid.uuid4().hex
    result=await session.call_tool('fulfill_batch',{'count':0,'_flowgram':{'idempotencyKey':key,'waitMs':30000}})
    value=result.model_dump(by_alias=True)
    assert not value.get('isError'),value
    run=value['structuredContent']
    while run['status']=='running':
        await asyncio.sleep(.1)
        result=await session.call_tool('flowgram_get_run',{'runId':run['runId']});run=result.model_dump(by_alias=True)['structuredContent']
    assert run['status']=='succeeded',run
    assert len(run['outputs']['results'])==6
    again=await session.call_tool('fulfill_batch',{'count':0,'_flowgram':{'idempotencyKey':key}})
    assert again.model_dump(by_alias=True)['structuredContent']['runId']==run['runId']
    RESULTS.append({'case':transport,'passed':True,'runId':run['runId'],'status':run['status'],'tools':sorted(names)})
    (OUT/'mcp-sdk-acceptance.json').write_text(json.dumps(RESULTS,indent=2))
    print('PASS official MCP SDK '+transport,flush=True)
async def main():
    async with httpx2.AsyncClient(headers={'Authorization':'Bearer '+SERVICE['remoteToken']},timeout=60) as http:
        async with streamable_http_client(SERVICE['remoteBase']+'/mcp',http_client=http) as streams:
            async with ClientSession(streams[0],streams[1]) as session:
                await check(session,'stateless-http')
        async with streamable_http_client(SERVICE['remoteBase']+'/mcp',http_client=http) as streams:
            async with ClientSession(streams[0],streams[1]) as session:
                await session.initialize()
                await check(session,'legacy-http')
    params=StdioServerParameters(command=str(ROOT/'target/release/flowgram-service'),args=['stdio',SERVICE['remoteBase']+'/mcp'],env={**os.environ,'FLOWGRAM_SERVICE_TOKEN':SERVICE['remoteToken']})
    async with stdio_client(params) as streams:
        async with ClientSession(*streams) as session:
            await session.initialize()
            await check(session,'stdio-bridge')
asyncio.run(main())
