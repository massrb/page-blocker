
export default class SiteTracker {

  static blockSite(site) {
    chrome.runtime.sendMessage({blockSite: site}, function(response) {
      console.log('site blocked', site);
    });
//    let site_list_str = localStorage.getItem("blocked_sites") || '[]';
//    let site_list = JSON.parse(site_list_str);
//    return site_list;
  }

  static isBlocked(site) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({checkSite: site}, function(response) 
        {
          console.log('check', site);
          console.log('content script blocked = ' + response.blocked);
          resolve(response.blocked);
        });
    })
  }
//    let sites = this.get_blocked_sites();
//    return sites.includes(site);

}
