import React, { Component } from "react";
import "./style.css";
import ZoOmFrame from "../../components/VideoFrame";
import API from "../../utils/API";

const licenseKey = "d7fb5IUijPxK6R4zVqFfq2fDYMlfLRVH";
var videoTrack;
let task = (sessionStorage.task === undefined) ? "undefined" : sessionStorage.task;
let enrollmentId = (sessionStorage.user === undefined) ? 
console.log("not stored") : (task === "undefined") ? 
console.log("not stored")  :(task === "authenticate") ? 
sessionStorage.user.split('"')[1] : sessionStorage.user.split('"')[0];

function appendLog(message) {
  console.log(message)
};

function initCameraAndVideoLoop(constraintIndexToTry) {
  var acceptableConstraints = [
    { audio: false, video: { width: { exact: 640 }, height: { exact: 360 }, facingMode: "user" } },
    { audio: false, video: { width: { exact: 1280 }, height: { exact: 720 }, facingMode: "user" } },
    { audio: false, video: { width: { exact: 1920 }, height: { exact: 1080 }, facingMode: "user" } },
    { audio: false, video: { width: { exact: 640 }, height: { exact: 480 }, facingMode: "user" } }
  ];

  navigator.mediaDevices.getUserMedia(acceptableConstraints[constraintIndexToTry]).then(function (stream) {
    document.getElementById("zoom-parent-container").classList.remove("display-none");
    var videoElement = document.getElementById("zoom-video-element");
    appendLog("Camera/Video initialized successfully.");
    videoTrack = stream.getVideoTracks()[0];
    videoElement.srcObject = stream;

    videoElement.addEventListener("loadeddata", function () {
      // zoom-parent-container MUST be styled to the SAME ASPECT RATIO as the camera or you will get undefined/unsupported behavior.
      // Note 1 - In this example, we read the height that is defined from CSS, then set the width according to the aspect ratio of the track we received (the camera stream).
      // Note 2 - We also make sure to not set the width to a float value to avoid sub-pixel rendering, which negatively impacts performance and can cause off-by-one UI issues.
      // Note 3 - We choose the "loadeddata" listener and reading the videoHeight and videoWidth from the actual <video> element as the most cross-browser compatible method of getting the true height and width (aspect ratio) chosen.  There are other methods like MediaStreamTrack.getSettings() that do not rely on an event listener but do not work across all browsers.
      var aspectRatioOfSelectedCameraStream = videoElement.videoHeight / videoElement.videoWidth;
      document.getElementById("zoom-parent-container").style.width = Math.round((parseInt(window.getComputedStyle(document.getElementById("zoom-parent-container")).height)) / aspectRatioOfSelectedCameraStream) + "px";
    });
  }, function (error) {
    if (constraintIndexToTry < acceptableConstraints.length - 1) {
      appendLog("getUserMedia response: could not get stream for contstraint: " + constraintIndexToTry + ". Trying next constraint.\n<" + error.message + ">");
      initCameraAndVideoLoop(constraintIndexToTry + 1);
    }
    else {
      appendLog("Camera selection did not complete: exhausted all attempts to getUserMedia from acceptable constraints list.  Latest getUserMedia response: " + error.message);
    }
  });
}

function isCameraAndVideoElementSetupAndReady() {
  return (videoTrack &&
    videoTrack.enabled === true &&
    videoTrack.readyState === "live" &&
    document.getElementById("zoom-video-element") &&
    document.getElementById("zoom-video-element").readyState === 4
  ) ? true : false;
};

function doesZoomWrapperElementExist() {
  return (document.getElementById("zoom-parent-container")) ? true : false;
}

// Demonstrate getting camera permissions, iterating over camera constraints to select a good camera.  Developer responsibility is to get desired camera and set the ZoOm Video element srcObject to the stream of that camera.
function setupCameraAndVideoElement() {
  appendLog("Setting up camera and video element...");

  if (isCameraAndVideoElementSetupAndReady()) {
    appendLog("Precondition failed: Camera and/or video element are already set up.");
    return;
  }

  if (!doesZoomWrapperElementExist()) {
    appendLog("Precondition failed: Required elements do not exist in the dom.");
    return;
  }
};

function isArray(val) {
  var toString = ({}).toString;
  return toString.call(val) === "[object Array]";
}

function isObject(val) {
  return !isArray(val) && typeof val === "object" && !!val;
}

// convert object to formData
function convert(jsonObject, parentKey, carryFormData) {
  var formData;
  if (carryFormData) {
    formData = carryFormData;
  } else {
    formData = new FormData();
  }
  var index = 0;
  for (var key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
      if (jsonObject[key] !== null && jsonObject[key] !== undefined) {
        var propName = parentKey || key;
        if (parentKey && isObject(jsonObject)) {
          propName = parentKey + "[" + key + "]";
        }
        if (parentKey && isArray(jsonObject)) {
          propName = parentKey + "[" + index + "]";
        }
        if (jsonObject[key] instanceof Blob) {
          formData.append(propName, jsonObject[key]);
        } else if (jsonObject[key] instanceof File) {
          formData.append(propName, jsonObject[key]);
        } else if (jsonObject[key] instanceof FileList) {
          for (var j = 0; j < jsonObject[key].length; j++) {
            formData.append(propName + "[" + j + "]", jsonObject[key].item(j));
          }
        } else if (isArray(jsonObject[key]) || isObject(jsonObject[key])) {
          convert(jsonObject[key], propName, formData);
        } else if (typeof jsonObject[key] === "boolean") {
          formData.append(propName, +jsonObject[key] ? "1" : "0");
        } else {
          formData.append(propName, jsonObject[key]);
        }
      }
    }
    index++;
  }
  return formData;
}

function sendUserAccessKey(username, results, zoomResult) {
  API.postSessionKey(username, zoomResult.sessionId);
  console.log("Passed Authentication");
  sessionStorage.ZoOmResults = JSON.stringify(results);
  sessionStorage.sessionKey = zoomResult.sessionId;
  setTimeout(function () {
    window.location.replace("/Home");
  }, 2000);
};

function denyUserAccess() {
  console.log("Failed Authentication");
  setTimeout(function () {
    window.location.replace("/");
  }, 3000)
};

function onZoomSessionComplete(zoomResult) {
  console.log(zoomResult);
  if (zoomResult.status !== window.ZoomSDK.ZoomTypes.ZoomCaptureResult.SessionCompleted || !zoomResult.sessionData) {
    appendLog("ZoOm returned but Session was not successful. zoomResult.status: " + zoomResult.status);
    return;
  }

  appendLog("Calling ZoOm REST API with ZoOm Session Data...");

  var dataToUpload = new FormData();
  dataToUpload.append("sessionId", zoomResult.sessionId);
  dataToUpload.append("zoomSessionData", zoomResult.sessionData);


  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://api.zoomauth.com/api/v1/biometrics/" + task);
  xhr.setRequestHeader("X-App-Token", licenseKey);
  xhr.setRequestHeader("X-User-Agent", window.ZoomSDK.createZoomAPIUserAgentString(zoomResult.sessionId));

  switch (task) {
    case "authenticate":
      console.log("authenticate")
      var parameters = {};
      parameters.source = { enrollmentIdentifier: enrollmentId };
      parameters.targets = [{ zoomSessionData: zoomResult.sessionData }];
      parameters.sessionId = zoomResult.sessionId;
      parameters.performContinuousLearning = "true";
      dataToUpload = convert(parameters);
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          let response = JSON.parse(this.response);
          let results = response.data.results[0];
          (results.authenticated === true) ? sendUserAccessKey(enrollmentId, results, zoomResult) : denyUserAccess();
        };
      };
      xhr.send(dataToUpload);
      return;
    case "enrollment":
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          let response = JSON.parse(this.response);
          sendUserAccessKey(enrollmentId, response, zoomResult);
        };
      };
      break;
    default:
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          appendLog("Liveness Result from ZoOm REST API: " + JSON.parse(this.responseText).data.livenessResult);
        }
      };
      break;
  }
}

class ZoOmAuthentication extends Component {

  handleClick() {
    appendLog("Preparing ZoOm interface...");

    window.ZoomSDK.prepareInterface("zoom-interface-container", "zoom-video-element", function (prepareInterfaceResult) {
      if (prepareInterfaceResult !== window.ZoomSDK.ZoomTypes.ZoomPrepareInterfaceResult.Success) {
        appendLog("prepareInterface was not successful. prepareInterfaceResult: " + prepareInterfaceResult);
        return;
      }

      appendLog("Starting ZoOm Capture...");
      var zoomSession = new window.ZoomSDK.ZoomSession(onZoomSessionComplete, videoTrack);
      zoomSession.capture();
    });
  };

  componentDidMount() {

    setupCameraAndVideoElement();

    window.onload = function () {
      appendLog("window.onload fired.");
      var zoomBrowserSupport = window.ZoomSDK.getBrowserSupport();
      if (!zoomBrowserSupport.supported) {
        appendLog("Stopping early. Browser not supported. Please see documentation or contact us for more details."); return;
      }

      appendLog("Initializing camera, video, camera, initializing ZoOm license check, and preloading ZoOm resources in parallel...");
      window.ZoomSDK.preload(function (preloadResult) {
        appendLog("preloadResult: " + preloadResult); // check preloadResult to get granular reason
      });

      window.ZoomSDK.initialize(licenseKey, function (initializationSuccessful) {
        appendLog("ZoOm initialize success:  " + initializationSuccessful); // check ZoomSDK.getStatus() to get granular reason
      });

      // See CameraHelpers.js for an example of how to handle and/or modify how you get/set the camera stream
      initCameraAndVideoLoop(0);
    };

  };

  render() {
    return (
      <div id="ZoomPage">
        <ZoOmFrame />
        <button id="beginZoomSession" onClick={() => {
          return this.handleClick();
        }}> Begin ZoOm Session </button>
        <div id="poweredBy">
          <h1> Powered by ZoOm </h1>
        </div>
      </div>
    );
  };
};

export default ZoOmAuthentication;