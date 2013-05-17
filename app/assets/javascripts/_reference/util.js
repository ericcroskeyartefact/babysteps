
// trace and debug pretty-print helpers
__tr = true;
function _TR(s){ if(__tr){ console.log('TRACE: '+s); } }
function _MTL(s){ console.markTimeline(s); }
function _JS(o,pretty){ if(__tr && typeof(o)!="string" && JSON && JSON.stringify) { return pretty ? JSON.stringify(o,null,2) : JSON.stringify(o); } else { return o; } }
function _dump(o,msg) { console.log("DUMP " + (msg ? msg : '') + ":"); console.log(o); };

function __A(condition, description) { 
  if(condition) { return; } else {
    if(localBuild) {
      throw "Assertion failed: " + description;
    } else {
      _TR("Assertion failed: " + description);
    }
  }
}

// http://stackoverflow.com/questions/979975/how-to-get-the-value-from-url-parameter
var QueryString = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
  return query_string;
} ();

var VALID_EMAIL_REGEX = /^[A-Z0-9.'_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function( callback, thisArg ) {
    var T, k;
    if ( this == null ) {
      throw new TypeError( " this is null or not defined" );
    }
    var O = Object(this);
    var len = O.length >>> 0; // Hack to convert O.length to a UInt32
    if ( {}.toString.call(callback) != "[object Function]" ) {
      throw new TypeError( callback + " is not a function" );
    }
    if ( thisArg ) {
      T = thisArg;
    }
    k = 0;
    while( k < len ) {
      var kValue;
      if ( k in O ) {
        kValue = O[ k ];
        callback.call( T, kValue, k, O );
      }
      k++;
    }
  };
}

var DayNamesShort = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

var DayNames = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

var MonthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var MonthNamesLong = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];


// add n days to this date. alters the value of this date
Date.prototype.addDays = function(n) {
  this.setDate(this.getDate() + n);
  return this;
}

// get a new date that is d + n days. d is not altered
Date.addDays = function(d,n) {
  var newDate = new Date(d.getTime());
  newDate.addDays(n);
  return newDate;
}

Date.prototype.toDayOfWeekString = function(longName) {
  var i = this.getDay();
  if(longName) {
    return DayNames[this.getDay()];
  } else {
    return DayNamesShort[this.getDay()];
  }
}

Date.prototype.toInputStyleString = function() {
  var i = this.getDay();
  return DayNames[this.getDay()] + ", " + I18n.l("date.formats.default", this);
}
Date.prototype.toInputStyleStringLong = function() {
  var i = this.getDay();
  return DayNames[this.getDay()] + ", " + I18n.l("date.formats.long", this);
}
Date.prototype.toInputStyleStringDayShort = function() {
  var i = this.getDay();
  return DayNamesShort[this.getDay()] + ", " + I18n.l("date.formats.default", this);
}

Date.prototype.toFeedStyleFormattedString = function () {
    var now = new Date()
    var one_day = 1000 * 60 * 60 * 24
    var timeFromDate = this.getTime();
    var timeFromNow = now.getTime();

    if (timeFromDate >= timeFromNow - (1000 * 60))
    {
      return "Now";
    }
    if ((timeFromNow - timeFromDate) < one_day)
    {
      var mins = timeFromNow - timeFromDate;
      mins = mins / (1000 * 60)
      if (mins < 60)
      {
        return mins.toFixed(0) + ((mins.toFixed(0) == "1") ? " minute ago" : " minutes ago");
      }
      else
      {
        var hours = mins / 60;
        hours+= 1;
        return hours.toFixed(0) + ((hours.toFixed(0) == "1") ? " hour ago" : " hours ago");
      }
    }
    return this.toDateTimeFormattedString();
}

Date.prototype.daysInMonth = function() {
  return new Date(this.getYear(),this.getMonth()+1,0).getDate();
}

Date.prototype.toDateFormattedStringShort = function() {
  return I18n.l("date.formats.short", this);
}

Date.prototype.toDateFormattedStringShortWithYear = function() {
  return this.toDateFormattedStringShort() + ", " +  this.getFullYear();
}

Date.prototype.toInputStyleStringShort = function() {
  return I18n.l("date.formats.default", this);
}

Date.prototype.toDateFormattedString = function() {
  return I18n.l("date.formats.long", this);
}

Date.prototype.toDateTimeFormattedString = function() {
  return I18n.l("time.formats.long", this);
}

Date.prototype.toStartOfDay = Date.prototype.toStartOfDay || function() {
  this.setHours(0,0,0,0);
  return this;
}

// added return value so function can be used
// on a new instance
Date.toStartOfDay = Date.toStartOfDay || function(d) {
  var newDate = new Date(d.getTime());
  newDate.toStartOfDay();
  return newDate;
}

Date.prototype.toStartOfWeek = Date.prototype.toStartOfWeek || function(day) {
  this.toStartOfDay();
  day = day || 0;
  while (this.getDay() != day)
  {
    this.setDate(this.getDate()-1);
  }
}

Date.toStartOfWeek = Date.toStartOfWeek || function(d,day) {
  var newDate = new Date(d.getTime());
  newDate.toStartOfWeek(day);
  return newDate;
}

Date.prototype.toEndOfWeek = Date.prototype.toEndOfWeek || function(day) {
  this.toStartOfDay();
  day = day || 6;
  while (this.getDay() != day)
  {
    this.setDate(this.getDate()+1);
  }
}

Date.toEndOfWeek = Date.toStartOfWeek || function(d,day) {
  var newDate = new Date(d.getTime());
  newDate.toEndOfWeek(day);
  return newDate;
}

Date.prototype.toStartOfMonth = Date.prototype.toStartOfMonth || function() {
  this.toStartOfDay();
  this.setDate(1);
}

Date.toStartOfMonth = Date.toStartOfMonth || function(d) {
  var newDate = new Date(d.getTime());
  newDate.toStartOfMonth();
  return newDate;
}

Date.prototype.toEndOfMonth = Date.prototype.toEndOfMonth || function() {
  this.toStartOfDay();
  this.setDate(1);
  this.setMonth(this.getMonth() + 1);
  this.setDate(0);
}

Date.toEndOfMonth = Date.toEndOfMonth || function(d) {
  var newDate = new Date(d.getTime());
  newDate.toEndOfMonth();
  return newDate;
}

Date.prototype.toStartOfYear = Date.prototype.toStartOfYear || function() {
  this.toStartOfDay();
  this.setDate(1);
  this.setMonth(0);
}

Date.toStartOfYear = Date.toStartOfYear || function(d) {
  var newDate = new Date(d.getTime());
  newDate.toStartOfYear();
  return newDate;
}

Date.prototype.toEndOfYear = Date.prototype.toEndOfYear || function() {
  this.toStartOfDay();
  this.setDate(1);
  this.setMonth(11);
  this.setDate(31);
}

Date.prototype.equals = Date.prototype.equals || function(anotherDate) {
  return this.getTime() == anotherDate.getTime();
}

Date.prototype.toRubyDate = Date.prototype.toRubyDate || function() {
  return this.getDate() + "-" + (this.getMonth() + 1) + "-" + this.getFullYear();
}

Date.prototype.getWeek = function() {
var onejan = new Date(this.getFullYear(),0,1);
return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

Date.toEndOfYear = Date.toEndOfYear || function(d) {
  var newDate = new Date(d.getTime());
  newDate.toEndOfYear();
  return newDate;
}

Date.sameDay = function(a, b) {
  return a.getDate() == b.getDate() &&
        a.getMonth() == b.getMonth() &&
        a.getFullYear() == b.getFullYear();
}

Date.forDayOfWeek = function(d,day) {
  return Date.addDays(d, day - d.getDay())
}

Date.min = function(a, b) {
  return a.getTime() <= b.getTime() ? a : b;
}

Date.max = function(a, b) {
  return a.getTime() >= b.getTime() ? a : b;
}

Date.differenceMilliseconds = function(a, b) {
  return Math.abs(a.getTime() - b.getTime());
}

Date._MS_PER_DAY = 1000 * 60 * 60 * 24;

Date.calendarDayDiff = function(a, b) {
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / Date._MS_PER_DAY);
}

String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}

Array.prototype.removeById = function(id,idPropertyName) {
  idPropertyName = idPropertyName || "id";
  for (var i = 0; i < this.length; ++i) {
    if (this[i][idPropertyName] == id) {
      return this.splice(i, 1);
    }
  }
  return false;
}

Array.prototype.indexOfId = function(id,idPropertyName) {
  idPropertyName = idPropertyName || "id";
  for (var i = 0; i < this.length; ++i) {
    if (this[i][idPropertyName] == id) {
      return i;
    }
  }
  return -1;
}

//taken from http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
// Utility methods
function formatCurrency(num, options) {
    if (isNaN(parseFloat(num)) && isFinite(num))
      return I18n.toCurrency(0, options);
    else
      return I18n.toCurrency(num, options);
}

function gotoMarketingSite()
{
  document.location = "http://www.10000ft.com";
}

function cancelEvent(e)
{
  if (e == null)
  {
    e = window.event;
  }

  if (!e) { return; }

  if (!window.attachEvent)
  {
    e.stopPropagation && e.stopPropagation();
    e.preventDefault && e.preventDefault();
    return false
  }

  e.cancelBubble = true;
  e.returnValue = false;

  return false;
}


// iterates through DOM and returns the highest Z index used
function hiTagZ()
{

	var retVal = 0;

	var tagArray = ["DIV","IFRAME","IMG","A","UL","LI","OBJECT"];

	for ( y = 0; y < tagArray.length; y++ )
	{
			var curTag = tagArray[y];
			var a = document.getElementsByTagName(curTag);
			for ( var z = 0; z < a.length; z++ )
			{
				var i = xGetComputedStyle(a[z],"z-index",true);
				if (i)
				{
					if (i > retVal) { retVal = i; }
				}
			}
	}

  return retVal;

}


function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function stringComparer(a,b) {
  if ( a < b ) return -1;
  if ( a > b ) return 1;
  return 0;
}

function trim(str)
{
  return str.replace(/^\s+|\s+$/, '');
}

function singleSpace(str)
{
  return str.replace(/\s{2,}/g, ' ');
}

var guid = 0;

function getBaseURL()
{
  var url = location.href;  // entire url including querystring - also: window.location.href;
  var baseURL = url.substring(0, url.indexOf('/', 14));
  return baseURL + "/";
}

// Based on http://bit.ly/P1oMcr
function hashCode(s){
    var h = 5381;
    for (i = 0; i < s.length; i++) {
        char = s.charCodeAt(i);
        h = ((h << 5) + h) + char; /* h * 33 + c */
    }
    return h;
}

/* queue of API event reporting such that they can be completed as low priority
 * delayed reports
 */
var _queuedApiEvents = [],
    _apiEventReporter = setInterval(function() {
      if(_queuedApiEvents.length > 0) {
        var q = _queuedApiEvents,
            i,
            e;
        _queuedApiEvents = [];
        for(i = 0; i<q.length; i++) {
          e = q[i];
          _gaq.push(['_trackEvent', e.category, e.action, e.label, e.value]);
        }
        TRACE_API_CALLS && _TR("[api] tracking queue flushed ");        
      }
    },
    15000 /* flush every 15 seconds */);

/*
 * jsUrl - the API url to GET
 * jOnload - invoked with successful json response
 * onError - invoked when the json response indicates and error
 * noauth - true, if auth tokens should not be attached to the API call
 * allowCache - allow browser to cache the server response
 * onChanged - invoked when data in cache is updated. ignored when allowCache is false.
 */
function injectJS(jsUrl, jsOnload, onError, noauth, allowCache, onChanged)
{
  var url = jsUrl,
      data = noauth ? null : { auth : decodeURIComponent(getCookie(AppCookie.AuthToken)), 
      ___uidh : hashCode(getCookie(AppCookie.UserId) + getCookie(AppCookie.UserTypeId)) },
      startTime,
      sessionCacheKey,
      ajax;

  function getCacheKey() {
    return hashCode(jsUrl + ( noauth ? "" : data.___uidh));
  }

  function getCacheMeta(xhr) {
    var e = xhr.getResponseHeader("ETag"),
        lm = xhr.getResponseHeader("Last-Modified");
    return e + (lm ? new Date(lm).getTime() : "");
  }

  function cacheResponse(json, status, xhr) {
    var key = getCacheKey();
    sessionStorage[key] = JSON.stringify(json);
    sessionStorage[key + "_meta"] = getCacheMeta(xhr); 
  }

  function onsuccess(json, status, xhr) {
    // localBuild && console.log(json);
    if(json.error) {
      if (onError) {
        onError(json.error);
      } else {
        // todo - deprecate, and require onError
        new notificationPopup( "Oops", json.error, 6000 );
      }
    } else {
      // store (cache) result in session
      if(allowCache) {
        cacheResponse(json, status, xhr);
      }
      jsOnload && jsOnload(json);
    }
  }

  function onsuccessAsync(json, status, xhr) {
    if(!json.error && allowCache) {
      // todo if ETag of time-stamp has changed, trigger onChange
      cacheResponse(json, status, xhr);
    }
  }

  function onerror(jqXHR, textStatus, errorThrown) {
    TRACE_API_CALLS && _TR("[api-get] error: " + textStatus);
  }

  function beforeSend(jqXHR, settings) {
    startTime = new Date().getTime();
  }

  function complete(jqXHR, textStatus) {
    var requestTime = new Date().getTime() - startTime;
    TRACE_API_CALLS && _TR("[api-get] " + this.url.replace("?",".json?"));
    TRACE_API_CALLS && _TR("[api-get] completed in " + requestTime + " milliseconds");
    _queuedApiEvents.push({
      category : 'API',
      action : 'GET',
      label : jsUrl,
      value : requestTime
    });
  }

  function execAjax(successCallback) {
    return ajax = $.ajax({
      url: url,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: data,
      success: successCallback,
      error: onerror,
      beforeSend: beforeSend,
      complete: complete,
      cache: (!DISABLE_XHR_CACHING && allowCache == true)
    });
  }

  sessionCacheKey = getCacheKey();
  if(allowCache && DISABLE_SESSION_CACHING == false && sessionStorage[sessionCacheKey]) {
    _TR("sessionStorage cache hit");
    setTimeout(function() { jsOnload && jsOnload(JSON.parse(sessionStorage[sessionCacheKey])); })
    ajax = setTimeout(function() { execAjax(onsuccessAsync); }, 5000);
  } else {    
    ajax = execAjax(onsuccess);
  }

}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getElementsByClassName( dcmnt, tag, clsName )
{
  if ( dcmnt == null )
  {
    dcmnt = document;
  }

  var arr = dcmnt.getElementsByTagName(tag);
  var outArr = [];

  for ( var z = 0; z < arr.length; z++ )
  {
    if ( arr[z].className == clsName )
    {
      outArr[outArr.length] = arr[z];
    }
  }

  return outArr;
}

function parseForURLs(input)
{
  var regEx1 = /(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/;
  input = input.replace(regEx1, "<a href=\"mailto:$1\">$1</a>");
//  var regEx2 = /(^|[^'">])((\\\\)(\S+))(\b|$)/gi;
//  input = input.replace(regEx2, "$1<a target='_blank' href='file:$2'>$2</a>");
  var myregex = /(^|[^'">])((ftp|http|https|file):\/\/(\S+))(\b|$)/gi;
  return input.replace(myregex ,"$1<a target='_blank' href='$2'>$2</a>");
}

function removeAllChildren(parent)
{
    while ( parent.childNodes.length > 0 )
    {
      parent.removeChild(parent.childNodes[0]);
    }
}

function justFilename(urlStr)
{
  var retVal = urlStr;

  var ind = urlStr.lastIndexOf("/");

  if ((ind > -1) && (ind < urlStr.length - 1))
  {
    retVal = retVal.substr(ind+1);
  }

  return retVal;
}


function synchronousPost(data,target)
{
    syncxmlhttp = null;

    if (window.XMLHttpRequest)
    {
        syncxmlhttp=new XMLHttpRequest();
	  }
    else
    {
        syncxmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

	  syncxmlhttp.open("POST",target,false);
	  syncxmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	  syncxmlhttp.send(data);

    return syncxmlhttp.responseText;
}


function colorFromPercent( prcnt )
{
  if ( prcnt < 1 ) { return "#26A5DA"; }
  if ( prcnt > 1 ) { return "#EB008B"; }
  return "#4BB649";
}

function redirect( url, params, replace )
{
  var seperator = "?";

  params = params || {}

  for (v in params)
  {
    url += seperator + v + "=" + params[v];
    seperator = "&";
  }

  if (replace)
  {
    window.location.replace(url);
  }
  else
  {
    window.location.href = url;
  }
}

// Print debug messages on-screen when running locally
_enableDebugMessages = window.location.href.indexOf("localhost") >= 0;

function debugMessage( msg )
{
  if (!_enableDebugMessages)
  {
    return;
  }
  _dwm = window._dwm || [];

  if (!window._dw)
  {
    // Create debug window
    _dw = document.createElement("DIV");
    _dw.style.position = "absolute";
    _dw.style.height = "300px";
    _dw.style.left = "1000px";
    _dw.style.top = "100px";
    document.getElementById("mainCon").appendChild(_dw);
  }

  _dwm.push(msg);
  _dw.innerHTML = "";

  for (var i = 0; i < _dwm.length; ++i) {
    var p = 300 - 2 - (i+1) * 13;
    if (p < 0)
    {
      break;
    }
    var txt = document.createElement("DIV");
    txt.className = "fnt-b-13";
    txt.style.width = "500px";
    txt.style.height = "12px";
    txt.style.color = "#000";
    txt.style.fontSize = "10px";
    txt.style.position = "absolute";
    txt.style.opacity = 1;
    txt.style.top = p + "px";
    txt.style.left = "4px";
    txt.innerHTML = _dwm[_dwm.length - 1 - i];
    _dw.appendChild(txt);
  }
}

// From http://www.netlobo.com/url_query_string_javascript.html
function getParam(name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

// reports use this utility to see if a row is a
// null row (retitled) for pivoting
var commonLeaveType = I18n.t("common.leavetype"); 
var commonNone = I18n.t("common.none");
var commonProjectNone = I18n.t("common.projectnone")  
reportRowisCatchAllRow = function(rowHeader)
{
  return rowHeader == commonLeaveType ||
         rowHeader == commonNone ||
         rowHeader == commonProjectNone;
} 

// Create an object by copying an existing object or if a template. If from is null,
// this method returns a copy of the template, otherwise it returns a copy of from.
function copyOrCreate(from, template)
{
  from = from || template;

  return JSON.parse(JSON.stringify(from));
/*
  var object = {};

  for (var key in from)
  {
    //object[key] = from[key];
  }

  return object;
*/
}


// Quick method to compare objects. Assumes they have the same keys, intended for testing
// whether an object has changed after editing or matches the object it was cloned from.
// Do not use for comparing arbitrary objects for equality.
function objectsEqual(a, b)
{
  if (a == null || b == null)
  {
    return a == b;
  }

  for (var key in a)
  {
    if (a[key] && b[key] && typeof a[key] == "object")
    {
      if (a[key].toString() != b[key].toString())
      {
        return false;
      }
    }
    else if (a[key] !== b[key])
    {
      return false;
    }
  }

  return true;
}

function convertCurrencyToNumber(str)
{
  if (I18n.lookup("number.currency.format.separator") == ".")
    var number = Number(str.replace(/[^0-9\.]+/g,""));
  else if (I18n.lookup("number.currency.format.separator") == ",")
  {
    var str = str.replace(/[^0-9\,]+/g,"")
    var number = Number(str.replace(/[\,]+/g,"."));
  }
  else // default
    var number = Number(str.replace(/[^0-9\.]+/g,""));
  return number;    
}

function getGuid()
{
  window._nextGuid = window._nextGuid || 0;

  return "_guid_" + ++window._nextGuid;
}

_rubyDateRegex = new RegExp(/(\d*)-(\d*)-(\d*)T(\d*):(\d*):(\d*)/);
function parseRubyDateTime(s, includeTime)
{
  var matches = _rubyDateRegex.exec(s);
  var d;
  if (matches && matches.length == 7)
  {
    d = new Date(matches[2] + "/" + matches[3] + "/" + matches[1] + " " + matches[4] + ":" + matches[5] + ":" + matches[6] + " GMT");
  }
  else
  {
    d = new Date(s);
  }

  if (!includeTime)
  {
    d.toStartOfDay();
  }
  return d;
}

function parseRubyDate(s)
{
  var nums = s.split("-");
  nums[1]--;
  d = new Date(nums[0],nums[1],nums[2]);
  if (isNaN(d.getTime()))
  {
    d = parseRubyDateTime(s);
  }
//  d.setHours(d.getHours() + d.getTimezoneOffset() / 60);
  return d;
}

function dateRangesOverlap(d1Start, d1End, d2Start, d2End)
{
  d1Start = d1Start.getTime();
  d1End = d1End.getTime();
  d2Start = d2Start.getTime();
  d2End = d2End.getTime();
  return d1Start < d2End && d1End > d2Start;
}


function mouseWheelHandler(obj, userHandler)
{
	var _i = this;

	function wheelEvent(event)
	{
		var delta = 0;

		event = window.event || event;

	  if (event.wheelDelta)
	  {
	  	delta = event.wheelDelta/120;
	  	if (window.opera) delta = -delta;
		}

		if (event.detail) { delta = -event.detail/3; }

	 	if (delta) { userHandler(delta,event); }

	 	if (event.preventDefault) { event.preventDefault(); }
		event.returnValue = false;

	}

	if (typeof(obj)=="string") obj = document.getElementById(obj);

	if (window.addEventListener) { obj.addEventListener('DOMMouseScroll', wheelEvent, false); }
	obj.onmousewheel = wheelEvent;

}


function dist( x1, y1 )
{
  return Math.sqrt(Math.pow(x1,2) + Math.pow(y1,2));
}


function ang( x1, y1, x2, y2 )
{
  var rad = Math.atan2(y1-y2,x1-x2);
  var tmp = -1 * rad * 180 / Math.PI;
  if ( tmp < 0 ) { tmp += 360 };
  return tmp;
}


function direction( angl )
{
  if (angl<=45) { return "E"; }
  if (angl>=315) { return "E"; }
  if ((angl>=45)&&(angl<=135)) { return "N"; }
  if ((angl>=135)&&(angl<=215)) { return "W"; }
  if ((angl>=215)&&(angl<=315)) { return "S"; }
}


function isToday( dt )
{
  var today = new Date().toStartOfDay();
  if (dt.getTime() < today.getTime())
  {
    return false;
  }
  today.setDate(today.getDate() + 1);
  return dt.getTime() < today.getTime();
}


function isGreaterThanToday( dt )
{
  var td = new Date().toStartOfDay();
  td.setDate(td.getDate()+1);
  return ( dt.getTime() >= td.getTime() );
}


function colorObjFromAssignableByDate( assignable, dt )
{
  var todate = new Date().toStartOfDay();

  if ( dt.getTime() < todate.getTime() )
  {
    var uiState = "enabled";
  }

  if ( dt.getTime() == todate.getTime() )
  {
    var uiState = "highlighted";
  }

  if ( dt.getTime() > todate.getTime() )
  {
    var uiState = "disabled";
  }

  return colorObjFromAssignable( assignable, uiState );
}


function colorObjFromAssignable( assignable, uiState )
{
  var colors = {

    external : {

      enabled : {
        backgroundColor : "#00A69C",
        color : "#FFFFFF",
        border : "1px solid #49d6cf"
      },

      disabled : {
        backgroundColor : "#00A69C",
        color : "#80d3CE",
        border : "1px solid #49d6cf"
      },

      highlighted : {
        backgroundColor : "#2EB6AE",
        color : "#FFFFFF",
        border : "1px solid #49d6cf"
      }

    },

    internal : {

      enabled : {
        backgroundColor : "#8BC53F",
        color : "#FFFFFF",
        border : "1px solid #c0e780"
      },

      disabled : {
        backgroundColor : "#8BC53F",
        color : "#C5E29F",
        border : "1px solid #c0e780"
      },

      highlighted : {
        backgroundColor : "#A0CF62",
        color : "#FFFFFF",
        border : "1px solid #c0e780"
      }

    },

    leave : {

      enabled : {
        backgroundColor : "#D0D2D3",
        color : "#FFFFFF",
        border : "1px solid #F1F1F1"
      },

      disabled : {
        backgroundColor : "#D0D2D3",
        color : "#A0A0A0",
        border : "1px solid #F1F1F1"
      },

      highlighted : {
        backgroundColor : "#EFEFEF",
        color : "#FFFFFF",
        border : "1px solid #F1F1F1"
      }

    }

  };


  if ( !assignable.project_state )
  {
    return colors.leave[uiState];
  }


  if (( assignable.project_state ) && ( assignable.project_state.name == "Internal" ))
  {
    return colors.internal[uiState];
  }

  return colors.external[uiState];


}

// converts a decimal to and hours:minutes string
// null argument is equivalent to 0
// returns null for a non parseable arg
// returns null for value less than 0
// used by quickbooks export
function decimalToHourMinuteString( decimalHoursStr )
{
  decimalHoursStr = decimalHoursStr || "0";
  var decimalHours = parseFloat(decimalHoursStr);
  
  if ( isNaN(decimalHours) ) { return null; }
  if ( decimalHours < 0 ) { return null; }
  
  var hours = Math.floor(decimalHours);
  var minutes = Math.round((decimalHours - hours) * 60);

  if ( minutes == 60 )
  {
    minutes = 0;
    hours += 1;
  }
  
  hoursStr = (( hours < 10 ) ? "0" : "") + hours.toString();
  minutesStr = (( minutes < 10 ) ? "0" : "") + minutes.toString();
  
  return hoursStr + ":" + minutesStr;
}

// dynamically post
// used by quickbooks export
function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}


calculateProjectDuration = function(project)
{
  var start = Date.toStartOfDay(new Date(project.starts_at));
  var end = Date.toStartOfDay(new Date(project.ends_at));
  var total = 0;
  while (start.getTime() < end.getTime())
  {
    if (gData.workWeek.isWorkday(start, false))
      total++;
    start.setDate(start.getDate()+1);
  }
  return total;
}

iconForTag = function(tag)
{
  if (tag.namespace == "project state" && tag.name == "Tentative")
  {
    return "grayMark"
  }
  if (tag.namespace == "project state" && tag.name == "Confirmed")
  {
    return "blueMark"
  }
  if (tag.namespace == "project state" && tag.name == "Internal")
  {
    return "purpleMark"
  }    
}

var __escapeCsvQuoteRegEx = /\"/g,
    __escapeCsvQuote = "\"",
    __escapeCsvEscapedQuote = "\"\"";

escapeCsv = function(s) {
  var wrapInQuotes = false;
  if(s.indexOf(__escapeCsvQuote) >= 0) { 
    wrapInQuotes = true;
    s = s.replace(__escapeCsvQuoteRegEx, __escapeCsvEscapedQuote); 
  }
  wrapInQuotes = wrapInQuotes || s.indexOf(",") >= 0 || s.indexOf("\n") >= 0;
  if(wrapInQuotes) { s = __escapeCsvQuote + s + __escapeCsvQuote; }
  return s;
}

  removeDuplicateProjects = function(arr) 
  {
    var i;
    var len=arr.length;
    var out=[];
    var obj={};

    for (i=0;i<len;i++) 
    {
      obj[arr[i].id]=arr[i];
    }
    for (i in obj) 
    {
      out.push(obj[i]);
    }
    return out;
  }

