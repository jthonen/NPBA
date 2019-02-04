import doesZoomSDKObjectExist from "./doesZoomSDKObjectExist";
import appendLog from "./appendLog";


function loadZoomAuthenticationJS() {
    appendLog("Loading ZoomAuthentication.js...");
  
    if(doesZoomSDKObjectExist()) {
      appendLog("Precondition failed: ZoomAuthentication.js is already loaded.");
      return;
    }
  
    // ZoomAuthentication.js creates the core ZoomSDK object on window.exports.  This property must exist prior to loading ZoomAuthentication.js.
    window.exports = {};
  
    // Programmatically add ZoomAuthentication.js.  This is just one example of a valid loading style for ZoomAuthentication.js.
    var scriptTag = document.createElement("script");
    scriptTag.src = "../ZoomAuthentication.js/ZoomAuthentication.js";
    // Give this script an id so we can demonstrate unloading of this script later
    scriptTag.id = "zoomsdk-script";
    scriptTag.onload = function () { appendLog("ZoomAuthentication.js JS loaded successfully."); };
    scriptTag.onreadystatechange = function () { appendLog("ZoomAuthentication.js readystatechange."); };
    document.body.appendChild(scriptTag);
}

export default loadZoomAuthenticationJS;