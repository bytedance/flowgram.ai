# Interface: DOMCache

An object that performs a cleanup operation when `.dispose()` is called.

Some examples of how disposables are used:

* An event listener that removes itself when `.dispose()` is called.
* The return value from registering a provider. When `.dispose()` is called, the provider is unregistered.

## Hierarchy

* `HTMLElement`

* [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

  ↳ **`DOMCache`**

## Table of contents

### Properties

* [ATTRIBUTE\_NODE](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#attribute_node)
* [CDATA\_SECTION\_NODE](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#cdata_section_node)
* [COMMENT\_NODE](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#comment_node)
* [DOCUMENT\_FRAGMENT\_NODE](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#document_fragment_node)
* [DOCUMENT\_NODE](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#document_node)
* [DOCUMENT\_POSITION\_CONTAINED\_BY](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#document_position_contained_by)
* [DOCUMENT\_POSITION\_CONTAINS](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#document_position_contains)
* [DOCUMENT\_POSITION\_DISCONNECTED](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#document_position_disconnected)
* [DOCUMENT\_POSITION\_FOLLOWING](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#document_position_following)
* [DOCUMENT\_POSITION\_IMPLEMENTATION\_SPECIFIC](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#document_position_implementation_specific)
* [DOCUMENT\_POSITION\_PRECEDING](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#document_position_preceding)
* [DOCUMENT\_TYPE\_NODE](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#document_type_node)
* [ELEMENT\_NODE](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#element_node)
* [ENTITY\_NODE](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#entity_node)
* [ENTITY\_REFERENCE\_NODE](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#entity_reference_node)
* [NOTATION\_NODE](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#notation_node)
* [PROCESSING\_INSTRUCTION\_NODE](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#processing_instruction_node)
* [TEXT\_NODE](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#text_node)
* [accessKey](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#accesskey)
* [accessKeyLabel](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#accesskeylabel)
* [ariaAtomic](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariaatomic)
* [ariaAutoComplete](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariaautocomplete)
* [ariaBusy](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariabusy)
* [ariaChecked](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariachecked)
* [ariaColCount](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariacolcount)
* [ariaColIndex](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariacolindex)
* [ariaColSpan](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariacolspan)
* [ariaCurrent](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariacurrent)
* [ariaDisabled](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariadisabled)
* [ariaExpanded](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariaexpanded)
* [ariaHasPopup](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariahaspopup)
* [ariaHidden](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariahidden)
* [ariaInvalid](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariainvalid)
* [ariaKeyShortcuts](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariakeyshortcuts)
* [ariaLabel](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#arialabel)
* [ariaLevel](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#arialevel)
* [ariaLive](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#arialive)
* [ariaModal](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariamodal)
* [ariaMultiLine](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariamultiline)
* [ariaMultiSelectable](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariamultiselectable)
* [ariaOrientation](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariaorientation)
* [ariaPlaceholder](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariaplaceholder)
* [ariaPosInSet](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariaposinset)
* [ariaPressed](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariapressed)
* [ariaReadOnly](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariareadonly)
* [ariaRequired](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariarequired)
* [ariaRoleDescription](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariaroledescription)
* [ariaRowCount](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariarowcount)
* [ariaRowIndex](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariarowindex)
* [ariaRowSpan](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariarowspan)
* [ariaSelected](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariaselected)
* [ariaSetSize](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariasetsize)
* [ariaSort](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariasort)
* [ariaValueMax](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariavaluemax)
* [ariaValueMin](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariavaluemin)
* [ariaValueNow](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariavaluenow)
* [ariaValueText](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ariavaluetext)
* [assignedSlot](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#assignedslot)
* [attributes](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#attributes)
* [autocapitalize](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#autocapitalize)
* [autofocus](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#autofocus)
* [baseURI](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#baseuri)
* [childElementCount](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#childelementcount)
* [childNodes](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#childnodes)
* [children](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#children)
* [classList](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#classlist)
* [className](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#classname)
* [clientHeight](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#clientheight)
* [clientLeft](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#clientleft)
* [clientTop](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#clienttop)
* [clientWidth](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#clientwidth)
* [contentEditable](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#contenteditable)
* [dataset](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#dataset)
* [dir](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#dir)
* [draggable](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#draggable)
* [enterKeyHint](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#enterkeyhint)
* [firstChild](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#firstchild)
* [firstElementChild](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#firstelementchild)
* [hidden](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#hidden)
* [id](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#id)
* [inert](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#inert)
* [innerHTML](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#innerhtml)
* [innerText](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#innertext)
* [inputMode](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#inputmode)
* [isConnected](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#isconnected)
* [isContentEditable](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#iscontenteditable)
* [key](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#key)
* [lang](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#lang)
* [lastChild](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#lastchild)
* [lastElementChild](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#lastelementchild)
* [localName](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#localname)
* [namespaceURI](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#namespaceuri)
* [nextElementSibling](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#nextelementsibling)
* [nextSibling](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#nextsibling)
* [nodeName](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#nodename)
* [nodeType](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#nodetype)
* [nodeValue](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#nodevalue)
* [nonce](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#nonce)
* [offsetHeight](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#offsetheight)
* [offsetLeft](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#offsetleft)
* [offsetParent](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#offsetparent)
* [offsetTop](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#offsettop)
* [offsetWidth](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#offsetwidth)
* [onabort](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onabort)
* [onanimationcancel](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onanimationcancel)
* [onanimationend](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onanimationend)
* [onanimationiteration](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onanimationiteration)
* [onanimationstart](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onanimationstart)
* [onauxclick](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onauxclick)
* [onbeforeinput](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onbeforeinput)
* [onblur](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onblur)
* [oncancel](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#oncancel)
* [oncanplay](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#oncanplay)
* [oncanplaythrough](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#oncanplaythrough)
* [onchange](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onchange)
* [onclick](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onclick)
* [onclose](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onclose)
* [oncontextmenu](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#oncontextmenu)
* [oncopy](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#oncopy)
* [oncuechange](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#oncuechange)
* [oncut](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#oncut)
* [ondblclick](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ondblclick)
* [ondrag](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ondrag)
* [ondragend](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ondragend)
* [ondragenter](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ondragenter)
* [ondragleave](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ondragleave)
* [ondragover](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ondragover)
* [ondragstart](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ondragstart)
* [ondrop](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ondrop)
* [ondurationchange](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ondurationchange)
* [onemptied](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onemptied)
* [onended](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onended)
* [onerror](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onerror)
* [onfocus](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onfocus)
* [onformdata](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onformdata)
* [onfullscreenchange](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onfullscreenchange)
* [onfullscreenerror](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onfullscreenerror)
* [ongotpointercapture](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ongotpointercapture)
* [oninput](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#oninput)
* [oninvalid](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#oninvalid)
* [onkeydown](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onkeydown)
* [onkeypress](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onkeypress)
* [onkeyup](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onkeyup)
* [onload](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onload)
* [onloadeddata](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onloadeddata)
* [onloadedmetadata](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onloadedmetadata)
* [onloadstart](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onloadstart)
* [onlostpointercapture](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onlostpointercapture)
* [onmousedown](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onmousedown)
* [onmouseenter](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onmouseenter)
* [onmouseleave](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onmouseleave)
* [onmousemove](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onmousemove)
* [onmouseout](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onmouseout)
* [onmouseover](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onmouseover)
* [onmouseup](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onmouseup)
* [onpaste](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onpaste)
* [onpause](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onpause)
* [onplay](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onplay)
* [onplaying](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onplaying)
* [onpointercancel](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onpointercancel)
* [onpointerdown](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onpointerdown)
* [onpointerenter](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onpointerenter)
* [onpointerleave](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onpointerleave)
* [onpointermove](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onpointermove)
* [onpointerout](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onpointerout)
* [onpointerover](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onpointerover)
* [onpointerup](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onpointerup)
* [onprogress](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onprogress)
* [onratechange](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onratechange)
* [onreset](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onreset)
* [onresize](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onresize)
* [onscroll](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onscroll)
* [onsecuritypolicyviolation](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onsecuritypolicyviolation)
* [onseeked](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onseeked)
* [onseeking](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onseeking)
* [onselect](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onselect)
* [onselectionchange](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onselectionchange)
* [onselectstart](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onselectstart)
* [onslotchange](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onslotchange)
* [onstalled](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onstalled)
* [onsubmit](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onsubmit)
* [onsuspend](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onsuspend)
* [ontimeupdate](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ontimeupdate)
* [ontoggle](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ontoggle)
* [ontouchcancel](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ontouchcancel)
* [ontouchend](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ontouchend)
* [ontouchmove](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ontouchmove)
* [ontouchstart](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ontouchstart)
* [ontransitioncancel](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ontransitioncancel)
* [ontransitionend](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ontransitionend)
* [ontransitionrun](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ontransitionrun)
* [ontransitionstart](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ontransitionstart)
* [onvolumechange](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onvolumechange)
* [onwaiting](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onwaiting)
* [onwebkitanimationend](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onwebkitanimationend)
* [onwebkitanimationiteration](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onwebkitanimationiteration)
* [onwebkitanimationstart](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onwebkitanimationstart)
* [onwebkittransitionend](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onwebkittransitionend)
* [onwheel](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#onwheel)
* [outerHTML](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#outerhtml)
* [outerText](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#outertext)
* [ownerDocument](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#ownerdocument)
* [parentElement](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#parentelement)
* [parentNode](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#parentnode)
* [part](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#part)
* [prefix](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#prefix)
* [previousElementSibling](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#previouselementsibling)
* [previousSibling](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#previoussibling)
* [role](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#role)
* [scrollHeight](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#scrollheight)
* [scrollLeft](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#scrollleft)
* [scrollTop](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#scrolltop)
* [scrollWidth](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#scrollwidth)
* [shadowRoot](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#shadowroot)
* [slot](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#slot)
* [spellcheck](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#spellcheck)
* [style](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#style)
* [tabIndex](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#tabindex)
* [tagName](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#tagname)
* [textContent](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#textcontent)
* [title](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#title)
* [translate](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#translate)

### Methods

* [addEventListener](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#addeventlistener)
* [after](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#after)
* [animate](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#animate)
* [append](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#append)
* [appendChild](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#appendchild)
* [attachInternals](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#attachinternals)
* [attachShadow](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#attachshadow)
* [before](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#before)
* [blur](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#blur)
* [checkVisibility](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#checkvisibility)
* [click](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#click)
* [cloneNode](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#clonenode)
* [closest](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#closest)
* [compareDocumentPosition](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#comparedocumentposition)
* [contains](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#contains)
* [dispatchEvent](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#dispatchevent)
* [dispose](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#dispose)
* [focus](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#focus)
* [getAnimations](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#getanimations)
* [getAttribute](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#getattribute)
* [getAttributeNS](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#getattributens)
* [getAttributeNames](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#getattributenames)
* [getAttributeNode](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#getattributenode)
* [getAttributeNodeNS](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#getattributenodens)
* [getBoundingClientRect](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#getboundingclientrect)
* [getClientRects](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#getclientrects)
* [getElementsByClassName](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#getelementsbyclassname)
* [getElementsByTagName](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#getelementsbytagname)
* [getElementsByTagNameNS](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#getelementsbytagnamens)
* [getRootNode](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#getrootnode)
* [hasAttribute](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#hasattribute)
* [hasAttributeNS](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#hasattributens)
* [hasAttributes](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#hasattributes)
* [hasChildNodes](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#haschildnodes)
* [hasPointerCapture](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#haspointercapture)
* [insertAdjacentElement](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#insertadjacentelement)
* [insertAdjacentHTML](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#insertadjacenthtml)
* [insertAdjacentText](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#insertadjacenttext)
* [insertBefore](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#insertbefore)
* [isDefaultNamespace](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#isdefaultnamespace)
* [isEqualNode](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#isequalnode)
* [isSameNode](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#issamenode)
* [lookupNamespaceURI](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#lookupnamespaceuri)
* [lookupPrefix](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#lookupprefix)
* [matches](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#matches)
* [normalize](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#normalize)
* [prepend](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#prepend)
* [querySelector](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#queryselector)
* [querySelectorAll](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#queryselectorall)
* [releasePointerCapture](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#releasepointercapture)
* [remove](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#remove)
* [removeAttribute](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#removeattribute)
* [removeAttributeNS](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#removeattributens)
* [removeAttributeNode](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#removeattributenode)
* [removeChild](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#removechild)
* [removeEventListener](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#removeeventlistener)
* [replaceChild](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#replacechild)
* [replaceChildren](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#replacechildren)
* [replaceWith](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#replacewith)
* [requestFullscreen](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#requestfullscreen)
* [requestPointerLock](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#requestpointerlock)
* [scroll](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#scroll)
* [scrollBy](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#scrollby)
* [scrollIntoView](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#scrollintoview)
* [scrollTo](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#scrollto)
* [setAttribute](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#setattribute)
* [setAttributeNS](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#setattributens)
* [setAttributeNode](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#setattributenode)
* [setAttributeNodeNS](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#setattributenodens)
* [setPointerCapture](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#setpointercapture)
* [setStyle](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#setstyle)
* [toggleAttribute](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#toggleattribute)
* [webkitMatchesSelector](/auto-docs/fixed-layout-editor/interfaces/DOMCache.md#webkitmatchesselector)

## Properties

### ATTRIBUTE\_NODE

`Readonly` **ATTRIBUTE\_NODE**: `2`

#### Inherited from

HTMLElement.ATTRIBUTE\_NODE

***

### CDATA\_SECTION\_NODE

`Readonly` **CDATA\_SECTION\_NODE**: `4`

node is a CDATASection node.

#### Inherited from

HTMLElement.CDATA\_SECTION\_NODE

***

### COMMENT\_NODE

`Readonly` **COMMENT\_NODE**: `8`

node is a Comment node.

#### Inherited from

HTMLElement.COMMENT\_NODE

***

### DOCUMENT\_FRAGMENT\_NODE

`Readonly` **DOCUMENT\_FRAGMENT\_NODE**: `11`

node is a DocumentFragment node.

#### Inherited from

HTMLElement.DOCUMENT\_FRAGMENT\_NODE

***

### DOCUMENT\_NODE

`Readonly` **DOCUMENT\_NODE**: `9`

node is a document.

#### Inherited from

HTMLElement.DOCUMENT\_NODE

***

### DOCUMENT\_POSITION\_CONTAINED\_BY

`Readonly` **DOCUMENT\_POSITION\_CONTAINED\_BY**: `16`

Set when other is a descendant of node.

#### Inherited from

HTMLElement.DOCUMENT\_POSITION\_CONTAINED\_BY

***

### DOCUMENT\_POSITION\_CONTAINS

`Readonly` **DOCUMENT\_POSITION\_CONTAINS**: `8`

Set when other is an ancestor of node.

#### Inherited from

HTMLElement.DOCUMENT\_POSITION\_CONTAINS

***

### DOCUMENT\_POSITION\_DISCONNECTED

`Readonly` **DOCUMENT\_POSITION\_DISCONNECTED**: `1`

Set when node and other are not in the same tree.

#### Inherited from

HTMLElement.DOCUMENT\_POSITION\_DISCONNECTED

***

### DOCUMENT\_POSITION\_FOLLOWING

`Readonly` **DOCUMENT\_POSITION\_FOLLOWING**: `4`

Set when other is following node.

#### Inherited from

HTMLElement.DOCUMENT\_POSITION\_FOLLOWING

***

### DOCUMENT\_POSITION\_IMPLEMENTATION\_SPECIFIC

`Readonly` **DOCUMENT\_POSITION\_IMPLEMENTATION\_SPECIFIC**: `32`

#### Inherited from

HTMLElement.DOCUMENT\_POSITION\_IMPLEMENTATION\_SPECIFIC

***

### DOCUMENT\_POSITION\_PRECEDING

`Readonly` **DOCUMENT\_POSITION\_PRECEDING**: `2`

Set when other is preceding node.

#### Inherited from

HTMLElement.DOCUMENT\_POSITION\_PRECEDING

***

### DOCUMENT\_TYPE\_NODE

`Readonly` **DOCUMENT\_TYPE\_NODE**: `10`

node is a doctype.

#### Inherited from

HTMLElement.DOCUMENT\_TYPE\_NODE

***

### ELEMENT\_NODE

`Readonly` **ELEMENT\_NODE**: `1`

node is an element.

#### Inherited from

HTMLElement.ELEMENT\_NODE

***

### ENTITY\_NODE

`Readonly` **ENTITY\_NODE**: `6`

#### Inherited from

HTMLElement.ENTITY\_NODE

***

### ENTITY\_REFERENCE\_NODE

`Readonly` **ENTITY\_REFERENCE\_NODE**: `5`

#### Inherited from

HTMLElement.ENTITY\_REFERENCE\_NODE

***

### NOTATION\_NODE

`Readonly` **NOTATION\_NODE**: `12`

#### Inherited from

HTMLElement.NOTATION\_NODE

***

### PROCESSING\_INSTRUCTION\_NODE

`Readonly` **PROCESSING\_INSTRUCTION\_NODE**: `7`

node is a ProcessingInstruction node.

#### Inherited from

HTMLElement.PROCESSING\_INSTRUCTION\_NODE

***

### TEXT\_NODE

`Readonly` **TEXT\_NODE**: `3`

node is a Text node.

#### Inherited from

HTMLElement.TEXT\_NODE

***

### accessKey

**accessKey**: `string`

#### Inherited from

HTMLElement.accessKey

***

### accessKeyLabel

`Readonly` **accessKeyLabel**: `string`

#### Inherited from

HTMLElement.accessKeyLabel

***

### ariaAtomic

**ariaAtomic**: `null` | `string`

#### Inherited from

HTMLElement.ariaAtomic

***

### ariaAutoComplete

**ariaAutoComplete**: `null` | `string`

#### Inherited from

HTMLElement.ariaAutoComplete

***

### ariaBusy

**ariaBusy**: `null` | `string`

#### Inherited from

HTMLElement.ariaBusy

***

### ariaChecked

**ariaChecked**: `null` | `string`

#### Inherited from

HTMLElement.ariaChecked

***

### ariaColCount

**ariaColCount**: `null` | `string`

#### Inherited from

HTMLElement.ariaColCount

***

### ariaColIndex

**ariaColIndex**: `null` | `string`

#### Inherited from

HTMLElement.ariaColIndex

***

### ariaColSpan

**ariaColSpan**: `null` | `string`

#### Inherited from

HTMLElement.ariaColSpan

***

### ariaCurrent

**ariaCurrent**: `null` | `string`

#### Inherited from

HTMLElement.ariaCurrent

***

### ariaDisabled

**ariaDisabled**: `null` | `string`

#### Inherited from

HTMLElement.ariaDisabled

***

### ariaExpanded

**ariaExpanded**: `null` | `string`

#### Inherited from

HTMLElement.ariaExpanded

***

### ariaHasPopup

**ariaHasPopup**: `null` | `string`

#### Inherited from

HTMLElement.ariaHasPopup

***

### ariaHidden

**ariaHidden**: `null` | `string`

#### Inherited from

HTMLElement.ariaHidden

***

### ariaInvalid

**ariaInvalid**: `null` | `string`

#### Inherited from

HTMLElement.ariaInvalid

***

### ariaKeyShortcuts

**ariaKeyShortcuts**: `null` | `string`

#### Inherited from

HTMLElement.ariaKeyShortcuts

***

### ariaLabel

**ariaLabel**: `null` | `string`

#### Inherited from

HTMLElement.ariaLabel

***

### ariaLevel

**ariaLevel**: `null` | `string`

#### Inherited from

HTMLElement.ariaLevel

***

### ariaLive

**ariaLive**: `null` | `string`

#### Inherited from

HTMLElement.ariaLive

***

### ariaModal

**ariaModal**: `null` | `string`

#### Inherited from

HTMLElement.ariaModal

***

### ariaMultiLine

**ariaMultiLine**: `null` | `string`

#### Inherited from

HTMLElement.ariaMultiLine

***

### ariaMultiSelectable

**ariaMultiSelectable**: `null` | `string`

#### Inherited from

HTMLElement.ariaMultiSelectable

***

### ariaOrientation

**ariaOrientation**: `null` | `string`

#### Inherited from

HTMLElement.ariaOrientation

***

### ariaPlaceholder

**ariaPlaceholder**: `null` | `string`

#### Inherited from

HTMLElement.ariaPlaceholder

***

### ariaPosInSet

**ariaPosInSet**: `null` | `string`

#### Inherited from

HTMLElement.ariaPosInSet

***

### ariaPressed

**ariaPressed**: `null` | `string`

#### Inherited from

HTMLElement.ariaPressed

***

### ariaReadOnly

**ariaReadOnly**: `null` | `string`

#### Inherited from

HTMLElement.ariaReadOnly

***

### ariaRequired

**ariaRequired**: `null` | `string`

#### Inherited from

HTMLElement.ariaRequired

***

### ariaRoleDescription

**ariaRoleDescription**: `null` | `string`

#### Inherited from

HTMLElement.ariaRoleDescription

***

### ariaRowCount

**ariaRowCount**: `null` | `string`

#### Inherited from

HTMLElement.ariaRowCount

***

### ariaRowIndex

**ariaRowIndex**: `null` | `string`

#### Inherited from

HTMLElement.ariaRowIndex

***

### ariaRowSpan

**ariaRowSpan**: `null` | `string`

#### Inherited from

HTMLElement.ariaRowSpan

***

### ariaSelected

**ariaSelected**: `null` | `string`

#### Inherited from

HTMLElement.ariaSelected

***

### ariaSetSize

**ariaSetSize**: `null` | `string`

#### Inherited from

HTMLElement.ariaSetSize

***

### ariaSort

**ariaSort**: `null` | `string`

#### Inherited from

HTMLElement.ariaSort

***

### ariaValueMax

**ariaValueMax**: `null` | `string`

#### Inherited from

HTMLElement.ariaValueMax

***

### ariaValueMin

**ariaValueMin**: `null` | `string`

#### Inherited from

HTMLElement.ariaValueMin

***

### ariaValueNow

**ariaValueNow**: `null` | `string`

#### Inherited from

HTMLElement.ariaValueNow

***

### ariaValueText

**ariaValueText**: `null` | `string`

#### Inherited from

HTMLElement.ariaValueText

***

### assignedSlot

`Readonly` **assignedSlot**: `null` | `HTMLSlotElement`

#### Inherited from

HTMLElement.assignedSlot

***

### attributes

`Readonly` **attributes**: `NamedNodeMap`

#### Inherited from

HTMLElement.attributes

***

### autocapitalize

**autocapitalize**: `string`

#### Inherited from

HTMLElement.autocapitalize

***

### autofocus

**autofocus**: `boolean`

#### Inherited from

HTMLElement.autofocus

***

### baseURI

`Readonly` **baseURI**: `string`

Returns node's node document's document base URL.

#### Inherited from

HTMLElement.baseURI

***

### childElementCount

`Readonly` **childElementCount**: `number`

#### Inherited from

HTMLElement.childElementCount

***

### childNodes

`Readonly` **childNodes**: `NodeListOf`<`ChildNode`>

Returns the children.

#### Inherited from

HTMLElement.childNodes

***

### children

`Readonly` **children**: `HTMLCollection`

Returns the child elements.

#### Inherited from

HTMLElement.children

***

### classList

`Readonly` **classList**: `DOMTokenList`

Allows for manipulation of element's class content attribute as a set of whitespace-separated tokens through a DOMTokenList object.

#### Inherited from

HTMLElement.classList

***

### className

**className**: `string`

Returns the value of element's class content attribute. Can be set to change it.

#### Inherited from

HTMLElement.className

***

### clientHeight

`Readonly` **clientHeight**: `number`

#### Inherited from

HTMLElement.clientHeight

***

### clientLeft

`Readonly` **clientLeft**: `number`

#### Inherited from

HTMLElement.clientLeft

***

### clientTop

`Readonly` **clientTop**: `number`

#### Inherited from

HTMLElement.clientTop

***

### clientWidth

`Readonly` **clientWidth**: `number`

#### Inherited from

HTMLElement.clientWidth

***

### contentEditable

**contentEditable**: `string`

#### Inherited from

HTMLElement.contentEditable

***

### dataset

`Readonly` **dataset**: `DOMStringMap`

#### Inherited from

HTMLElement.dataset

***

### dir

**dir**: `string`

#### Inherited from

HTMLElement.dir

***

### draggable

**draggable**: `boolean`

#### Inherited from

HTMLElement.draggable

***

### enterKeyHint

**enterKeyHint**: `string`

#### Inherited from

HTMLElement.enterKeyHint

***

### firstChild

`Readonly` **firstChild**: `null` | `ChildNode`

Returns the first child.

#### Inherited from

HTMLElement.firstChild

***

### firstElementChild

`Readonly` **firstElementChild**: `null` | `Element`

Returns the first child that is an element, and null otherwise.

#### Inherited from

HTMLElement.firstElementChild

***

### hidden

**hidden**: `boolean`

#### Inherited from

HTMLElement.hidden

***

### id

**id**: `string`

Returns the value of element's id content attribute. Can be set to change it.

#### Inherited from

HTMLElement.id

***

### inert

**inert**: `boolean`

#### Inherited from

HTMLElement.inert

***

### innerHTML

**innerHTML**: `string`

#### Inherited from

HTMLElement.innerHTML

***

### innerText

**innerText**: `string`

#### Inherited from

HTMLElement.innerText

***

### inputMode

**inputMode**: `string`

#### Inherited from

HTMLElement.inputMode

***

### isConnected

`Readonly` **isConnected**: `boolean`

Returns true if node is connected and false otherwise.

#### Inherited from

HTMLElement.isConnected

***

### isContentEditable

`Readonly` **isContentEditable**: `boolean`

#### Inherited from

HTMLElement.isContentEditable

***

### key

`Optional` **key**: `string` | `number`

***

### lang

**lang**: `string`

#### Inherited from

HTMLElement.lang

***

### lastChild

`Readonly` **lastChild**: `null` | `ChildNode`

Returns the last child.

#### Inherited from

HTMLElement.lastChild

***

### lastElementChild

`Readonly` **lastElementChild**: `null` | `Element`

Returns the last child that is an element, and null otherwise.

#### Inherited from

HTMLElement.lastElementChild

***

### localName

`Readonly` **localName**: `string`

Returns the local name.

#### Inherited from

HTMLElement.localName

***

### namespaceURI

`Readonly` **namespaceURI**: `null` | `string`

Returns the namespace.

#### Inherited from

HTMLElement.namespaceURI

***

### nextElementSibling

`Readonly` **nextElementSibling**: `null` | `Element`

Returns the first following sibling that is an element, and null otherwise.

#### Inherited from

HTMLElement.nextElementSibling

***

### nextSibling

`Readonly` **nextSibling**: `null` | `ChildNode`

Returns the next sibling.

#### Inherited from

HTMLElement.nextSibling

***

### nodeName

`Readonly` **nodeName**: `string`

Returns a string appropriate for the type of node.

#### Inherited from

HTMLElement.nodeName

***

### nodeType

`Readonly` **nodeType**: `number`

Returns the type of node.

#### Inherited from

HTMLElement.nodeType

***

### nodeValue

**nodeValue**: `null` | `string`

#### Inherited from

HTMLElement.nodeValue

***

### nonce

`Optional` **nonce**: `string`

#### Inherited from

HTMLElement.nonce

***

### offsetHeight

`Readonly` **offsetHeight**: `number`

#### Inherited from

HTMLElement.offsetHeight

***

### offsetLeft

`Readonly` **offsetLeft**: `number`

#### Inherited from

HTMLElement.offsetLeft

***

### offsetParent

`Readonly` **offsetParent**: `null` | `Element`

#### Inherited from

HTMLElement.offsetParent

***

### offsetTop

`Readonly` **offsetTop**: `number`

#### Inherited from

HTMLElement.offsetTop

***

### offsetWidth

`Readonly` **offsetWidth**: `number`

#### Inherited from

HTMLElement.offsetWidth

***

### onabort

**onabort**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `UIEvent`) => `any`

Fires when the user aborts the download.

**`Param`**

The event.

#### Inherited from

HTMLElement.onabort

***

### onanimationcancel

**onanimationcancel**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `AnimationEvent`) => `any`

#### Inherited from

HTMLElement.onanimationcancel

***

### onanimationend

**onanimationend**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `AnimationEvent`) => `any`

#### Inherited from

HTMLElement.onanimationend

***

### onanimationiteration

**onanimationiteration**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `AnimationEvent`) => `any`

#### Inherited from

HTMLElement.onanimationiteration

***

### onanimationstart

**onanimationstart**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `AnimationEvent`) => `any`

#### Inherited from

HTMLElement.onanimationstart

***

### onauxclick

**onauxclick**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `MouseEvent`) => `any`

#### Inherited from

HTMLElement.onauxclick

***

### onbeforeinput

**onbeforeinput**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `InputEvent`) => `any`

#### Inherited from

HTMLElement.onbeforeinput

***

### onblur

**onblur**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `FocusEvent`) => `any`

Fires when the object loses the input focus.

**`Param`**

The focus event.

#### Inherited from

HTMLElement.onblur

***

### oncancel

**oncancel**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

#### Inherited from

HTMLElement.oncancel

***

### oncanplay

**oncanplay**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when playback is possible, but would require further buffering.

**`Param`**

The event.

#### Inherited from

HTMLElement.oncanplay

***

### oncanplaythrough

**oncanplaythrough**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

#### Inherited from

HTMLElement.oncanplaythrough

***

### onchange

**onchange**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Fires when the contents of the object or selection have changed.

**`Param`**

The event.

#### Inherited from

HTMLElement.onchange

***

### onclick

**onclick**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `MouseEvent`) => `any`

Fires when the user clicks the left mouse button on the object

**`Param`**

The mouse event.

#### Inherited from

HTMLElement.onclick

***

### onclose

**onclose**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

#### Inherited from

HTMLElement.onclose

***

### oncontextmenu

**oncontextmenu**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `MouseEvent`) => `any`

Fires when the user clicks the right mouse button in the client area, opening the context menu.

**`Param`**

The mouse event.

#### Inherited from

HTMLElement.oncontextmenu

***

### oncopy

**oncopy**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `ClipboardEvent`) => `any`

#### Inherited from

HTMLElement.oncopy

***

### oncuechange

**oncuechange**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

#### Inherited from

HTMLElement.oncuechange

***

### oncut

**oncut**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `ClipboardEvent`) => `any`

#### Inherited from

HTMLElement.oncut

***

### ondblclick

**ondblclick**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `MouseEvent`) => `any`

Fires when the user double-clicks the object.

**`Param`**

The mouse event.

#### Inherited from

HTMLElement.ondblclick

***

### ondrag

**ondrag**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `DragEvent`) => `any`

Fires on the source object continuously during a drag operation.

**`Param`**

The event.

#### Inherited from

HTMLElement.ondrag

***

### ondragend

**ondragend**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `DragEvent`) => `any`

Fires on the source object when the user releases the mouse at the close of a drag operation.

**`Param`**

The event.

#### Inherited from

HTMLElement.ondragend

***

### ondragenter

**ondragenter**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `DragEvent`) => `any`

Fires on the target element when the user drags the object to a valid drop target.

**`Param`**

The drag event.

#### Inherited from

HTMLElement.ondragenter

***

### ondragleave

**ondragleave**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `DragEvent`) => `any`

Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.

**`Param`**

The drag event.

#### Inherited from

HTMLElement.ondragleave

***

### ondragover

**ondragover**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `DragEvent`) => `any`

Fires on the target element continuously while the user drags the object over a valid drop target.

**`Param`**

The event.

#### Inherited from

HTMLElement.ondragover

***

### ondragstart

**ondragstart**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `DragEvent`) => `any`

Fires on the source object when the user starts to drag a text selection or selected object.

**`Param`**

The event.

#### Inherited from

HTMLElement.ondragstart

***

### ondrop

**ondrop**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `DragEvent`) => `any`

#### Inherited from

HTMLElement.ondrop

***

### ondurationchange

**ondurationchange**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when the duration attribute is updated.

**`Param`**

The event.

#### Inherited from

HTMLElement.ondurationchange

***

### onemptied

**onemptied**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when the media element is reset to its initial state.

**`Param`**

The event.

#### Inherited from

HTMLElement.onemptied

***

### onended

**onended**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when the end of playback is reached.

**`Param`**

The event

#### Inherited from

HTMLElement.onended

***

### onerror

**onerror**: `OnErrorEventHandler`

Fires when an error occurs during object loading.

**`Param`**

The event.

#### Inherited from

HTMLElement.onerror

***

### onfocus

**onfocus**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `FocusEvent`) => `any`

Fires when the object receives focus.

**`Param`**

The event.

#### Inherited from

HTMLElement.onfocus

***

### onformdata

**onformdata**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `FormDataEvent`) => `any`

#### Inherited from

HTMLElement.onformdata

***

### onfullscreenchange

**onfullscreenchange**: `null` | (`this`: `Element`, `ev`: `Event`) => `any`

#### Inherited from

HTMLElement.onfullscreenchange

***

### onfullscreenerror

**onfullscreenerror**: `null` | (`this`: `Element`, `ev`: `Event`) => `any`

#### Inherited from

HTMLElement.onfullscreenerror

***

### ongotpointercapture

**ongotpointercapture**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `PointerEvent`) => `any`

#### Inherited from

HTMLElement.ongotpointercapture

***

### oninput

**oninput**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

#### Inherited from

HTMLElement.oninput

***

### oninvalid

**oninvalid**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

#### Inherited from

HTMLElement.oninvalid

***

### onkeydown

**onkeydown**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `KeyboardEvent`) => `any`

Fires when the user presses a key.

**`Param`**

The keyboard event

#### Inherited from

HTMLElement.onkeydown

***

### onkeypress

**onkeypress**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `KeyboardEvent`) => `any`

Fires when the user presses an alphanumeric key.

**`Param`**

The event.

**`Deprecated`**

#### Inherited from

HTMLElement.onkeypress

***

### onkeyup

**onkeyup**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `KeyboardEvent`) => `any`

Fires when the user releases a key.

**`Param`**

The keyboard event

#### Inherited from

HTMLElement.onkeyup

***

### onload

**onload**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Fires immediately after the browser loads the object.

**`Param`**

The event.

#### Inherited from

HTMLElement.onload

***

### onloadeddata

**onloadeddata**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when media data is loaded at the current playback position.

**`Param`**

The event.

#### Inherited from

HTMLElement.onloadeddata

***

### onloadedmetadata

**onloadedmetadata**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when the duration and dimensions of the media have been determined.

**`Param`**

The event.

#### Inherited from

HTMLElement.onloadedmetadata

***

### onloadstart

**onloadstart**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when Internet Explorer begins looking for media data.

**`Param`**

The event.

#### Inherited from

HTMLElement.onloadstart

***

### onlostpointercapture

**onlostpointercapture**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `PointerEvent`) => `any`

#### Inherited from

HTMLElement.onlostpointercapture

***

### onmousedown

**onmousedown**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `MouseEvent`) => `any`

Fires when the user clicks the object with either mouse button.

**`Param`**

The mouse event.

#### Inherited from

HTMLElement.onmousedown

***

### onmouseenter

**onmouseenter**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `MouseEvent`) => `any`

#### Inherited from

HTMLElement.onmouseenter

***

### onmouseleave

**onmouseleave**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `MouseEvent`) => `any`

#### Inherited from

HTMLElement.onmouseleave

***

### onmousemove

**onmousemove**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `MouseEvent`) => `any`

Fires when the user moves the mouse over the object.

**`Param`**

The mouse event.

#### Inherited from

HTMLElement.onmousemove

***

### onmouseout

**onmouseout**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `MouseEvent`) => `any`

Fires when the user moves the mouse pointer outside the boundaries of the object.

**`Param`**

The mouse event.

#### Inherited from

HTMLElement.onmouseout

***

### onmouseover

**onmouseover**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `MouseEvent`) => `any`

Fires when the user moves the mouse pointer into the object.

**`Param`**

The mouse event.

#### Inherited from

HTMLElement.onmouseover

***

### onmouseup

**onmouseup**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `MouseEvent`) => `any`

Fires when the user releases a mouse button while the mouse is over the object.

**`Param`**

The mouse event.

#### Inherited from

HTMLElement.onmouseup

***

### onpaste

**onpaste**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `ClipboardEvent`) => `any`

#### Inherited from

HTMLElement.onpaste

***

### onpause

**onpause**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when playback is paused.

**`Param`**

The event.

#### Inherited from

HTMLElement.onpause

***

### onplay

**onplay**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when the play method is requested.

**`Param`**

The event.

#### Inherited from

HTMLElement.onplay

***

### onplaying

**onplaying**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when the audio or video has started playing.

**`Param`**

The event.

#### Inherited from

HTMLElement.onplaying

***

### onpointercancel

**onpointercancel**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `PointerEvent`) => `any`

#### Inherited from

HTMLElement.onpointercancel

***

### onpointerdown

**onpointerdown**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `PointerEvent`) => `any`

#### Inherited from

HTMLElement.onpointerdown

***

### onpointerenter

**onpointerenter**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `PointerEvent`) => `any`

#### Inherited from

HTMLElement.onpointerenter

***

### onpointerleave

**onpointerleave**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `PointerEvent`) => `any`

#### Inherited from

HTMLElement.onpointerleave

***

### onpointermove

**onpointermove**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `PointerEvent`) => `any`

#### Inherited from

HTMLElement.onpointermove

***

### onpointerout

**onpointerout**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `PointerEvent`) => `any`

#### Inherited from

HTMLElement.onpointerout

***

### onpointerover

**onpointerover**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `PointerEvent`) => `any`

#### Inherited from

HTMLElement.onpointerover

***

### onpointerup

**onpointerup**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `PointerEvent`) => `any`

#### Inherited from

HTMLElement.onpointerup

***

### onprogress

**onprogress**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `ProgressEvent`<`EventTarget`>) => `any`

Occurs to indicate progress while downloading media data.

**`Param`**

The event.

#### Inherited from

HTMLElement.onprogress

***

### onratechange

**onratechange**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when the playback rate is increased or decreased.

**`Param`**

The event.

#### Inherited from

HTMLElement.onratechange

***

### onreset

**onreset**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Fires when the user resets a form.

**`Param`**

The event.

#### Inherited from

HTMLElement.onreset

***

### onresize

**onresize**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `UIEvent`) => `any`

#### Inherited from

HTMLElement.onresize

***

### onscroll

**onscroll**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Fires when the user repositions the scroll box in the scroll bar on the object.

**`Param`**

The event.

#### Inherited from

HTMLElement.onscroll

***

### onsecuritypolicyviolation

**onsecuritypolicyviolation**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `SecurityPolicyViolationEvent`) => `any`

#### Inherited from

HTMLElement.onsecuritypolicyviolation

***

### onseeked

**onseeked**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when the seek operation ends.

**`Param`**

The event.

#### Inherited from

HTMLElement.onseeked

***

### onseeking

**onseeking**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when the current playback position is moved.

**`Param`**

The event.

#### Inherited from

HTMLElement.onseeking

***

### onselect

**onselect**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Fires when the current selection changes.

**`Param`**

The event.

#### Inherited from

HTMLElement.onselect

***

### onselectionchange

**onselectionchange**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

#### Inherited from

HTMLElement.onselectionchange

***

### onselectstart

**onselectstart**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

#### Inherited from

HTMLElement.onselectstart

***

### onslotchange

**onslotchange**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

#### Inherited from

HTMLElement.onslotchange

***

### onstalled

**onstalled**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when the download has stopped.

**`Param`**

The event.

#### Inherited from

HTMLElement.onstalled

***

### onsubmit

**onsubmit**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `SubmitEvent`) => `any`

#### Inherited from

HTMLElement.onsubmit

***

### onsuspend

**onsuspend**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs if the load operation has been intentionally halted.

**`Param`**

The event.

#### Inherited from

HTMLElement.onsuspend

***

### ontimeupdate

**ontimeupdate**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs to indicate the current playback position.

**`Param`**

The event.

#### Inherited from

HTMLElement.ontimeupdate

***

### ontoggle

**ontoggle**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

#### Inherited from

HTMLElement.ontoggle

***

### ontouchcancel

`Optional` **ontouchcancel**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `TouchEvent`) => `any`

#### Inherited from

HTMLElement.ontouchcancel

***

### ontouchend

`Optional` **ontouchend**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `TouchEvent`) => `any`

#### Inherited from

HTMLElement.ontouchend

***

### ontouchmove

`Optional` **ontouchmove**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `TouchEvent`) => `any`

#### Inherited from

HTMLElement.ontouchmove

***

### ontouchstart

`Optional` **ontouchstart**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `TouchEvent`) => `any`

#### Inherited from

HTMLElement.ontouchstart

***

### ontransitioncancel

**ontransitioncancel**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `TransitionEvent`) => `any`

#### Inherited from

HTMLElement.ontransitioncancel

***

### ontransitionend

**ontransitionend**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `TransitionEvent`) => `any`

#### Inherited from

HTMLElement.ontransitionend

***

### ontransitionrun

**ontransitionrun**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `TransitionEvent`) => `any`

#### Inherited from

HTMLElement.ontransitionrun

***

### ontransitionstart

**ontransitionstart**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `TransitionEvent`) => `any`

#### Inherited from

HTMLElement.ontransitionstart

***

### onvolumechange

**onvolumechange**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when the volume is changed, or playback is muted or unmuted.

**`Param`**

The event.

#### Inherited from

HTMLElement.onvolumechange

***

### onwaiting

**onwaiting**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

Occurs when playback stops because the next frame of a video resource is not available.

**`Param`**

The event.

#### Inherited from

HTMLElement.onwaiting

***

### onwebkitanimationend

**onwebkitanimationend**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

**`Deprecated`**

This is a legacy alias of `onanimationend`.

#### Inherited from

HTMLElement.onwebkitanimationend

***

### onwebkitanimationiteration

**onwebkitanimationiteration**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

**`Deprecated`**

This is a legacy alias of `onanimationiteration`.

#### Inherited from

HTMLElement.onwebkitanimationiteration

***

### onwebkitanimationstart

**onwebkitanimationstart**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

**`Deprecated`**

This is a legacy alias of `onanimationstart`.

#### Inherited from

HTMLElement.onwebkitanimationstart

***

### onwebkittransitionend

**onwebkittransitionend**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `Event`) => `any`

**`Deprecated`**

This is a legacy alias of `ontransitionend`.

#### Inherited from

HTMLElement.onwebkittransitionend

***

### onwheel

**onwheel**: `null` | (`this`: `GlobalEventHandlers`, `ev`: `WheelEvent`) => `any`

#### Inherited from

HTMLElement.onwheel

***

### outerHTML

**outerHTML**: `string`

#### Inherited from

HTMLElement.outerHTML

***

### outerText

**outerText**: `string`

#### Inherited from

HTMLElement.outerText

***

### ownerDocument

`Readonly` **ownerDocument**: `Document`

#### Inherited from

HTMLElement.ownerDocument

***

### parentElement

`Readonly` **parentElement**: `null` | `HTMLElement`

Returns the parent element.

#### Inherited from

HTMLElement.parentElement

***

### parentNode

`Readonly` **parentNode**: `null` | `ParentNode`

Returns the parent.

#### Inherited from

HTMLElement.parentNode

***

### part

`Readonly` **part**: `DOMTokenList`

#### Inherited from

HTMLElement.part

***

### prefix

`Readonly` **prefix**: `null` | `string`

Returns the namespace prefix.

#### Inherited from

HTMLElement.prefix

***

### previousElementSibling

`Readonly` **previousElementSibling**: `null` | `Element`

Returns the first preceding sibling that is an element, and null otherwise.

#### Inherited from

HTMLElement.previousElementSibling

***

### previousSibling

`Readonly` **previousSibling**: `null` | `ChildNode`

Returns the previous sibling.

#### Inherited from

HTMLElement.previousSibling

***

### role

**role**: `null` | `string`

#### Inherited from

HTMLElement.role

***

### scrollHeight

`Readonly` **scrollHeight**: `number`

#### Inherited from

HTMLElement.scrollHeight

***

### scrollLeft

**scrollLeft**: `number`

#### Inherited from

HTMLElement.scrollLeft

***

### scrollTop

**scrollTop**: `number`

#### Inherited from

HTMLElement.scrollTop

***

### scrollWidth

`Readonly` **scrollWidth**: `number`

#### Inherited from

HTMLElement.scrollWidth

***

### shadowRoot

`Readonly` **shadowRoot**: `null` | `ShadowRoot`

Returns element's shadow root, if any, and if shadow root's mode is "open", and null otherwise.

#### Inherited from

HTMLElement.shadowRoot

***

### slot

**slot**: `string`

Returns the value of element's slot content attribute. Can be set to change it.

#### Inherited from

HTMLElement.slot

***

### spellcheck

**spellcheck**: `boolean`

#### Inherited from

HTMLElement.spellcheck

***

### style

`Readonly` **style**: `CSSStyleDeclaration`

#### Inherited from

HTMLElement.style

***

### tabIndex

**tabIndex**: `number`

#### Inherited from

HTMLElement.tabIndex

***

### tagName

`Readonly` **tagName**: `string`

Returns the HTML-uppercased qualified name.

#### Inherited from

HTMLElement.tagName

***

### textContent

**textContent**: `null` | `string`

#### Inherited from

HTMLElement.textContent

***

### title

**title**: `string`

#### Inherited from

HTMLElement.title

***

### translate

**translate**: `boolean`

#### Inherited from

HTMLElement.translate

## Methods

### addEventListener

**addEventListener**<`K`>(`type`, `listener`, `options?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `HTMLElementEventMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |
| `listener` | (`this`: `HTMLElement`, `ev`: `HTMLElementEventMap`\[`K`]) => `any` |
| `options?` | `boolean` | `AddEventListenerOptions` |

#### Returns

`void`

#### Inherited from

HTMLElement.addEventListener

**addEventListener**(`type`, `listener`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListenerOrEventListenerObject` |
| `options?` | `boolean` | `AddEventListenerOptions` |

#### Returns

`void`

#### Inherited from

HTMLElement.addEventListener

***

### after

**after**(`...nodes`): `void`

Inserts nodes just after node, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...nodes` | (`string` | `Node`)\[] |

#### Returns

`void`

#### Inherited from

HTMLElement.after

***

### animate

**animate**(`keyframes`, `options?`): `Animation`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyframes` | `null` | `Keyframe`\[] | `PropertyIndexedKeyframes` |
| `options?` | `number` | `KeyframeAnimationOptions` |

#### Returns

`Animation`

#### Inherited from

HTMLElement.animate

***

### append

**append**(`...nodes`): `void`

Inserts nodes after the last child of node, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...nodes` | (`string` | `Node`)\[] |

#### Returns

`void`

#### Inherited from

HTMLElement.append

***

### appendChild

**appendChild**<`T`>(`node`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Node` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `T` |

#### Returns

`T`

#### Inherited from

HTMLElement.appendChild

***

### attachInternals

**attachInternals**(): `ElementInternals`

#### Returns

`ElementInternals`

#### Inherited from

HTMLElement.attachInternals

***

### attachShadow

**attachShadow**(`init`): `ShadowRoot`

Creates a shadow root for element and returns it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `init` | `ShadowRootInit` |

#### Returns

`ShadowRoot`

#### Inherited from

HTMLElement.attachShadow

***

### before

**before**(`...nodes`): `void`

Inserts nodes just before node, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...nodes` | (`string` | `Node`)\[] |

#### Returns

`void`

#### Inherited from

HTMLElement.before

***

### blur

**blur**(): `void`

#### Returns

`void`

#### Inherited from

HTMLElement.blur

***

### checkVisibility

**checkVisibility**(`options?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `CheckVisibilityOptions` |

#### Returns

`boolean`

#### Inherited from

HTMLElement.checkVisibility

***

### click

**click**(): `void`

#### Returns

`void`

#### Inherited from

HTMLElement.click

***

### cloneNode

**cloneNode**(`deep?`): `Node`

Returns a copy of node. If deep is true, the copy also includes the node's descendants.

#### Parameters

| Name | Type |
| :------ | :------ |
| `deep?` | `boolean` |

#### Returns

`Node`

#### Inherited from

HTMLElement.cloneNode

***

### closest

**closest**<`K`>(`selector`): `null` | `HTMLElementTagNameMap`\[`K`]

Returns the first (starting at element) inclusive ancestor that matches selectors, and null otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `HTMLElementTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `K` |

#### Returns

`null` | `HTMLElementTagNameMap`\[`K`]

#### Inherited from

HTMLElement.closest

**closest**<`K`>(`selector`): `null` | `SVGElementTagNameMap`\[`K`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `SVGElementTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `K` |

#### Returns

`null` | `SVGElementTagNameMap`\[`K`]

#### Inherited from

HTMLElement.closest

**closest**<`K`>(`selector`): `null` | `MathMLElementTagNameMap`\[`K`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `MathMLElementTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `K` |

#### Returns

`null` | `MathMLElementTagNameMap`\[`K`]

#### Inherited from

HTMLElement.closest

**closest**<`E`>(`selectors`): `null` | `E`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `Element` = `Element` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectors` | `string` |

#### Returns

`null` | `E`

#### Inherited from

HTMLElement.closest

***

### compareDocumentPosition

**compareDocumentPosition**(`other`): `number`

Returns a bitmask indicating the position of other relative to node.

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `Node` |

#### Returns

`number`

#### Inherited from

HTMLElement.compareDocumentPosition

***

### contains

**contains**(`other`): `boolean`

Returns true if other is an inclusive descendant of node, and false otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `null` | `Node` |

#### Returns

`boolean`

#### Inherited from

HTMLElement.contains

***

### dispatchEvent

**dispatchEvent**(`event`): `boolean`

Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`boolean`

#### Inherited from

HTMLElement.dispatchEvent

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[Disposable](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md).[dispose](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md#dispose)

***

### focus

**focus**(`options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `FocusOptions` |

#### Returns

`void`

#### Inherited from

HTMLElement.focus

***

### getAnimations

**getAnimations**(`options?`): `Animation`\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `GetAnimationsOptions` |

#### Returns

`Animation`\[]

#### Inherited from

HTMLElement.getAnimations

***

### getAttribute

**getAttribute**(`qualifiedName`): `null` | `string`

Returns element's first attribute whose qualified name is qualifiedName, and null if there is no such attribute otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |

#### Returns

`null` | `string`

#### Inherited from

HTMLElement.getAttribute

***

### getAttributeNS

**getAttributeNS**(`namespace`, `localName`): `null` | `string`

Returns element's attribute whose namespace is namespace and local name is localName, and null if there is no such attribute otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `null` | `string` |
| `localName` | `string` |

#### Returns

`null` | `string`

#### Inherited from

HTMLElement.getAttributeNS

***

### getAttributeNames

**getAttributeNames**(): `string`\[]

Returns the qualified names of all element's attributes. Can contain duplicates.

#### Returns

`string`\[]

#### Inherited from

HTMLElement.getAttributeNames

***

### getAttributeNode

**getAttributeNode**(`qualifiedName`): `null` | `Attr`

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |

#### Returns

`null` | `Attr`

#### Inherited from

HTMLElement.getAttributeNode

***

### getAttributeNodeNS

**getAttributeNodeNS**(`namespace`, `localName`): `null` | `Attr`

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `null` | `string` |
| `localName` | `string` |

#### Returns

`null` | `Attr`

#### Inherited from

HTMLElement.getAttributeNodeNS

***

### getBoundingClientRect

**getBoundingClientRect**(): `DOMRect`

#### Returns

`DOMRect`

#### Inherited from

HTMLElement.getBoundingClientRect

***

### getClientRects

**getClientRects**(): `DOMRectList`

#### Returns

`DOMRectList`

#### Inherited from

HTMLElement.getClientRects

***

### getElementsByClassName

**getElementsByClassName**(`classNames`): `HTMLCollectionOf`<`Element`>

Returns a HTMLCollection of the elements in the object on which the method was invoked (a document or an element) that have all the classes given by classNames. The classNames argument is interpreted as a space-separated list of classes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `classNames` | `string` |

#### Returns

`HTMLCollectionOf`<`Element`>

#### Inherited from

HTMLElement.getElementsByClassName

***

### getElementsByTagName

**getElementsByTagName**<`K`>(`qualifiedName`): `HTMLCollectionOf`<`HTMLElementTagNameMap`\[`K`]>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `HTMLElementTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `K` |

#### Returns

`HTMLCollectionOf`<`HTMLElementTagNameMap`\[`K`]>

#### Inherited from

HTMLElement.getElementsByTagName

**getElementsByTagName**<`K`>(`qualifiedName`): `HTMLCollectionOf`<`SVGElementTagNameMap`\[`K`]>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `SVGElementTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `K` |

#### Returns

`HTMLCollectionOf`<`SVGElementTagNameMap`\[`K`]>

#### Inherited from

HTMLElement.getElementsByTagName

**getElementsByTagName**<`K`>(`qualifiedName`): `HTMLCollectionOf`<`MathMLElementTagNameMap`\[`K`]>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `MathMLElementTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `K` |

#### Returns

`HTMLCollectionOf`<`MathMLElementTagNameMap`\[`K`]>

#### Inherited from

HTMLElement.getElementsByTagName

**getElementsByTagName**<`K`>(`qualifiedName`): `HTMLCollectionOf`<`HTMLElementDeprecatedTagNameMap`\[`K`]>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `HTMLElementDeprecatedTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `K` |

#### Returns

`HTMLCollectionOf`<`HTMLElementDeprecatedTagNameMap`\[`K`]>

**`Deprecated`**

#### Inherited from

HTMLElement.getElementsByTagName

**getElementsByTagName**(`qualifiedName`): `HTMLCollectionOf`<`Element`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |

#### Returns

`HTMLCollectionOf`<`Element`>

#### Inherited from

HTMLElement.getElementsByTagName

***

### getElementsByTagNameNS

**getElementsByTagNameNS**(`namespaceURI`, `localName`): `HTMLCollectionOf`<`HTMLElement`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceURI` | `"http://www.w3.org/1999/xhtml"` |
| `localName` | `string` |

#### Returns

`HTMLCollectionOf`<`HTMLElement`>

#### Inherited from

HTMLElement.getElementsByTagNameNS

**getElementsByTagNameNS**(`namespaceURI`, `localName`): `HTMLCollectionOf`<`SVGElement`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceURI` | `"http://www.w3.org/2000/svg"` |
| `localName` | `string` |

#### Returns

`HTMLCollectionOf`<`SVGElement`>

#### Inherited from

HTMLElement.getElementsByTagNameNS

**getElementsByTagNameNS**(`namespaceURI`, `localName`): `HTMLCollectionOf`<`MathMLElement`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceURI` | `"http://www.w3.org/1998/Math/MathML"` |
| `localName` | `string` |

#### Returns

`HTMLCollectionOf`<`MathMLElement`>

#### Inherited from

HTMLElement.getElementsByTagNameNS

**getElementsByTagNameNS**(`namespace`, `localName`): `HTMLCollectionOf`<`Element`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `null` | `string` |
| `localName` | `string` |

#### Returns

`HTMLCollectionOf`<`Element`>

#### Inherited from

HTMLElement.getElementsByTagNameNS

***

### getRootNode

**getRootNode**(`options?`): `Node`

Returns node's root.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `GetRootNodeOptions` |

#### Returns

`Node`

#### Inherited from

HTMLElement.getRootNode

***

### hasAttribute

**hasAttribute**(`qualifiedName`): `boolean`

Returns true if element has an attribute whose qualified name is qualifiedName, and false otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |

#### Returns

`boolean`

#### Inherited from

HTMLElement.hasAttribute

***

### hasAttributeNS

**hasAttributeNS**(`namespace`, `localName`): `boolean`

Returns true if element has an attribute whose namespace is namespace and local name is localName.

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `null` | `string` |
| `localName` | `string` |

#### Returns

`boolean`

#### Inherited from

HTMLElement.hasAttributeNS

***

### hasAttributes

**hasAttributes**(): `boolean`

Returns true if element has attributes, and false otherwise.

#### Returns

`boolean`

#### Inherited from

HTMLElement.hasAttributes

***

### hasChildNodes

**hasChildNodes**(): `boolean`

Returns whether node has children.

#### Returns

`boolean`

#### Inherited from

HTMLElement.hasChildNodes

***

### hasPointerCapture

**hasPointerCapture**(`pointerId`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointerId` | `number` |

#### Returns

`boolean`

#### Inherited from

HTMLElement.hasPointerCapture

***

### insertAdjacentElement

**insertAdjacentElement**(`where`, `element`): `null` | `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `where` | `InsertPosition` |
| `element` | `Element` |

#### Returns

`null` | `Element`

#### Inherited from

HTMLElement.insertAdjacentElement

***

### insertAdjacentHTML

**insertAdjacentHTML**(`position`, `text`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | `InsertPosition` |
| `text` | `string` |

#### Returns

`void`

#### Inherited from

HTMLElement.insertAdjacentHTML

***

### insertAdjacentText

**insertAdjacentText**(`where`, `data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `where` | `InsertPosition` |
| `data` | `string` |

#### Returns

`void`

#### Inherited from

HTMLElement.insertAdjacentText

***

### insertBefore

**insertBefore**<`T`>(`node`, `child`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Node` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `T` |
| `child` | `null` | `Node` |

#### Returns

`T`

#### Inherited from

HTMLElement.insertBefore

***

### isDefaultNamespace

**isDefaultNamespace**(`namespace`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `null` | `string` |

#### Returns

`boolean`

#### Inherited from

HTMLElement.isDefaultNamespace

***

### isEqualNode

**isEqualNode**(`otherNode`): `boolean`

Returns whether node and otherNode have the same properties.

#### Parameters

| Name | Type |
| :------ | :------ |
| `otherNode` | `null` | `Node` |

#### Returns

`boolean`

#### Inherited from

HTMLElement.isEqualNode

***

### isSameNode

**isSameNode**(`otherNode`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `otherNode` | `null` | `Node` |

#### Returns

`boolean`

#### Inherited from

HTMLElement.isSameNode

***

### lookupNamespaceURI

**lookupNamespaceURI**(`prefix`): `null` | `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `null` | `string` |

#### Returns

`null` | `string`

#### Inherited from

HTMLElement.lookupNamespaceURI

***

### lookupPrefix

**lookupPrefix**(`namespace`): `null` | `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `null` | `string` |

#### Returns

`null` | `string`

#### Inherited from

HTMLElement.lookupPrefix

***

### matches

**matches**(`selectors`): `boolean`

Returns true if matching selectors against element's root yields element, and false otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectors` | `string` |

#### Returns

`boolean`

#### Inherited from

HTMLElement.matches

***

### normalize

**normalize**(): `void`

Removes empty exclusive Text nodes and concatenates the data of remaining contiguous exclusive Text nodes into the first of their nodes.

#### Returns

`void`

#### Inherited from

HTMLElement.normalize

***

### prepend

**prepend**(`...nodes`): `void`

Inserts nodes before the first child of node, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...nodes` | (`string` | `Node`)\[] |

#### Returns

`void`

#### Inherited from

HTMLElement.prepend

***

### querySelector

**querySelector**<`K`>(`selectors`): `null` | `HTMLElementTagNameMap`\[`K`]

Returns the first element that is a descendant of node that matches selectors.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `HTMLElementTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectors` | `K` |

#### Returns

`null` | `HTMLElementTagNameMap`\[`K`]

#### Inherited from

HTMLElement.querySelector

**querySelector**<`K`>(`selectors`): `null` | `SVGElementTagNameMap`\[`K`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `SVGElementTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectors` | `K` |

#### Returns

`null` | `SVGElementTagNameMap`\[`K`]

#### Inherited from

HTMLElement.querySelector

**querySelector**<`K`>(`selectors`): `null` | `MathMLElementTagNameMap`\[`K`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `MathMLElementTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectors` | `K` |

#### Returns

`null` | `MathMLElementTagNameMap`\[`K`]

#### Inherited from

HTMLElement.querySelector

**querySelector**<`K`>(`selectors`): `null` | `HTMLElementDeprecatedTagNameMap`\[`K`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `HTMLElementDeprecatedTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectors` | `K` |

#### Returns

`null` | `HTMLElementDeprecatedTagNameMap`\[`K`]

**`Deprecated`**

#### Inherited from

HTMLElement.querySelector

**querySelector**<`E`>(`selectors`): `null` | `E`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `Element` = `Element` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectors` | `string` |

#### Returns

`null` | `E`

#### Inherited from

HTMLElement.querySelector

***

### querySelectorAll

**querySelectorAll**<`K`>(`selectors`): `NodeListOf`<`HTMLElementTagNameMap`\[`K`]>

Returns all element descendants of node that match selectors.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `HTMLElementTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectors` | `K` |

#### Returns

`NodeListOf`<`HTMLElementTagNameMap`\[`K`]>

#### Inherited from

HTMLElement.querySelectorAll

**querySelectorAll**<`K`>(`selectors`): `NodeListOf`<`SVGElementTagNameMap`\[`K`]>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `SVGElementTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectors` | `K` |

#### Returns

`NodeListOf`<`SVGElementTagNameMap`\[`K`]>

#### Inherited from

HTMLElement.querySelectorAll

**querySelectorAll**<`K`>(`selectors`): `NodeListOf`<`MathMLElementTagNameMap`\[`K`]>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `MathMLElementTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectors` | `K` |

#### Returns

`NodeListOf`<`MathMLElementTagNameMap`\[`K`]>

#### Inherited from

HTMLElement.querySelectorAll

**querySelectorAll**<`K`>(`selectors`): `NodeListOf`<`HTMLElementDeprecatedTagNameMap`\[`K`]>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `HTMLElementDeprecatedTagNameMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectors` | `K` |

#### Returns

`NodeListOf`<`HTMLElementDeprecatedTagNameMap`\[`K`]>

**`Deprecated`**

#### Inherited from

HTMLElement.querySelectorAll

**querySelectorAll**<`E`>(`selectors`): `NodeListOf`<`E`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `Element` = `Element` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectors` | `string` |

#### Returns

`NodeListOf`<`E`>

#### Inherited from

HTMLElement.querySelectorAll

***

### releasePointerCapture

**releasePointerCapture**(`pointerId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointerId` | `number` |

#### Returns

`void`

#### Inherited from

HTMLElement.releasePointerCapture

***

### remove

**remove**(): `void`

Removes node.

#### Returns

`void`

#### Inherited from

HTMLElement.remove

***

### removeAttribute

**removeAttribute**(`qualifiedName`): `void`

Removes element's first attribute whose qualified name is qualifiedName.

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |

#### Returns

`void`

#### Inherited from

HTMLElement.removeAttribute

***

### removeAttributeNS

**removeAttributeNS**(`namespace`, `localName`): `void`

Removes element's attribute whose namespace is namespace and local name is localName.

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `null` | `string` |
| `localName` | `string` |

#### Returns

`void`

#### Inherited from

HTMLElement.removeAttributeNS

***

### removeAttributeNode

**removeAttributeNode**(`attr`): `Attr`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attr` | `Attr` |

#### Returns

`Attr`

#### Inherited from

HTMLElement.removeAttributeNode

***

### removeChild

**removeChild**<`T`>(`child`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Node` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `child` | `T` |

#### Returns

`T`

#### Inherited from

HTMLElement.removeChild

***

### removeEventListener

**removeEventListener**<`K`>(`type`, `listener`, `options?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `HTMLElementEventMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |
| `listener` | (`this`: `HTMLElement`, `ev`: `HTMLElementEventMap`\[`K`]) => `any` |
| `options?` | `boolean` | `EventListenerOptions` |

#### Returns

`void`

#### Inherited from

HTMLElement.removeEventListener

**removeEventListener**(`type`, `listener`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListenerOrEventListenerObject` |
| `options?` | `boolean` | `EventListenerOptions` |

#### Returns

`void`

#### Inherited from

HTMLElement.removeEventListener

***

### replaceChild

**replaceChild**<`T`>(`node`, `child`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Node` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `child` | `T` |

#### Returns

`T`

#### Inherited from

HTMLElement.replaceChild

***

### replaceChildren

**replaceChildren**(`...nodes`): `void`

Replace all children of node with nodes, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...nodes` | (`string` | `Node`)\[] |

#### Returns

`void`

#### Inherited from

HTMLElement.replaceChildren

***

### replaceWith

**replaceWith**(`...nodes`): `void`

Replaces node with nodes, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...nodes` | (`string` | `Node`)\[] |

#### Returns

`void`

#### Inherited from

HTMLElement.replaceWith

***

### requestFullscreen

**requestFullscreen**(`options?`): `Promise`<`void`>

Displays element fullscreen and resolves promise when done.

When supplied, options's navigationUI member indicates whether showing navigation UI while in fullscreen is preferred or not. If set to "show", navigation simplicity is preferred over screen space, and if set to "hide", more screen space is preferred. User agents are always free to honor user preference over the application's. The default value "auto" indicates no application preference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `FullscreenOptions` |

#### Returns

`Promise`<`void`>

#### Inherited from

HTMLElement.requestFullscreen

***

### requestPointerLock

**requestPointerLock**(): `void`

#### Returns

`void`

#### Inherited from

HTMLElement.requestPointerLock

***

### scroll

**scroll**(`options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `ScrollToOptions` |

#### Returns

`void`

#### Inherited from

HTMLElement.scroll

**scroll**(`x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Inherited from

HTMLElement.scroll

***

### scrollBy

**scrollBy**(`options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `ScrollToOptions` |

#### Returns

`void`

#### Inherited from

HTMLElement.scrollBy

**scrollBy**(`x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Inherited from

HTMLElement.scrollBy

***

### scrollIntoView

**scrollIntoView**(`arg?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg?` | `boolean` | `ScrollIntoViewOptions` |

#### Returns

`void`

#### Inherited from

HTMLElement.scrollIntoView

***

### scrollTo

**scrollTo**(`options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `ScrollToOptions` |

#### Returns

`void`

#### Inherited from

HTMLElement.scrollTo

**scrollTo**(`x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Inherited from

HTMLElement.scrollTo

***

### setAttribute

**setAttribute**(`qualifiedName`, `value`): `void`

Sets the value of element's first attribute whose qualified name is qualifiedName to value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `value` | `string` |

#### Returns

`void`

#### Inherited from

HTMLElement.setAttribute

***

### setAttributeNS

**setAttributeNS**(`namespace`, `qualifiedName`, `value`): `void`

Sets the value of element's attribute whose namespace is namespace and local name is localName to value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `null` | `string` |
| `qualifiedName` | `string` |
| `value` | `string` |

#### Returns

`void`

#### Inherited from

HTMLElement.setAttributeNS

***

### setAttributeNode

**setAttributeNode**(`attr`): `null` | `Attr`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attr` | `Attr` |

#### Returns

`null` | `Attr`

#### Inherited from

HTMLElement.setAttributeNode

***

### setAttributeNodeNS

**setAttributeNodeNS**(`attr`): `null` | `Attr`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attr` | `Attr` |

#### Returns

`null` | `Attr`

#### Inherited from

HTMLElement.setAttributeNodeNS

***

### setPointerCapture

**setPointerCapture**(`pointerId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointerId` | `number` |

#### Returns

`void`

#### Inherited from

HTMLElement.setPointerCapture

***

### setStyle

**setStyle**(`style`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `style` | [`CSSStyle`](/auto-docs/fixed-layout-editor/types/CSSStyle.md) |

#### Returns

`void`

***

### toggleAttribute

**toggleAttribute**(`qualifiedName`, `force?`): `boolean`

If force is not given, "toggles" qualifiedName, removing it if it is present and adding it if it is not present. If force is true, adds qualifiedName. If force is false, removes qualifiedName.

Returns true if qualifiedName is now present, and false otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualifiedName` | `string` |
| `force?` | `boolean` |

#### Returns

`boolean`

#### Inherited from

HTMLElement.toggleAttribute

***

### webkitMatchesSelector

**webkitMatchesSelector**(`selectors`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selectors` | `string` |

#### Returns

`boolean`

**`Deprecated`**

This is a legacy alias of `matches`.

#### Inherited from

HTMLElement.webkitMatchesSelector
