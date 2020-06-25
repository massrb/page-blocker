
export default class SiteTracker {

  static blockSite(site) {
    chrome.runtime.sendMessage({blockSite: site}, 
      function(response) {
        console.log('site blocked with chrome runtime', site);
      });
  }

  static isBlocked(site) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({checkSite: site}, 
        function(response) 
          {
            resolve(response.blocked);
          });
    })
  }

}
