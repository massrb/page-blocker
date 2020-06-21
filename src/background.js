import "@babel/polyfill";

chrome.runtime.onMessage.addListener(
 function(request, sender, sendResponse) {
    console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
    if(request.closeThis) chrome.tabs.remove(sender.tab.id);
    if (request.greeting == "hello")
        sendResponse({farewell: "goodbye"});
});

/*
let AppInitState = 0; // it means app is off on startup

class Main {
  constructor() {}
  popUpClickSetup() {
    console.log('in popup setup');
    chrome.browserAction.onClicked.addListener(tab => {
      if (this.toggleApp()) {
      } else {
        this.stopApp();
      }
    });
  }

  toggleApp = () => {
    AppInitState = AppInitState ? 0 : 1;
    return AppInitState;
  };

  stopApp = () => {
    AppInitState = 0;
  };
}

*/