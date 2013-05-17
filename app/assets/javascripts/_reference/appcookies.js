
var CookieVersion = "16";

var AppCookie = {
  AuthToken: "auth_token",
  UserId: "user_id",
  UserTypeId: "user_type_id",
  UserLoginName: "email",
  UserDisplayName: "user_display_name",
  OrgDisplayName: "company_display_name",
  OrgGuid: "company_guid",
  MenuMask: "menu_mask",
  Locale: "locale",
  ProjectFilter: "ProjectsFilter",
  ProjectsView: "ProjectsView",
  ProjectsSort: "ProjectsSort",
  ProjectView: "ProjectView",
  SettingsFilter: "SettingsFilter",
  ReportFilter: "ReportFilter",
  ReportTitle: "ReportTitle",
  GridTimeUnit: "GridTimeUnit",
  GridFilterValue: "GridFilterValue",
  GridFilterLabel: "GridFilterLabel",
  AccountStatus: "AccountStatus",  // > 0 == account in trial, == 0 = account being billed, < 0 account subscription expired
  CookieVersion: "cookie_version",
  SettingsCookie: "combined_settings",
  SubscriptionEndsDate: "SubscriptionEndsDate"
}

function areCookiesPersisted() {
  var settings = xCookie.get(AppCookie.SettingsCookie);
  if (!settings) {
    return false;
  } else {
    var a = settings.split(";");
    __A(a.length == 8, "settings cookie format validation failed");
    return (a[6] == "1");
  }
}

function cookiesAreInvalid() {
  return getCookie(AppCookie.CookieVersion) != CookieVersion;
}

function getCookie(name) {
  if (name == AppCookie.Locale || name == AppCookie.MenuMask || name == AppCookie.AccountStatus
    || name == AppCookie.ProjectsView || name == AppCookie.ProjectView || name == AppCookie.SettingsFilter || name == AppCookie.SubscriptionEndsDate)
  {
    var currentval = xCookie.get(AppCookie.SettingsCookie);
    if (!currentval) return ""
    var vals = currentval.split(";");
    if (vals.length != 8) return "";
    if (name == AppCookie.Locale)
      return vals[0];
    else if (name == AppCookie.MenuMask)
      return vals[1];
    else if (name == AppCookie.AccountStatus)
      return vals[2];
    else if (name == AppCookie.ProjectsView)
      return vals[3];
    else if (name == AppCookie.SettingsFilter)
      return vals[4];
    else if (name == AppCookie.SubscriptionEndsDate)
      return vals[5];
    else if (name == AppCookie.ProjectView)
      return vals[7];
  } 
  else if (name == AppCookie.ReportTitle || name == AppCookie.UserDisplayName || name == AppCookie.OrgDisplayName
    || name == AppCookie.GridFilterValue || name == AppCookie.GridFilterLabel)
  {
    var val = xCookie.get(name);
    return val ? decodeURIComponent(val) : val;
  }
  else
    return xCookie.get(name);
}

function internalSetCookie(name, value, persist) {
  // TODO Do we need different expiry logic per cookie?
  if (name == AppCookie.Locale || name == AppCookie.MenuMask || name == AppCookie.AccountStatus
     || name == AppCookie.ProjectsView || name == AppCookie.ProjectsView || name == AppCookie.ProjectView || name == AppCookie.SettingsFilter)
  {
    var currentval = xCookie.get(AppCookie.SettingsCookie);
    if (!currentval) currentval = ";;;;;;"
    var vals = currentval.split(";");
    if (vals.length != 8) return;
    if (name == AppCookie.Locale)
      vals[0] = value;
    else if (name == AppCookie.MenuMask)
      vals[1] = value;
    else if (name == AppCookie.AccountStatus)
      vals[2] = value;
    else if (name == AppCookie.ProjectsView)
      vals[3] = value;    
    else if (name == AppCookie.SettingsFilter)
      vals[4] = value;    
    else if (name == AppCookie.ProjectView)
      vals[7] = value; 
    xCookie.set(AppCookie.SettingsCookie,
              vals[0] + ";" + vals[1] + ";" + vals[2] + ";" + vals[3] + ";" + vals[4] + ";" + vals[5] + ";" + vals[6] + ";" + vals[7],
              (persist ? 14 : null), // days
              "/",
              null/*domain*/,
              (window.location.protocol == "https:") /*secure*/);

  } 
  else if (name == AppCookie.ReportTitle || name == AppCookie.UserDisplayName || name == AppCookie.OrgDisplayName
    || name == AppCookie.GridFilterValue || name == AppCookie.GridFilterLabel)
  {
    xCookie.set(name,
              encodeURIComponent(value),
              (persist ? 14 : null), // days
              "/",
              null/*domain*/,
              (window.location.protocol == "https:") /*secure*/);

  }
  else
  {
    xCookie.set(name,
              value,
              (persist ? 14 : null), // days
              "/",
              null/*domain*/,
              (window.location.protocol == "https:") /*secure*/);
  }  
}

function setCookie(name, value) {
  internalSetCookie(name, value, areCookiesPersisted());
}

function setCookiesAfterSignIn(data, persist) {
  internalSetCookie(AppCookie.AuthToken, data.auth_token, persist);
  internalSetCookie(AppCookie.UserId, data.user_id, persist);
  internalSetCookie(AppCookie.UserTypeId, data.user_type_id, persist);
  internalSetCookie(AppCookie.UserDisplayName, data.display_name, persist);
  internalSetCookie(AppCookie.OrgDisplayName, data.organization_name, persist);
  internalSetCookie(AppCookie.OrgGuid, data.organization_guid, persist);
  internalSetCookie(AppCookie.ProjectFilter, "%5B%5B%22Active%20Projects%22%5D%2C%5B%5D%2C%5B%5D%5D", persist);
  internalSetCookie(AppCookie.ProjectsSort, '[{"label":"Project Name","sortAscending":true,"selected":true},{"label":"Client","sortAscending":true,"selected":false},{"label":"Project Type","sortAscending":true,"selected":false}]', persist);
  internalSetCookie(AppCookie.ReportFilter, "", persist);
  internalSetCookie(AppCookie.ReportTitle, "", persist);
  internalSetCookie(AppCookie.GridTimeUnit, "week", persist);
  internalSetCookie(AppCookie.GridFilterValue, "", persist);
  internalSetCookie(AppCookie.GridFilterLabel, "", persist);
  internalSetCookie(AppCookie.CookieVersion, CookieVersion, persist);
  var in_trial = "0"
  if (data.trialend)
  {
    in_trial = "1";
  }
  else
  {
    data.trialend = "";
  }

  internalSetCookie(AppCookie.SettingsCookie, data.locale + ";" + data.mask + ";" + in_trial + ";0;1;" + data.trialend + ";" + (persist ? "1" : "0") + ";0", persist);
}

function deleteCookie(name) {
  xCookie.del(name);
}

function deleteAllCookies(preserveUserLoginNameCookie) {
  if(!preserveUserLoginNameCookie) { xCookie.del(AppCookie.UserLoginName); }
  xCookie.del(AppCookie.AuthToken);
  xCookie.del(AppCookie.UserId);
  xCookie.del(AppCookie.UserTypeId);
  xCookie.del(AppCookie.UserDisplayName);
  xCookie.del(AppCookie.OrgDisplayName);
  xCookie.del(AppCookie.OrgGuid);
  xCookie.del(AppCookie.SettingsCookie);
  xCookie.del(AppCookie.ProjectFilter);
  xCookie.del(AppCookie.ProjectsSort);
  xCookie.del(AppCookie.ReportFilter);
  xCookie.del(AppCookie.ReportTitle);
  xCookie.del(AppCookie.GridTimeUnit);
  xCookie.del(AppCookie.GridFilterValue);
  xCookie.del(AppCookie.GridFilterLabel);
  xCookie.del(AppCookie.CookieVersion);
}

function deleteAllCookiesButLoginName() {
  deleteAllCookies(true);
}

function refreshAllCookies(onrefreshCallback) {
  gService.refreshSession(function(data) { 
    setCookiesAfterSignIn(data);
    onrefreshCallback && onrefreshCallback();
  })
}

function checkAndRefreshAllCookies(onrefreshCallback) {
  
  function _onrefreshSessionCallback(data) {
    function _updateCookiesOnUnload() {
      if(getCookie(AppCookie.AuthToken)) { // still signed in
        setCookiesAfterSignIn(data,areCookiesPersisted());        
      }
    }
    // wait to write new cookies until the unload event.
    xAddEventListener(window, 'unload', _updateCookiesOnUnload, false);
  }

  var trialOrExpiredAccount = getCookie(AppCookie.AccountStatus) != 0,
      lastRefresh = sessionStorage["__lastRefreshAt"],
      now = new Date().getTime(),
      authCookie = getCookie(AppCookie.AuthToken),
      refreshDelay = trialOrExpiredAccount ? 3600000 /*1hr*/ : 86400000 /*1day*/;
  if( authCookie && ( !lastRefresh || ( Number(lastRefresh) + refreshDelay < now )) ) {
    gService.refreshSession(_onrefreshSessionCallback);
    lastRefresh = sessionStorage["__lastRefreshAt"] = now;
  }
}





