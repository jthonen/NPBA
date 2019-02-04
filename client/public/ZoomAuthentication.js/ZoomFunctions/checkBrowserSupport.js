import appendLog from "./appendLog";
import doesZoomSDKObjectExist from "./doesZoomSDKObjectExist";

// Demonstrate ZoomSDK.getBrowserSupport(), which checks the user's browser for basic capabilities like getUserMedia, Web Workers, and Web Assembly.
function checkBrowserSupport() {
    appendLog("Checking to see if your browser supports ZoOm...");
  
    if(!doesZoomSDKObjectExist()) {
      appendLog("Precondition failed: ZoomAuthentication.js must be loaded prior to using ZoomSDK functionality to check compatibility.");
      return;
    }
  
    appendLog("Browser Supported: " + ZoomSDK.getBrowserSupport().supported);
};

export default checkBrowserSupport;