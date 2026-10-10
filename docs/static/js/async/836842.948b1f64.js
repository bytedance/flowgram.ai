"use strict";(self.webpackChunk_flowgram_ai_docs=self.webpackChunk_flowgram_ai_docs||[]).push([["836842"],{759497(e,t,l){l.d(t,{A:()=>r});var n=l(230538);let r=(0,l(169499).T)(function(e){return n.createElement("svg",Object.assign({viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:!1,"aria-hidden":!0},e),n.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm7-11.12a1.5 1.5 0 0 1-1.47 1.52l-4 .07.07 4a1.5 1.5 0 0 1-3 .06l-.07-4-4 .07a1.5 1.5 0 0 1-.06-3l4-.07-.07-4a1.5 1.5 0 1 1 3-.06l.07 4 4-.07A1.5 1.5 0 0 1 19 11.88Z",fill:"currentColor"}))},"plus_circle")},512433(e,t,l){l.d(t,{c:()=>S});var n=l(279206),r=l(230538),o=l(353919),i=l(138942),a=l(45105),c=l(283223),d=l(549457),s=l(245427),u=l(759497);function h(){return r.createElement("svg",{width:"8",height:"8",viewBox:"0 0 8 8",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.createElement("circle",{id:"Ellipse 465",cx:"4",cy:"4",r:"3",fill:"white",stroke:"#3370FF",strokeWidth:"2"}))}function p(e){return r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 48 48",...e},r.createElement("g",{fill:"none"},r.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4",d:"M22 8.01176C20.5 8.01193 16.0714 7.93811 15 13.0005C13.917 18.1177 9.85714 22.8477 8 24"}),r.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4",d:"M22 40C20.5 40.0003 16.0714 40.0628 15 35.0005C13.917 29.8833 9.85714 25.1522 8 23.9999"}),r.createElement("circle",{cx:"8",cy:"24",r:"4",fill:"currentColor"}),r.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4",d:"M8 24L22 24"}),r.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4",d:"M30 24.001H42"}),r.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4",d:"M30 8.00098H42"}),r.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4",d:"M30 40.001H42"})))}function g(e){let{color:t,circleColor:l}=e;return r.createElement("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.createElement("circle",{cx:"8",cy:"8",r:"7",fill:l}),r.createElement("path",{fill:t,d:"M10.8281 9.4715C11.0883 9.21131 11.0885 8.78909 10.8291 8.52804C10.6413 8.33892 10.4536 8.14952 10.266 7.9601C9.66706 7.35551 9.06799 6.75079 8.46068 6.15496C8.20439 5.90352 7.7947 5.90352 7.53841 6.15496C6.93103 6.75085 6.33191 7.35564 5.73291 7.96029C5.5454 8.14957 5.3579 8.33884 5.17017 8.52782C4.91075 8.78895 4.91096 9.21099 5.17124 9.47127C5.43152 9.73155 5.85355 9.73176 6.11383 9.47148L7.99955 7.58576L9.88548 9.4717C10.1457 9.73189 10.5679 9.73169 10.8281 9.4715Z"}),r.createElement("path",{fill:t,d:"M0.888672 7.99997C0.888672 4.07261 4.07242 0.888855 7.99978 0.888855C11.9271 0.888855 15.1109 4.07261 15.1109 7.99997C15.1109 11.9273 11.9271 15.1111 7.99978 15.1111C4.07242 15.1111 0.888672 11.9273 0.888672 7.99997ZM13.818 7.99997C13.818 4.78667 11.2131 2.18178 7.99978 2.18178C4.78649 2.18178 2.1816 4.78667 2.1816 7.99997C2.1816 11.2133 4.78649 13.8181 7.99978 13.8181C11.2131 13.8181 13.818 11.2133 13.818 7.99997Z"}))}var m=i.Ay.div`
  width: 16px;
  height: 16px;
  font-size: 10px;
  border-radius: 9px;
  display: flex;
  color: #fff;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background: ${e=>e.hoverActivated?"#82A7FC":"#BBBFC4"};
  transform: ${e=>!e.isVertical&&e.isCollapse?"rotate(-90deg)":""};
`,f=function(e){let{collapseNode:t,activateNode:l,hoverActivated:o,style:i}=e,a=(0,n.rJT)(),c=null==l?void 0:l.getData(n.heY),d=t.getData(n.LY3);if(!d)return r.createElement(r.Fragment,null);let s=()=>{setTimeout(()=>{var e;a.config.scrollToView({position:null==l||null==(e=l.getData(n.LY3))?void 0:e.outputPoint,scrollToCenter:!0})},100)};if(d.collapsed){let e=t.allCollapsedChildren.filter(e=>!e.hidden&&e!==l).length;return r.createElement(m,{onClick:()=>{d.collapsed=!1,s()},hoverActivated:o,"aria-hidden":"true",style:i},e)}let u=o?"#82A7FC":"#BBBFC4";return r.createElement(m,{onClick:()=>{d.collapsed=!0,null==c||c.toggleMouseLeave(),s()},hoverActivated:o,isVertical:null==l?void 0:l.isVertical,isCollapse:!0,style:i,"aria-hidden":"true"},r.createElement(g,{color:u,circleColor:"var(--semi-color-white)"}))},v=i.Ay.div`
  width: 16px;
  height: 16px;
  border-radius: 100px;
  background-color: white;
  border: 1px dashed #b8bcc1;
`,E="hsl(252 62% 54.9%)",C="hsl(252deg 62% 55% / 9%)",k=i.Ay.div`
  position: relative;
  height: 32px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 19px;
  border: 1px solid ${E};
  padding: 0 15px;
  &:hover: {
    background-color: ${C};
    color: ${E};
  }
`,x=i.Ay.div`
  position: absolute;
  top: -8px;
  right: -8px;
  text-align: center;
  line-height: 16px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  font-size: 12px;
  color: #fff;
  background-color: ${E};
`,w=i.Ay.div`
  display: flex;
  align-items: center;
`,y=(e,t)=>i.Ay.div`
    width: ${e}px;
    height: ${t}px;
    background: #3370ff;
  `,b=(e,t)=>!e||e<0?0:!t||t<0?e:(0,s.A)([e,t])||0,A=i.Ay.div`
  width: 28px;
  height: 18px;
  background: ${e=>e.activated?"#82A7FC":"rgb(187, 191, 196)"};
  display: flex;
  border-radius: 9px;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  transform: ${e=>e.isVertical?"":"rotate(90deg)"};
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 12px;
      height: 12px;
    }
  }
`,L={nodes:[{type:"start",label:"Start",icon:r.createElement(function(e){return r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",...e},r.createElement("g",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"1.5",strokeWidth:"1.499"},r.createElement("path",{strokeDasharray:"2 2",d:"M16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6Z"}),r.createElement("path",{d:"M16 5H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Z"})))},null)},{type:"dynamicSplit",label:"Split Branch",icon:r.createElement(p,null),blocks:()=>[{id:(0,a.Ak)(5)},{id:(0,a.Ak)(5)}]},{type:"end",label:"Branch End",icon:r.createElement(function(e){return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"1em",height:"1em",viewBox:"0 0 24 24",...e},r.createElement("path",{fill:"#888888",fillRule:"evenodd",d:"M11 13v-2H6.286C5.023 11 4 10.105 4 9s1.023-2 2.286-2H11V3a1 1 0 0 1 2 0v4h4.714C18.977 7 20 7.895 20 9s-1.023 2-2.286 2H13v2h3a2 2 0 1 1 0 4h-3v4a1 1 0 0 1-2 0v-4H8a2 2 0 1 1 0-4h3Z"}))},null),branchEnd:!0},{type:"loop",schemaType:"loop",label:"Loop",icon:r.createElement(function(e){return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"1em",height:"1em",viewBox:"0 0 16 16",...e},r.createElement("g",{fill:"currentColor"},r.createElement("path",{d:"M1.161 8a6.84 6.84 0 1 0 6.842-6.84a.58.58 0 1 1 0-1.16a8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z"}),r.createElement("path",{d:"M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1c0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32c0 .84-.504 1.324-1.386 1.324h-1.6z"})))},null)},{type:"tryCatch",schemaType:"tryCatch",label:"TryCatch",icon:r.createElement(p,null),blocks:()=>[{id:`try_${(0,a.Ak)(5)}`},{id:`catch_${(0,a.Ak)(5)}`},{id:`catch_${(0,a.Ak)(5)}`}]},{type:"noop",label:"Noop Node",icon:r.createElement(function(e){return r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 16 16",...e},r.createElement("path",{fill:"currentColor",d:"M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773C16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593c.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318C1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"}))},null)},{type:"end",label:"End",icon:r.createElement(function(e){return r.createElement("svg",{width:"1em",height:"1em",viewBox:"0 0 256 256",...e},r.createElement("path",{fill:"currentColor",d:"M128 236a108 108 0 1 1 108-108a108.1 108.1 0 0 1-108 108Zm0-192a84 84 0 1 0 84 84a84.1 84.1 0 0 0-84-84Z"}))},null)}],find:function(e){return L.nodes.find(t=>t.type===e)}},D=i.Ay.div`
  width: 100%;
  height: 32px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 19px;
  padding: 0 15px;
  &:hover: {
    background-color: ${C};
    color: ${E};
  },
`,M=i.Ay.div`
  font-size: 12px;
  margin-left: 10px;
`,T=i.Ay.div`
  max-height: 500px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;function R(e){return r.createElement(D,{onClick:e.onClick},r.createElement("div",{style:{fontSize:14}},e.icon),r.createElement(M,null,e.label))}var $=L.nodes.filter(e=>"start"!==e.type);function B(e){return r.createElement(T,{style:{width:180}},$.map((t,l)=>r.createElement(R,{key:l,icon:t.icon,label:t.label,onClick:()=>{var l;return null==(l=e.onSelect)?void 0:l.call(e,t)}})))}var _=i.Ay.div`
  width: ${e=>e.hovered?15:6}px;
  height: ${e=>e.hovered?15:6}px;
  background-color: rgb(143, 149, 158);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`,H=(0,i.Ay)(u.A)`
  color: #3370ff;
  background-color: #fff;
  border-radius: 15px;
`,S={[n.$pR.ADDER]:function(e){let{from:t}=e,[l,o]=(0,r.useState)(!1),i=(0,n.rJT)(),d=(0,n.h1n)(n.lkt);return i.config.readonlyOrDisabled?null:r.createElement(c.AM,{visible:l,onVisibleChange:o,content:r.createElement(B,{onSelect:e=>{let l=d.addFromNode(t,{id:e.type+(0,a.Ak)(5),type:e.type,blocks:e.blocks?e.blocks():void 0});setTimeout(()=>{i.scrollToView({bounds:l.getData(n.LY3).bounds,scrollToCenter:!0})},10)}}),placement:"right",trigger:"click",overlayStyle:{padding:0}},r.createElement(_,{hovered:e.hoverActivated,onMouseDown:e=>e.stopPropagation(),onClick:()=>{o(!0)}},e.hoverActivated?r.createElement(H,null):null))},[n.$pR.COLLAPSE]:f,[n.$pR.TRY_CATCH_COLLAPSE]:function(e){let{node:t}=e,{baseColor:l,baseActivatedColor:i}=(0,n.QRP)(),a=(0,n.rJT)(),c=t.getData(n.heY),d=t.getData(n.LY3),[s,u]=(0,r.useState)(!1);if(!d||!d.parent)return r.createElement(r.Fragment,null);let h=d.inputPoint.x-d.parent.inputPoint.x,p=()=>{setTimeout(()=>{var e;a.config.scrollToView({position:null==t||null==(e=t.getData(n.LY3))?void 0:e.inputPoint,scrollToCenter:!0})},100)},g=()=>{d.collapsed=!0,c.activated=!1,p()},m=()=>{d.collapsed=!1,p()};return r.createElement("div",{onMouseEnter:()=>{u(!0),c.activated=!0},onMouseLeave:()=>{u(!1),c.activated=!1},style:{width:h,height:40,display:"flex",alignItems:"center",justifyContent:"center",gap:6}},r.createElement("div",{"data-label-id":e.labelId,style:{fontSize:12,color:s||c.lineActivated?i:l,textAlign:"center",whiteSpace:"nowrap",backgroundColor:"var(--g-editor-background)",lineHeight:"20px"}},t.getService(n.BYF).getText(n.N0v.CATCH_TEXT)),(()=>{if(d.collapsed){let e=t.allCollapsedChildren.filter(e=>!e.hidden&&e!==t).length;return r.createElement("div",{onClick:m,style:{width:16,height:16,fontSize:10,borderRadius:9,display:"flex",color:"#fff",cursor:"pointer",justifyContent:"center",alignItems:"center",background:s||c.lineActivated?i:l},"aria-hidden":"true"},e)}return s?r.createElement("div",{onClick:g,style:{width:16,height:16,fontSize:10,borderRadius:9,display:"flex",color:"#fff",cursor:"pointer",justifyContent:"center",alignItems:"center",background:i},"aria-hidden":"true"},r.createElement(o.A,null)):r.createElement(r.Fragment,null)})())},[n.$pR.BRANCH_ADDER]:function(e){var t;let{activated:l,node:o}=e,i=null==(t=o.firstChild)?void 0:t.getData(n.heY),c=(0,n.rJT)(),s=(0,n.h1n)(n.lkt),{isVertical:u}=o;return c.config.readonlyOrDisabled?null:r.createElement(A,{isVertical:u,activated:l||(null==i?void 0:i.hovered),onMouseEnter:()=>null==i?void 0:i.toggleMouseEnter(),onMouseLeave:()=>null==i?void 0:i.toggleMouseLeave()},r.createElement("div",{onClick:()=>{let e;e=s.addBlock(o,{id:(0,a.Ak)(5)}),setTimeout(()=>{c.scrollToView({bounds:e.getData(n.LY3).bounds,scrollToCenter:!0})},10)},"aria-hidden":"true",style:{flexGrow:1,textAlign:"center",cursor:"pointer"}},r.createElement(d.A,null)))},[n.$pR.DRAG_NODE]:function(e){let{dragStart:t,dragNodes:l,dragJSON:n}=e,o=(l||[]).map(e=>e.allCollapsedChildren.length?e.allCollapsedChildren.filter(e=>!e.hidden).length:1).reduce((e,t)=>e+t,0);return r.createElement(k,null,(null==t?void 0:t.id)||(null==n?void 0:n.id),o>1&&r.createElement(r.Fragment,null,r.createElement(x,null,o),r.createElement(k,{style:{position:"absolute",top:5,right:-5,left:5,bottom:-5,opacity:.5}})))},[n.$pR.DRAGGABLE_ADDER]:function(e){let t=(0,n.rJT)().getLayer(n.Y79);return t&&(!t.options.canDrop||t.options.canDrop({dragNodes:t.dragEntities||[],dropNode:e.from,isBranch:!1}))?r.createElement(v,null):r.createElement(r.Fragment,null)},[n.$pR.DRAG_HIGHLIGHT_ADDER]:function(e){var t,l,o,i,a,c,d;let{node:s}=e,u=null==(t=s.getData(n.LY3))?void 0:t.bounds,{isVertical:p}=s;if(p){let e=y(b(((null==u?void 0:u.width)||0)-16,((null==s||null==(d=s.next)||null==(c=d.getData(n.LY3))||null==(a=c.bounds)?void 0:a.width)||0)-16),2);return r.createElement(w,null,r.createElement(h,null),r.createElement(e,null),r.createElement(h,null))}let g=y(2,b(((null==u?void 0:u.height)||0)-16,((null==s||null==(i=s.next)||null==(o=i.getData(n.LY3))||null==(l=o.bounds)?void 0:l.height)||0)-16));return r.createElement(w,{style:{flexDirection:"column"}},r.createElement(h,null),r.createElement(g,null),r.createElement(h,null))},[n.$pR.DRAG_BRANCH_HIGHLIGHT_ADDER]:h,[n.$pR.SLOT_COLLAPSE]:function(e){let{node:t}=e,[l,o]=(0,r.useState)(!1),i=t.firstChild,a=i.getData(n.heY).activated,c=i.getData(n.LY3).size.height,d=t.collapsed||l||a;return r.createElement("div",{style:{width:30,height:c||100,display:"flex",alignItems:"center",justifyContent:"center"},onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1)},d&&r.createElement(f,{style:t.collapsed?{}:{transform:t.isVertical?"rotate(-90deg)":"rotate(90deg)"},node:t,activateNode:i,collapseNode:t,hoverActivated:l}))},[n.$pR.SLOT_ADDER]:function(e){var t;let{node:l}=e,o=null==(t=l.firstChild)?void 0:t.getData(n.heY),i=(0,n.h1n)(n.mi8);async function s(){i.addNode({id:(0,a.Ak)(5),type:"custom",parent:l})}return r.createElement("div",{style:{display:"flex",background:"var(--semi-color-bg-0)"},onMouseEnter:()=>null==o?void 0:o.toggleMouseEnter(),onMouseLeave:()=>null==o?void 0:o.toggleMouseLeave()},r.createElement(c.$n,{onClick:()=>{s()},size:"small",icon:r.createElement(d.A,null)}))}}},347804(e,t,l){l.d(t,{A:()=>r});var n=l(128419);let r=function(e,t,l){for(var r=-1,o=e.length;++r<o;){var i=e[r],a=t(i);if(null!=a&&(void 0===c?a==a&&!(0,n.A)(a):l(a,c)))var c=a,d=i}return d}},590415(e,t,l){l.d(t,{A:()=>n});let n=function(e,t){return e<t}},245427(e,t,l){l.d(t,{A:()=>i});var n=l(347804),r=l(590415),o=l(312917);let i=function(e){return e&&e.length?(0,n.A)(e,o.A,r.A):void 0}}}]);