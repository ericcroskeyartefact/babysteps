

function vEnableDrag( el, userDragStart, userDrag, userDragEnd )
{
  var _i = this;

  // params
  _i.el = xGetElementById(el);
  _i.userDragStart = userDragStart;
  _i.userDrag = userDrag;
  _i.userDragEnd = userDragEnd;


  // locals
  _i.isSilk = null;
  _i.isIOS = null;
  _i.isIE = null;
  _i.isTouch = null;

  _i.startEventName = null;
  _i.dragEventName = null;
  _i.endEventName = null;

  _i.mx = null;
  _i.my = null;
  _i.eventArray = [];

  // these get assigned to userDrag.. or defaultUserDrag.. if unspecified
  _i.dragStartCallback = null;
  _i.dragCallback = null;
  _i.dragEndCallback = null;



  _i._doNothing = function() { }


  _i.defaultUserDrag = function( ele, dx, dy, evt )
  {
    xMoveTo( ele, xLeft(ele) + dx, xTop(ele) + dy );
  }


  _i.normalizeEvent = function( evt )
  {
    if ( _i.isIE )
    {
      evt = window.event;
      evt.timeStamp = Date.now();
    }

    if ( _i.isSilk )
    {
      evt.timeStamp = new Date(evt.timeStamp).getTime();
    }

    return evt;
  }


  _i.dragStart = function( evt )
  {
    if ( _i.isTouch )
    {
      // check for multitouches
      if ( evt.changedTouches.length > 1 ) { return; }
      evt.clientX = evt.changedTouches[0].clientX;
      evt.clientY = evt.changedTouches[0].clientY;
    }

    // normalize event
    if ( _i.isIE || _i.isSilk )
    {
      evt = _i.normalizeEvent(evt);
    }
  
    _i.eventArray = [];

    _i.totalVectorX = 0;
    _i.totalVectorY = 0;
    _i.totalDx = 0;
    _i.totalDy = 0;

    evt.mx = _i.mx = evt.clientX;
    evt.my = _i.my = evt.clientY;
  
    _i.dragStartCallback( _i.el, evt.clientX, evt.clientY, evt );

    xAddEventListener( _i.eventAttachTo, _i.dragEventName, _i.drag, true );
    xAddEventListener( _i.eventAttachTo, _i.endEventName, _i.dragEnd, true );
    
  }


  _i.drag = function( evt )
  {
    if ( _i.isTouch )
    {    
      if ( evt.changedTouches.length > 1 ) { return; }
    	evt.clientX = evt.changedTouches[0].clientX;
    	evt.clientY = evt.changedTouches[0].clientY;
    }
    

    if ( _i.isIE || _i.isSilk )
    {
      evt = _i.normalizeEvent(evt);
    }


    var curDx = evt.clientX - _i.mx;
    var curDy = evt.clientY - _i.my;
    
    _i.totalDx += curDx;
    _i.totalDy += curDy;
    _i.totalVectorX += Math.abs(curDx);
    _i.totalVectorY += Math.abs(curDy);

    evt.mx = _i.mx = evt.clientX;
    evt.my = _i.my = evt.clientY;


    _i.eventArray.unshift(evt);
    _i.eventArray = _i.eventArray.slice(0,6);

    _i.dragCallback( _i.el, curDx, curDy, evt );    
  }


  _i.dragEnd = function( evt )
  {
    if ( _i.isTouch )
    {
      if ( evt.changedTouches.length > 1 ) { return; }
      evt.clientX = evt.changedTouches[0].clientX;
      evt.clientY = evt.changedTouches[0].clientY;      
    }

    // normalize event
    if ( _i.isIE || _i.isSilk )
    {
      evt = _i.normalizeEvent(evt);
    }

    xRemoveEventListener( _i.eventAttachTo, _i.endEventName, _i.dragEnd, true);
    xRemoveEventListener( _i.eventAttachTo, _i.dragEventName, _i.drag, true);      

    evt.velocityY = 0;
    evt.velocityX = 0;
    evt.totalDx = _i.totalDx;
    evt.totalDy = _i.totalDy;
    evt.totalVectorX = _i.totalVectorX;
    evt.totalVectorY = _i.totalVectorY;

    if ( _i.eventArray.length > 3 )
    {
      vT = evt.timeStamp -  _i.eventArray[_i.eventArray.length-1].timeStamp;
      vY = _i.eventArray[0].my - _i.eventArray[_i.eventArray.length-1].my;
      vX = _i.eventArray[0].mx - _i.eventArray[_i.eventArray.length-1].mx;

      if ( vT > 0 )
      {
        evt.velocityY = vY / vT;
        evt.velocityX = vX / vT;
      }

    }

    _i.dragEndCallback( _i.el, evt.clientX, evt.clientY, evt );

  }
  

  _i.constructor = function()
  {
    _i.dragStartCallback = _i.userDragStart || _i._doNothing;
    _i.dragCallback = _i.userDrag || _i.defaultUserDrag;
    _i.dragEndCallback = _i.userDragEnd || _i._doNothing;

    _i.startEventName = platform.dragstart;
    _i.dragEventName = platform.drag;
    _i.endEventName = platform.dragend;
    
    _i.isTouch = platform.touch;
    

    _i.isIE = false;
    _i.isSilk = false;


    if ( navigator.userAgent.indexOf("MSIE") > -1 )
    {
      _i.isIE = true;
    }


    if( navigator.userAgent.indexOf("Silk") > -1 )
    {
      _i.isSilk = true;
    }
    
    if( (navigator.userAgent.toLowerCase().indexOf("ipod") > -1) ||
        (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
        (navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
        (navigator.userAgent.toLowerCase().indexOf("at100") > -1 ) || 
        _i.isSilk )
    {
      _i.eventAttachTo = _i.el;
    }
    else
    {
      _i.eventAttachTo = document;
    }

    // start event attaches to element regardless of platform
    xAddEventListener(_i.el, _i.startEventName, _i.dragStart, true );
  }


  _i.constructor();
}


