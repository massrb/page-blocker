import "@babel/polyfill";


chrome.extension.getBackgroundPage().console.log('background.js foo');
console.log('background.js ljg');


chrome.runtime.onMessage.addListener(
 function(request, sender, sendResponse) {
    console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
    if (request.greeting == "hello")
        sendResponse({farewell: "goodbye"});
});


let AppInitState = 0; // it means app is off on startup

/**
 * Main extension functionality
 *
 * @class Main
 */
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

  /**
   * toggle app
   *
   * @method
   * @memberof Main
   */
  toggleApp = () => {
    AppInitState = AppInitState ? 0 : 1;
    return AppInitState;
  };

  /**
   * stop app
   *
   * @method
   * @memberof Main
   */
  stopApp = () => {
    AppInitState = 0;
  };
}
