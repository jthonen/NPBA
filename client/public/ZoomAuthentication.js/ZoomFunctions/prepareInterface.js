import appendLog from "./appendLog";
import doesZoomSDKObjectExist from "./doesZoomSDKObjectExist";

function prepareInterface() {
    appendLog("Preparing interface...");
  
    if(!doesZoomSDKObjectExist()) {
      appendLog("Precondition failed: ZoomAuthentication.js must be loaded prior to using ZoomSDK functionality.");
      return;
    }
  
    ZoomSDK.prepareInterface("zoom-interface-container", "zoom-video-element", function(prepareInterfaceResult) {
      appendLog(prepareInterfaceResult);
    });
};

export default prepareInterface;