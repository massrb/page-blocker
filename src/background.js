import "@babel/polyfill";


function getBlockedSites() {
  let site_list_str = localStorage.getItem("blocked_sites") || '[]';
  let site_list = JSON.parse(site_list_str);
  return site_list;
}

function saveBlockedSites(sites) {
  localStorage.setItem("blocked_sites", JSON.stringify(sites));
}

function siteIsBlocked(site) {
  let site_list = getBlockedSites();
  return site_list.includes(site);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
    "from a content script:" + sender.tab.url :
    "from the extension");
    if(request.closeThis) chrome.tabs.remove(sender.tab.id);
    else if(request.checkSite) {
      let result = siteIsBlocked(request.checkSite);
      console.log('check blocked ' + request.checkSite + ' = ', 
        result)
      sendResponse({blocked: result})
    } 
    else if(request.blockSite) {
      let site_list = getBlockedSites();
      site_list.push(request.blockSite);
      saveBlockedSites(site_list);
    }
});

