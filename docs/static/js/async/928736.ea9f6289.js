"use strict";(self.webpackChunk_flowgram_ai_docs=self.webpackChunk_flowgram_ai_docs||[]).push([["928736"],{501475(e,t,o){o.d(t,{Bd:()=>b,Rw:()=>w,T9:()=>_,fZ:()=>x,ix:()=>y,zp:()=>C});var i,r=o(272579),n=o(232355),a=o(323561),s=o(158600),l=o(438200),d=o(559681),c=o(895453),h=o(230538),p=o(305995),g=o(138942),u=o(489880),v=Object.defineProperty,f=Object.getOwnPropertyDescriptor,m=(e,t,o,i)=>{for(var r,n=i>1?void 0:i?f(t,o):t,a=e.length-1;a>=0;a--)(r=e[a])&&(n=(i?r(t,o,n):r(n))||n);return i&&n&&v(t,o,n),n},y=((i=y||{}).In="in",i.Out="out",i),N=e=>(null==e?void 0:e.getNodeMeta().isContainer)??!1,w={nextFrame:async()=>{await new Promise(e=>requestAnimationFrame(e))},isContainer:N,adjustSubNodePosition:e=>{let{targetNode:t,containerNode:o,containerPadding:i}=e;if(o.flowNodeType===d.y.ROOT)return t.transform.position;let r=t.transform.transform.worldTransform,n=o.transform.transform.worldTransform,a={x:r.tx,y:r.ty};return o.children&&0!==o.children.length?{x:a.x-n.tx,y:a.y-n.ty}:{x:0,y:i.top}},getContainerTransforms:e=>e.filter(e=>e.originParent?e.getNodeMeta().selectable&&e.originParent.getNodeMeta().selectable:e.getNodeMeta().selectable).filter(e=>N(e)).sort((e,t)=>{let o=e.renderData.stackIndex;return t.renderData.stackIndex-o}).map(e=>e.transform),getCollisionTransform:e=>{let{targetRect:t,targetPoint:o,transforms:i,withPadding:r=!1,document:n}=e;return i.find(e=>{let{bounds:i,entity:s}=e,l=r?n.layout.getPadding(s):{left:0,right:0},d=new a.M_(i.x+l.left+l.right,i.y,i.width,i.height);if(t){let e,o;return e=t.right>d.left&&t.left<d.right,o=t.bottom>d.top&&t.top<d.bottom,e&&o}if(o)return o.x>=d.left&&o.x<=d.right&&o.y>=d.top&&o.y<=d.bottom;return!1})}},x=class{init(){this.initState(),this.toDispose.push(this.emitter)}ready(){this.toDispose.push(this.listenDragToContainer())}dispose(){this.initState(),this.toDispose.dispose()}async moveOutContainer(e){var t;let{node:o}=e,i=o.parent,r=null==i?void 0:i.parent,n=this.document.toNodeJSON(o);if(!i||!r||!w.isContainer(i)||!(null==(t=n.meta)?void 0:t.position))return;let a=i.getData(c.hZ);this.operationService.moveNode(o,{parent:r}),await w.nextFrame(),a.fireChange(),this.operationService.updateNodePosition(o,{x:a.position.x+n.meta.position.x,y:a.position.y+n.meta.position.y}),this.emitter.fire({type:"out",node:o,sourceContainer:i,targetContainer:r})}canMoveOutContainer(e){let t=e.parent,o=null==t?void 0:t.parent;return!!t&&!!o&&!!w.isContainer(t)&&!!this.dragService.canDropToNode({dragNodeType:e.flowNodeType,dragNode:e,dropNodeType:null==o?void 0:o.flowNodeType,dropNode:o}).allowDrop}async clearInvalidLines(e){var t;let{dragNode:o,sourceParent:i}=e;o&&o.parent!==i&&(null==(t=o.parent)?void 0:t.flowNodeType)!==d.y.GROUP&&(null==i?void 0:i.flowNodeType)!==d.y.GROUP&&await this.removeNodeLines(o)}async removeNodeLines(e){this.linesManager.getAllLines().forEach(t=>{var o,i;((null==(o=t.from)?void 0:o.id)===e.id||(null==(i=t.to)?void 0:i.id)===e.id)&&t.dispose()}),await w.nextFrame()}initState(){this.state={isDraggingNode:!1,isSkipEvent:!1,transforms:void 0,dragNode:void 0,dropNode:void 0,sourceParent:void 0}}listenDragToContainer(){let e=e=>this.draggingNode(e),t=(0,r.A)(e,200);return this.dragService.onNodesDrag(async o=>{if(1===this.selectService.selectedNodes.length){if("onDragStart"===o.type){var i;if(this.state.isSkipEvent){this.state.isSkipEvent=!1;return}this.historyService.startTransaction(),this.state.isDraggingNode=!0,this.state.transforms=w.getContainerTransforms(this.document.getAllNodes()),this.state.dragNode=this.selectService.selectedNodes[0],this.state.dropNode=void 0,this.state.sourceParent=null==(i=this.state.dragNode)?void 0:i.parent,await this.dragOutContainer(o)}if("onDragging"===o.type&&t(o),"onDragEnd"===o.type){if(this.state.isSkipEvent)return;t.cancel(),e(o),await this.dropNodeToContainer(),await this.clearInvalidLines({dragNode:this.state.dragNode,sourceParent:this.state.sourceParent}),this.setDropNode(void 0),this.initState(),this.historyService.endTransaction()}}})}async dragOutContainer(e){let{dragNode:t}=this.state;(e.triggerEvent.metaKey||e.triggerEvent.ctrlKey)&&t&&this.canMoveOutContainer(t)&&(this.moveOutContainer({node:t}),this.state.isSkipEvent=!0,e.dragger.stop(e.dragEvent.clientX,e.dragEvent.clientY),await w.nextFrame(),this.dragService.startDragSelectedNodes(e.triggerEvent))}setDropNode(e){var t,o,i,r;if(this.state.dropNode===e)return;if(this.state.dropNode){let e=null==(r=this.state.dropNode.getData(d.he).node)||null==(i=r.children)?void 0:i[0];e&&e.classList.remove("selected")}if(this.state.dropNode=e,!e)return;let n=null==(o=e.getData(d.he).node)||null==(t=o.children)?void 0:t[0];n&&n.classList.add("selected")}async dropNodeToContainer(){let{dropNode:e,dragNode:t,isDraggingNode:o}=this.state;if(o&&t&&e)return await this.moveIntoContainer({node:t,containerNode:e})}draggingNode(e){let{dragNode:t,isDraggingNode:o,transforms:i=[]}=this.state;if(!o||!t||!(null==i?void 0:i.length))return this.setDropNode(void 0);let r=this.playgroundConfig.getPosFromMouseEvent(e.dragEvent),n=i.filter(e=>e.entity.id!==t.id),a=w.getCollisionTransform({targetPoint:r,transforms:n,document:this.document}),s=null==a?void 0:a.entity;return this.canDropToContainer({dragNode:t,dropNode:s})?this.setDropNode(s):this.setDropNode(void 0)}canDropToContainer(e){let{dragNode:t,dropNode:o}=e,i=null==o?void 0:o.getNodeMeta().isContainer;return!(!o||!i||this.isParent(t,o)||this.isParent(o,t))&&(t.flowNodeType!==d.y.GROUP||o.flowNodeType===d.y.GROUP)&&!!this.dragService.canDropToNode({dragNodeType:t.flowNodeType,dropNodeType:null==o?void 0:o.flowNodeType,dragNode:t,dropNode:o}).allowDrop}isParent(e,t){let o=e.parent;for(;o;){if(o.id===t.id)return!0;o=o.parent}return!1}async moveIntoContainer(e){let{node:t,containerNode:o}=e,i=t.parent;this.operationService.moveNode(t,{parent:o});let r=this.document.layout.getPadding(o),n=w.adjustSubNodePosition({targetNode:t,containerNode:o,containerPadding:r});this.operationService.updateNodePosition(t,n),await w.nextFrame(),this.emitter.fire({type:"in",node:t,sourceContainer:i,targetContainer:o})}constructor(){this.emitter=new a.vl,this.toDispose=new a.Vd,this.on=this.emitter.event}};m([(0,n.WQ)(s.Z4)],x.prototype,"dragService",2),m([(0,n.WQ)(s.Vo)],x.prototype,"document",2),m([(0,n.WQ)(c.d0)],x.prototype,"playgroundConfig",2),m([(0,n.WQ)(s.DO)],x.prototype,"operationService",2),m([(0,n.WQ)(s.GH)],x.prototype,"linesManager",2),m([(0,n.WQ)(l.kI)],x.prototype,"historyService",2),m([(0,n.WQ)(s.rm)],x.prototype,"selectService",2),x=m([(0,n._G)()],x);var b=(0,c.XY)({onBind:e=>{let{bind:t}=e;t(x).toSelf().inSingletonScope()},onInit(e,t){e.get(x).init()},onReady(e,t){!0!==t.disableNodeIntoContainer&&e.get(x).ready()},onDispose(e){e.get(x).dispose()}}),C=()=>{let e=(0,s.QS)(),{size:t={width:300,height:200},isContainer:o}=e.getNodeMeta(),i=e.getData(d.LY),[r,n]=(0,h.useState)(t.width),[a,l]=(0,h.useState)(t.height),c=()=>{if(0===e.blocks.length){n(t.width),l(t.height);return}n(i.bounds.width),l(i.bounds.height)};if((0,h.useEffect)(()=>{let t=i.onDataChange(()=>{c(),e.getData(s.Yd).updateDynamicPorts()});return()=>t.dispose()},[i,r,a]),(0,h.useEffect)(()=>{c()},[]),o)return{width:r,height:a}},S=g.Ay.div`
  width: 100%;
  height: 100%;
  inset: 56px 18px 18px;
  /* 背景色现在通过 style 属性动态设置 */
`,E=()=>{let e=(0,s.QS)(),t={};try{t=(0,c.h1)(p.tx)}catch(e){}let o=t.gridSize??20,i=t.dotSize??1,r=t.dotColor??"#eceeef",n=t.dotOpacity??.5,a=t.backgroundColor??"#f2f3f5",l=t.dotFillColor===r?"":t.dotFillColor,d=`sub-canvas-dot-pattern-${e.id}`;return h.createElement(S,{className:"sub-canvas-background","data-flow-editor-selectable":"true",style:{backgroundColor:a}},h.createElement("svg",{width:"100%",height:"100%"},h.createElement("pattern",{id:d,width:o,height:o,patternUnits:"userSpaceOnUse"},h.createElement("circle",{cx:i,cy:i,r:i,stroke:r,fill:l,fillOpacity:n})),h.createElement("rect",{width:"100%",height:"100%",fill:`url(#${d})`,"data-node-panel-container":e.id})))},D=g.Ay.div`
  pointer-events: none;

  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: transparent;
  border: 1px solid var(--coz-stroke-plus, rgba(6, 7, 9, 15%));
  border-color: var(--coz-bg-plus, rgb(249, 249, 249));
  border-style: solid;
  border-width: 8px;
  border-radius: 8px;

  &::before {
    content: '';

    position: absolute;
    z-index: 0;
    inset: -4px;

    background-color: transparent;
    border-color: var(--coz-bg-plus, rgb(249, 249, 249));
    border-style: solid;
    border-width: 4px;
    border-radius: 8px;
  }
`,T=e=>{let{style:t,children:o}=e;return h.createElement(D,{className:"sub-canvas-border",style:{...t}},o)},k=g.Ay.div`
  width: 100%;
  height: 100%;
`,P="workflow-move-into-sub-canvas-tip-visible",O="false",M=class e{static get instance(){return this._instance||(this._instance=new e),this._instance}isClosed(){return this.isCloseForever()||this.closed}close(){this.closed=!0}isCloseForever(){return localStorage.getItem(P)===O}closeForever(){localStorage.setItem(P,O)}constructor(){this.closed=!1}},F=g.Ay.div`
  pointer-events: auto;
  position: absolute;
  top: 0;

  width: 100%;
  height: 28px;

  .container {
    height: 100%;
    background-color: #e4e6f5;
    border-radius: 4px 4px 0 0;

    .content {
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;

      .text {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        line-height: 20px;
        color: rgba(15, 21, 40, 82%);
        text-overflow: ellipsis;
      }

      .custom-content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        /* 为自定义内容提供默认样式，但允许覆盖 */
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: rgba(15, 21, 40, 82%);

        /* 确保自定义内容不会超出容器 */
        overflow: hidden;
      }

      .space {
        width: 128px;
      }
    }

    .actions {
      position: absolute;
      top: 0;
      right: 0;

      display: flex;
      gap: 8px;
      align-items: center;

      height: 28px;
      padding: 0 16px;

      .close-forever {
        cursor: pointer;

        padding: 0 3px;

        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        line-height: 12px;
        color: rgba(32, 41, 69, 62%);
      }

      .close {
        display: flex;
        cursor: pointer;
        height: 100%;
        align-items: center;
      }
    }
  }
`,I=/(Macintosh|MacIntel|MacPPC|Mac68K|iPad)/.test(navigator.userAgent),L=()=>h.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"none",viewBox:"0 0 16 16"},h.createElement("path",{fill:"#060709",fillOpacity:"0.5",d:"M12.13 12.128a.5.5 0 0 0 .001-.706L8.71 8l3.422-3.423a.5.5 0 0 0-.001-.705.5.5 0 0 0-.706-.002L8.002 7.293 4.579 3.87a.5.5 0 0 0-.705.002.5.5 0 0 0-.002.705L7.295 8l-3.423 3.422a.5.5 0 0 0 .002.706c.195.195.51.197.705.001l3.423-3.422 3.422 3.422c.196.196.51.194.706-.001"})),Q=e=>{let{tipText:t,neverRemindText:o}=e,{visible:i,close:r,closeForever:n}=(()=>{let e=(0,s.QS)(),[t,o]=(0,h.useState)(!1),i=M.instance,r=(0,c.h1)(x),n=(0,h.useCallback)(()=>{i.isClosed()||o(!0)},[i]),a=(0,h.useCallback)(()=>{i.close(),o(!1)},[i]),l=(0,h.useCallback)(()=>{i.closeForever(),a()},[a,i]);return(0,h.useEffect)(()=>{let t=r.on(t=>{"in"===t.type&&t.targetContainer===e&&n()}),i=r.on(t=>{"out"===t.type&&(t.sourceContainer!==e||e.blocks.length||o(!1))});return()=>{t.dispose(),i.dispose()}},[r,e,n,a,t]),{visible:t,close:a,closeForever:l}})(),a=t||u.F.t("Hold {{key}} to drag node out",{key:I?"Cmd ⌘":"Ctrl"});return i?h.createElement(F,{className:"sub-canvas-tips"},h.createElement("div",{className:"container"},h.createElement("div",{className:"content"},"string"==typeof a?h.createElement("p",{className:"text"},a):h.createElement("div",{className:"custom-content"},a),h.createElement("div",{className:"space",style:{width:0}})),h.createElement("div",{className:"actions"},h.createElement("p",{className:"close-forever",onClick:n},o||u.F.t("Never Remind")),h.createElement("div",{className:"close",onClick:r},h.createElement(L,null))))):null},_=e=>{let t,{className:o,style:i,offsetY:r=0,tipText:n}=e,a=C(),l=(null==a?void 0:a.height)??0;return t=(0,s.QS)(),(0,h.useLayoutEffect)(()=>{a&&(t.renderData.node.style.width=a.width+"px",t.renderData.node.style.height=a.height+"px")},[null==a?void 0:a.width,null==a?void 0:a.height]),h.createElement(k,{className:`sub-canvas-render ${o??""}`,style:{height:l+r,...i},"data-flow-editor-selectable":"true",onDragStart:e=>{e.stopPropagation()}},h.createElement(T,null,h.createElement(E,null),h.createElement(Q,{tipText:n})))}}}]);