import videoTrack from "./initCameraAndVideoLoop";

// examples:  preload, creating ZoOm Sessions, capturing ZoOm Sessions
function isCameraAndVideoElementSetupAndReady() {
    if(videoTrack &&
        videoTrack.enabled === true &&
        videoTrack.readyState === "live" &&
        document.getElementById("zoom-video-element") &&
        document.getElementById("zoom-video-element").readyState === 4
    )
    {
      return true;
    }
    else {
      return false;
    }
};

export default isCameraAndVideoElementSetupAndReady;