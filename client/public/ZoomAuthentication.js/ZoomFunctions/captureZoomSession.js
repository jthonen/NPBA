import appendLog from "./appendLog"
import doesZoomSDKObjectExist from "./doesZoomSDKObjectExist";
import onZoomSessionComplete from "./onZoomSessionComplete";
import onZoomSessionProcessingStarted from "./onZoomSessionProcessingStarted";
var latestZoomSession;

function captureZoomSession() {
    appendLog("Starting ZoOm Session Capture...");
  
    if(!doesZoomSDKObjectExist()) {
      appendLog("Precondition failed: ZoomAuthentication.js must be loaded prior to using ZoomSDK functionality.");
      return;
    }
  
    latestZoomSession = new ZoomSDK.ZoomSession(onZoomSessionComplete, videoTrack);
    // optional function to receive back the capture status at earliest possible moment to do fancy ui transitions and update user with progress
    // this affects slower machines/devices where ZoOm spends extra time at the end of the session creating the Facemap payload
    latestZoomSession.setOnZoomSessionProcessingStarted(onZoomSessionProcessingStarted);
    latestZoomSession.capture();
};

export default captureZoomSession;