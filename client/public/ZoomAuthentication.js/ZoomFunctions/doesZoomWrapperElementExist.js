// used as precondition check for the existance of zoom required elements in dom
// examples:  setupCameraAndVideoElement
function doesZoomWrapperElementExist() {
    if(document.getElementById("zoom-parent-container")) {
      return true;
    }
    else {
      return false;
    }
}

export default doesZoomWrapperElementExist;