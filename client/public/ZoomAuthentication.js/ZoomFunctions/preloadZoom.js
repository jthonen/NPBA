import appendLog from "./appendLog";
import doesZoomSDKObjectExist from "./doesZoomSDKObjectExist";

// Demonstrate ZoomSDK.preload() API, which takes care of loading the ZoOm Engine resources
function preloadZoom() {
    appendLog("Preloading core ZoOm resources...");
  
    if(!doesZoomSDKObjectExist()) {
      appendLog("Precondition failed: ZoomAuthentication.js must be loaded prior to using ZoomSDK functionality.");
      return;
    }
    
    ZoomSDK.preload(function(preloadResult){
      appendLog("preloadResult: " + preloadResult);
    });
}

export default preloadZoom;