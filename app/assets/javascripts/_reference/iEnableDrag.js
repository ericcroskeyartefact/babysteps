


function ipodScaler()
{
	var _i = this;
	
	_i.cont = null;
	_i.minus = null;
	_i.plus = null;
	_i.index = null;
	
	_i.scales = [.25, .6, .75, 1, 1.25, 1.5];
	

	_i.setMeta = function(newScale)
	{
		var m = document.getElementsByTagName("meta")[0];
		m.parentNode.removeChild(m);
		
		m = document.createElement("meta");
		m.setAttribute("name","viewport");
		m.setAttribute("content","width=device-width, user-scalable=no, height=device-height initial-scale=" + newScale);
		
		document.getElementsByTagName("head")[0].appendChild(m);
	}

	
	_i.sizes = [
		{ left:30, marginRight:50, width:40, height:40, fontSize:30 },
		{ left:30, marginRight:50, width:32, height:32, fontSize:22 },
		{ left:30, marginRight:50, width:26, height:26, fontSize:18 },
		{ left:30, marginRight:50, width:21, height:21, fontSize:14 },
		{ left:30, marginRight:50, width:18, height:18, fontSize:12 },
		{ left:30, marginRight:50, width:13, height:13, fontSize:10 },
		{ left:30, marginRight:50, width:11, height:11, fontSize:9 }
	];

	
	_i.decScale = function()
	{
		if (_i.index > 0) { _i.index--; }
		_i.setScale(_i.index);
	}
	
	
	_i.incScale = function()
	{
		if (_i.index < _i.scales.length - 1) { _i.index++; }
		_i.setScale(_i.index);
	}
	
	
	_i.setScale = function(ind)
	{
		_i.index = ind;
		
		_i.minus.style.left = _i.sizes[_i.index].left + "px";
		_i.minus.style.marginRight = _i.sizes[_i.index].marginRight + "px";
		_i.minus.style.width = _i.sizes[_i.index].width + "px";
		_i.minus.style.height = _i.sizes[_i.index].height + "px";
		_i.minus.style.fontSize = _i.sizes[_i.index].fontSize + "px";
		_i.minus.style.cursor = "pointer";
		
		_i.plus.style.left = _i.sizes[_i.index].left + "px";
		_i.plus.style.marginRight = _i.sizes[_i.index].marginRight + "px";
		_i.plus.style.width = _i.sizes[_i.index].width + "px";
		_i.plus.style.height = _i.sizes[_i.index].height + "px";
		_i.plus.style.fontSize = _i.sizes[_i.index].fontSize + "px";
		_i.plus.style.cursor = "pointer";
		
		_i.setMeta(_i.scales[_i.index]);
	}
	
	
	_i.constructor = function()
	{
		_i.cont = document.createElement("DIV");
		_i.cont.style.position = "absolute";
		_i.cont.style.left = "0px";
		_i.cont.style.top = "0px";
	
		_i.minus = document.createElement("SPAN");
		_i.minus.className = "magBox";
		_i.minus.innerHTML = "-";
		_i.minus.onclick = _i.decScale;
		
		_i.plus = document.createElement("SPAN");
		_i.plus.className = "magBox";
		_i.plus.innerHTML = "+";
		_i.plus.onclick = _i.incScale;
			
		document.body.appendChild(_i.cont);
		_i.cont.appendChild(_i.minus);
		_i.cont.appendChild(_i.plus);
		
	}
	
	_i.constructor();
}


// xEnableDrag r8, Copyright 2002-2007 Michael Foster (Cross-Browser.com)
// Part of X, a Cross-Browser Javascript Library, Distributed under the terms of the GNU LGPL

function xEnableDrag(id,fS,fD,fE,disableOnDrop,doNotCancelEvents)
{
  var mx = 0, my = 0, el = xGetElementById(id);
  
  var isIpod = false;
  var startEventName = "mousedown";
  var dragEventName = "mousemove";
  var endEventName = "mouseup";
  
  if ((navigator.userAgent.toLowerCase().indexOf("ipod") > -1) ||
     (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
     (navigator.userAgent.toLowerCase().indexOf("ipad") > -1))
  {
  	isIpod = true;
  	gIsIpod = true;
  	startEventName = "touchstart";
  	dragEventName = "touchmove";
  	endEventName = "touchend";
  }
  
  if (el) {
    el.xDragEnabled = true;
    xAddEventListener(el, startEventName, dragStart, false);
  }
  
  
  // Private Functions
  function dragStart(e)
  {
    
    if (el.xDragEnabled) 
    {
      var ev = new xEvent(e);
      
      if (isIpod == true)
      {
      	ev.pageX = e.changedTouches[0].pageX;
      	ev.pageY = e.changedTouches[0].pageY;
      	ev.clientX = e.changedTouches[0].clientX;
      	ev.clientY = e.changedTouches[0].clientY;
      	ev.offsetX = ev.pageX - xPageX(el);
      	ev.offsetY = ev.pageY - xPageY(el);      	
      }

      if (fS) 
      {
        if ( fS(el, ev.pageX, ev.pageY, ev) == false ) { return; }
      }

            
      mx = ev.pageX;
      my = ev.pageY;
      
      if ( isIpod != true)
      {
        xAddEventListener(document, dragEventName, drag, false);
        xAddEventListener(document, endEventName, dragEnd, false);
      }
      else
      {
        xAddEventListener(el, dragEventName, drag, false);
        xAddEventListener(el, endEventName, dragEnd, false);
      }
    }
    
    if (!doNotCancelEvents)
    {
      if (isIpod == true)
      {
      	e.preventDefault();
      }
    	else
    	{
    		xPreventDefault(e);
    	}
    }
  }


  function drag(e)
  {
    
    if ( el.xDragEnabled == false ) { return; }
    
    var ev, dx, dy;
    
    ev = new xEvent(e);

    if (isIpod == true)
    {
      ev.nativeEvent.clientX = e.changedTouches[0].clientX;
      ev.nativeEvent.clientY = e.changedTouches[0].clientY;

    	ev.pageX = e.changedTouches[0].pageX;
    	ev.pageY = e.changedTouches[0].pageY;
    	ev.clientX = e.changedTouches[0].clientX;
    	ev.clientY = e.changedTouches[0].clientY;
    	ev.offsetX = ev.pageX - xPageX(el);
    	ev.offsetY = ev.pageY - xPageY(el);      	
    }
        
    dx = ev.pageX - mx;
    dy = ev.pageY - my;
    
    mx = ev.pageX;
    my = ev.pageY;
    
    if (fD) 
    {
      fD(el, dx, dy, ev);
    }
    else 
    {
    	var newX = xLeft(el) + dx;
    	var newY = xTop(el) + dy;
      xMoveTo(el, newX, newY);
    }
    
    if (isIpod == true)
    {
    	e.preventDefault();
    }
  	else
  	{
  		xPreventDefault(e);
  	}    
    
  }
  
  
  function dragEnd(e)
  {
    var ev = new xEvent(e);

    if (isIpod == true)
    {
    	ev.pageX = e.changedTouches[0].pageX;
    	ev.pageY = e.changedTouches[0].pageY;
    	ev.clientX = e.changedTouches[0].clientX;
    	ev.clientY = e.changedTouches[0].clientY;
    	ev.offsetX = ev.pageX - xPageX(el);
    	ev.offsetY = ev.pageY - xPageY(el); 
    }

    if ( isIpod != true )
    {
      xRemoveEventListener(document, endEventName, dragEnd, false);
      xRemoveEventListener(document, dragEventName, drag, false);
    }
    else
    {
      xRemoveEventListener(el, endEventName, dragEnd, false);
      xRemoveEventListener(el, dragEventName, drag, false);      
    }
    
    if (fE) 
    {
      fE(el, ev.pageX, ev.pageY, ev);
    }
    
    if (xEnableDrag.drop) 
    {
      xEnableDrag.drop(el, ev);
    }
    
    if (isIpod == true)
    {
    	e.preventDefault();
    }
  	else
  	{
  		xPreventDefault(e);
  	}    
    
    if ( disableOnDrop == true )
    {
      xRemoveEventListener(el, startEventName, dragStart, false );
    }
  }
}

xEnableDrag.drops = []; // static property


