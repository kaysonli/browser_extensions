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

chrome.browserAction.onClicked.addListener(function(tab) {
	setInterval(function(){
		clearCookies({url:"http://adf.ly"});
		focusOrCreateTab("http://adf.ly/Vj1dG");
	},8000);
});

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