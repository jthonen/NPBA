import appendLog from "./appendLog";
import doesZoomSDKObjectExist from "./doesZoomSDKObjectExist";
var licenseKey = "d7fb5IUijPxK6R4zVqFfq2fDYMlfLRVH";

// Demonstrate ZoomSDK.initialize() API, which takes care of validation of your license.
function initializeOnlineWithLicense() {
    appendLog("Calling ZoomSDK.initialize to perform online license validation...");
  
    if(!doesZoomSDKObjectExist()) {
      appendLog("Precondition failed: ZoomAuthentication.js must be loaded prior to calling initialize.");
      return;
    }
  
    ZoomSDK.initialize(licenseKey, function (initializationSuccessful) {
      appendLog("ZoomSDK.initialize() success: " + initializationSuccessful + ". Current status: " + ZoomSDK.getStatus());
    });
}

export default initializeOnlineWithLicense;