import appendLog from "./appendLog";
import isCameraAndVideoElementSetupAndReady from "./isCameraAndVideoElementSetupAndReady";
import doesZoomWrapperElementExist from "./doesZoomWrapperElementExist";
import initCameraAndVideoLoop from "./initCameraAndVideoLoop";

// Demonstrate getting camera permissions, iterating over camera constraints to select a good camera.  Developer responsibility is to get desired camera and set the ZoOm Video element srcObject to the stream of that camera.
function setupCameraAndVideoElement() {
    appendLog("Setting up camera and video element...");
  
    if(isCameraAndVideoElementSetupAndReady()) {
      appendLog("Precondition failed: Camera and/or video element are already set up.");
      return;
    }
  
    if (!doesZoomWrapperElementExist()) {
      appendLog("Precondition failed: Required elements do not exist in the dom.");
      return;
    }
  
    // See CameraHelpers.js for an example of how to handle and/or modify how you get/set the camera stream
    initCameraAndVideoLoop(0);
};

export default setupCameraAndVideoElement;