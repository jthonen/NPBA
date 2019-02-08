import React, {Component} from "react";
import "./style.css";
import ZoOmFrame from "../../components/VideoFrame";
import ZoOmFunctions from "./ZoomFunctions";

const appendLog = ZoOmFunctions.appendLog;
const loadZoomAuthenticationJS = ZoOmFunctions.loadZoomAuthenticationJS;
const preloadZoom = ZoOmFunctions.preloadZoom;
const initializeOnlineWithLicense = ZoOmFunctions.initializeOnlineWithLicense;
const checkBrowserSupport = ZoOmFunctions.checkBrowserSupport;
const setupCameraAndVideoElement = ZoOmFunctions.setupCameraAndVideoElement;
const prepareInterface = ZoOmFunctions.prepareInterface;
const captureZoomSession = ZoOmFunctions.captureZoomSession;
const onLivenessCheckComplete = ZoOmFunctions.onLivenessCheckComplete;
const sendZoomSessionToAPIForEnrollment = ZoOmFunctions.sendZoomSessionToAPIForEnrollment;

function timer(run, time) {
  return setTimeout(function() {
    run();
  }, time);
};

function ZoOm1()  {
  loadZoomAuthenticationJS();
  timer(preloadZoom, 2500);
  timer(initializeOnlineWithLicense, 4000);
  timer(checkBrowserSupport, 4100);
  timer(setupCameraAndVideoElement, 4500);
  timer(prepareInterface, 6000);
};

function ZoOm2() {
  let username = sessionStorage.user;
  let sourceUsername = username.split('"');
  console.log(sourceUsername[1])
  captureZoomSession();
  setTimeout(function() {
    onLivenessCheckComplete(sourceUsername[1]);
  }, 15000);
};

function ZoOm3() {
  let username = sessionStorage.user;
  let sourceUsername = username.split('"');
  captureZoomSession();
  setTimeout(function() {
    sendZoomSessionToAPIForEnrollment(sourceUsername[0]);
  }, 15000);
};

function determineAuthenticateOrEnroll()  {
  let task = sessionStorage.task;
  return (task === "authentication") ? ZoOm2() : ZoOm3();   
};

class ZoOmAuthentication extends Component  {

  componentDidMount() {
      window.onload = function () {
        appendLog("window.onload fired.");
      };
      ZoOm1();
      setTimeout(function() {
        determineAuthenticateOrEnroll();
      }, 8500);
    };

    render()    {
        return  (
          <ZoOmFrame />
        );
    };
};

export default ZoOmAuthentication;