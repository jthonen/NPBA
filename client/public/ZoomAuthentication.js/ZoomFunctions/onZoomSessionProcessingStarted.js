import appendLog from "./appendLog";

function onZoomSessionProcessingStarted(captureStatus) {
    appendLog("ZoOm Session processing started.  captureStatus: " + captureStatus);
};

export default onZoomSessionProcessingStarted;