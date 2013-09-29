// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.cookies.onChanged.addListener(function(info) {
  console.log("onChanged" + JSON.stringify(info));
});

function focusOrCreateTab(url) {
  chrome.windows.getAll({"populate":true}, function(windows) {
    var existing_tab = null;
    for (var i in windows) {
      var tabs = windows[i].tabs;
      for (var j in tabs) {
        var tab = tabs[j];
        if (tab.url == url) {
          existing_tab = tab;
          break;
        }
      }
    }
    if (existing_tab) {
      //chrome.tabs.update(existing_tab.id, {"selected":true});
	  chrome.tabs.remove(existing_tab.id);
    }
    chrome.tabs.create({"url":url, "selected":false});
  });
}

function closeTab(url){
	chrome.windows.getAll({"populate":true}, function(windows) {
		for (var i in windows) {
		  var tabs = windows[i].tabs;
		  for (var j in tabs) {
			var tab = tabs[j];
			if (tab.url.indexOf(url)>-1) {
			  chrome.tabs.remove(tab.id);
			}
		  }
		}
	});
}

chrome.tabs.onCreated.addListener(function(tab) {
  var manager_url = chrome.extension.getURL("manager.html");
  //focusOrCreateTab(manager_url);
  /*setInterval(function(){
    onload(function(){
		removeCookiesForDomain(".wz123.com");
		removeCookiesForDomain("wz123.com");
		focusOrCreateTab("http://www.wz123.com/?sum");
		
	});
  },15000);*/

});

(function(){
	
	chrome.browserAction.onClicked.addListener(function(tab) {
		setInterval(function(){
			var flag = Math.random();
			if(flag<0.5){
				resetCookie();
			}
			else{
				var url = "http://www.wz123.com/?sum";
				clearCookies({url:url});
			}
			focusOrCreateTab("http://www.wz123.com/?sum");
		},5000);
	});
})();

function resetCookie(){
	var text = '[{     "domain": ".wz123.com",     "expirationDate": 1411559871,     "hostOnly": false,     "httpOnly": false,     "name": "city",     "path": "/",     "secure": false,     "session": false,     "storeId": "0",     "value": "%E5%8C%97%E4%BA%AC" }, {     "domain": "www.wz123.com",     "expirationDate": 1380039388,     "hostOnly": true,     "httpOnly": false,     "name": "AJSTAT_ok_pages",     "path": "/",     "secure": false,     "session": false,     "storeId": "0",     "value": "1" }, {     "domain": "www.wz123.com",     "expirationDate": 1411575388,     "hostOnly": true,     "httpOnly": false,     "name": "AJSTAT_ok_times",     "path": "/",     "secure": false,     "session": false,     "storeId": "0",     "value": "7" }, {     "domain": "www.wz123.com",     "expirationDate": 1395760588,     "hostOnly": true,     "httpOnly": false,     "name": "CNZZDATA2865216",     "path": "/",     "secure": false,     "session": false,     "storeId": "0",     "value": "cnzz_eid%3D1935231329-1379943294-http%253A%252F%252Fwww.wz123.com%26ntime%3D1380035785%26cnzz_a%3D13%26retime%3D1380035788684%26sin%3D%26ltime%3D1380035788684%26rtime%3D1" }, {     "domain": ".wz123.com",     "expirationDate": 1443107788,     "hostOnly": false,     "httpOnly": false,     "name": "__utma",     "path": "/",     "secure": false,     "session": false,     "storeId": "0",     "value": "84421087.1392300800.1380023872.1380023872.1380035789.12" }, {     "domain": ".wz123.com",     "expirationDate": 1380037588,     "hostOnly": false,     "httpOnly": false,     "name": "__utmb",     "path": "/",     "secure": false,     "session": false,     "storeId": "0",     "value": "84421087.2.9.1380035789" }, {     "domain": ".wz123.com",     "hostOnly": false,     "httpOnly": false,     "name": "__utmc",     "path": "/",     "secure": false,     "session": true,     "storeId": "0",     "value": "84421087" }, {     "domain": ".wz123.com",     "expirationDate": 1395803788,     "hostOnly": false,     "httpOnly": false,     "name": "__utmz",     "path": "/",     "secure": false,     "session": false,     "storeId": "0",     "value": "84421087.1380023872.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)" }]';
	try {
		var cookieArray = $.parseJSON(text);
		if(Object.prototype.toString.apply(cookieArray) === "[object Object]")
			cookieArray = [cookieArray];
		for(var i=0; i<cookieArray.length; i++) {
			try {
				var cJSON = cookieArray[i];
				var cookie = cookieForCreationFromFullCookie(cJSON);
				if(cookie.name=="__utma"){
					var segs = cookie.value.split('.');
					segs[1] = parseInt(Math.random()* 1000000000);
					cookie.value= segs.join('.');
				}
				chrome.cookies.set(cookie);
			} catch(e) {
				console.error(e.message);
				return;
			}
		}
	} catch(e) {
		console.error(e.message);
	}
}

function clearCookies(filters) {
	if(filters == null)
		filters = {};
	
	var filterURL = {}
	if(filters.url != undefined)
		filterURL.url = filters.url;
	if(filters.domain != undefined)
		filterURL.domain = filters.domain;
		
	chrome.cookies.getAll(filterURL, function(cks) {
		for(var i=0; i<cks.length; i++) {
			var currentC = cks[i];
			
			if(filters.name != undefined && currentC.name.toLowerCase().indexOf(filters.name.toLowerCase()) == -1)
				continue;
			if(filters.domain != undefined && currentC.domain.toLowerCase().indexOf(filters.domain.toLowerCase()) == -1)
				continue;
			if(filters.secure != undefined && currentC.secure.toLowerCase().indexOf(filters.secure.toLowerCase()) == -1)
				continue;
			if(filters.session != undefined && currentC.session.toLowerCase().indexOf(filters.session.toLowerCase()) == -1)
				continue;
			chrome.cookies.remove({
				'url':filterURL.url || "http://www.wz123.com/?sum",
				'name':currentC.name,
				'storeId':currentC.storeId
			});
		}
	});
}

