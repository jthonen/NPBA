function doesZoomSDKObjectExist() {
    if(window.ZoomSDK) {
      return true;
    }
    else {
      return false;
    }
};

export default doesZoomSDKObjectExist;