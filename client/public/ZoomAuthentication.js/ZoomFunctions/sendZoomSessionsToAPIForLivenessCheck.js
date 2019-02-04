import appendLog from "./appendLog";
import doesZoomSDKObjectExist from "./doesZoomSDKObjectExist";
import lastSessionData from "../../index";

var licenseKey = "d7fb5IUijPxK6R4zVqFfq2fDYMlfLRVH";

function sendZoomSessionToAPIForLivenessCheck() {
    appendLog("Sending up session data...");
  
    if(!doesZoomSDKObjectExist()) {
      appendLog("Precondition failed: ZoomAuthentication.js must be loaded prior to using ZoomSDK functionality.");
      return;
    }
  
    if(!lastSessionData) {
      appendLog("Precondition failed: No session data to send. You must capture session first");
      return;
    }
  
    appendLog("Calling ZoOm REST API with ZoOm Session Data...");
    var dataToUpload = new FormData();
    dataToUpload.append("sessionId", lastSessionId);
    dataToUpload.append("zoomSessionData", lastSessionData);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var result = this.responseText;
        console.log("ZoOm REST API Response: " + result);
      }
    });
  
    xhr.open("POST", "https://api.zoomauth.com/api/v1/biometrics/liveness");
    xhr.setRequestHeader("X-App-Token", licenseKey);
    xhr.setRequestHeader("X-User-Agent", ZoomSDK.createZoomAPIUserAgentString(lastSessionId));
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        appendLog("Liveness Result from ZoOm REST API: " + JSON.parse(this.responseText).data.livenessResult);
      }
    };
    xhr.send(dataToUpload);
};

export default sendZoomSessionToAPIForLivenessCheck;