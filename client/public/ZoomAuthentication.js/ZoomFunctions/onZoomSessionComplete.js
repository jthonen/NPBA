import appendLog from "./appendLog";

var lastSessionData;
var lastSessionId;

function onZoomSessionComplete(zoomResult) {
    appendLog("onZoomSessionComplete status: " + zoomResult.status);
  
    // handle capture results
    if(!zoomResult.sessionData) {
      // handle no captured session here
      return;
    }
  
    lastSessionId = zoomResult.sessionId;
    lastSessionData = zoomResult.sessionData;
    // get the session
    var sessionData = zoomResult.sessionData;
    return sessionData;
};

export default onZoomSessionComplete;