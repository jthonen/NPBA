import React, {Component} from "react";
import "./style.css";
import ZoomFrame from "../../components/VideoFrame"
import ZoOmFunctions from "./ZoomFunctions";

const appendLog = ZoOmFunctions.appendLog;
const loadZoomAuthenticationJS = ZoOmFunctions.loadZoomAuthenticationJS;
const preloadZoom = ZoOmFunctions.preloadZoom;
const initializeOnlineWithLicense = ZoOmFunctions.initializeOnlineWithLicense;
const checkBrowserSupport = ZoOmFunctions.checkBrowserSupport;
const setupCameraAndVideoElement = ZoOmFunctions.setupCameraAndVideoElement;
const prepareInterface = ZoOmFunctions.prepareInterface;
const captureZoomSession = ZoOmFunctions.captureZoomSession;
const sendZoomSessionToAPIForLivenessCheck = ZoOmFunctions.sendZoomSessionToAPIForLivenessCheck;

function timer(run, time) {
  return setTimeout(function() {
    run();
  }, time);
}

function captureAndSendZoomSession()  {
  captureZoomSession();
  timer(sendZoomSessionToAPIForLivenessCheck, 15000);
};

class ZoOM extends Component{

  zoomCall = () =>    {
        window.onload = function () {
          appendLog("window.onload fired.");
        };
        loadZoomAuthenticationJS();
        timer(preloadZoom, 1000);
        timer(initializeOnlineWithLicense, 2000);
        timer(checkBrowserSupport, 3000);
        timer(setupCameraAndVideoElement, 4000);
        timer(prepareInterface, 5000)
        timer(captureAndSendZoomSession, 6000);      
    };

    componentDidMount() {
      this.zoomCall();
    };

    render()    {
        return  (
          <ZoomFrame />
        )
    }
}

export default ZoOM;