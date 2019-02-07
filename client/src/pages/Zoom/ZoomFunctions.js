import API from "../../utils/API";

var licenseKey = "d7fb5IUijPxK6R4zVqFfq2fDYMlfLRVH";
var videoTrack;
var lastSessionData;
var lastSessionId;
var latestZoomSession;

function appendLog(message)    {
    console.log(message)
};

function doesZoomSDKObjectExist() {
    if(window.ZoomSDK) {
      return true;
    }
    else {
      return false;
    }
};

function loadZoomAuthenticationJS() {
    appendLog("Loading ZoomAuthentication.js...");
  
    if(doesZoomSDKObjectExist()) {
      appendLog("Precondition failed: ZoomAuthentication.js is already loaded.");
      return;
    }
  
    // ZoomAuthentication.js creates the core ZoomSDK object on window.exports.  This property must exist prior to loading ZoomAuthentication.js.
    window.exports = {};
  
    // Programmatically add ZoomAuthentication.js.  This is just one example of a valid loading style for ZoomAuthentication.js.
    var scriptTag = document.createElement("script");
    scriptTag.src = "./ZoomAuthentication.js/ZoomAuthentication.js";
    // Give this script an id so we can demonstrate unloading of this script later
    scriptTag.id = "zoomsdk-script";
    scriptTag.onload = function () { appendLog("ZoomAuthentication.js JS loaded successfully."); };
    scriptTag.onreadystatechange = function () { appendLog("ZoomAuthentication.js readystatechange."); };
    scriptTag.async = true;
    document.body.appendChild(scriptTag);
};


// Demonstrate ZoomSDK.preload() API, which takes care of loading the ZoOm Engine resources
function preloadZoom() {
    appendLog("Preloading core ZoOm resources...");
  
    if(!doesZoomSDKObjectExist()) {
      appendLog("Precondition failed: ZoomAuthentication.js must be loaded prior to using ZoomSDK functionality.");
      return;
    }
    
    window.ZoomSDK.preload(function(preloadResult){
      appendLog("preloadResult: " + preloadResult);
    });
};

// Demonstrate ZoomSDK.initialize() API, which takes care of validation of your license.
function initializeOnlineWithLicense() {
    appendLog("Calling ZoomSDK.initialize to perform online license validation...");
  
    if(!doesZoomSDKObjectExist()) {
      appendLog("Precondition failed: ZoomAuthentication.js must be loaded prior to calling initialize.");
      return;
    }
  
    window.ZoomSDK.initialize(licenseKey, function (initializationSuccessful) {
      appendLog("ZoomSDK.initialize() success: " + initializationSuccessful + ". Current status: " + window.ZoomSDK.getStatus());
    });
}

// Demonstrate ZoomSDK.getBrowserSupport(), which checks the user's browser for basic capabilities like getUserMedia, Web Workers, and Web Assembly.
function checkBrowserSupport() {
    appendLog("Checking to see if your browser supports ZoOm...");
  
    if(!doesZoomSDKObjectExist()) {
      appendLog("Precondition failed: ZoomAuthentication.js must be loaded prior to using ZoomSDK functionality to check compatibility.");
      return;
    }
  
    appendLog("Browser Supported: " + window.ZoomSDK.getBrowserSupport().supported);
};

// Developer is responsible for getting the camera track via WebRTC getUserMedia
// NOTE: There are some known edge cases for some devices with hardware/WebRTC implementation bugs that are not handled here in order to prefer code clarity in this sample.  These cases are handled in the Complete Sample camera instantiation code.
// NOTE 2: Also for code clarity, this function manipulates the DOM and uses functions/vars in other files.  You should modify this code to fit your application architecture and calling conventions.
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
  // More notes on getUserMedia and camera compat
  // A near-term future release of ZoOm will include camera code to solve these known getUserMedia edge cases:
  // 1.  Certain devices (very small amount of low/mid-tier Android devices) will sometimes not fire loaddeddata listener.  For those devices, we have found that the browser is capable of getUserMedia but due to a bug in the hardware, it is not allowed to get a camera stream until the browser is force closed and relaunched.  A future version of ZoOm will provide an example of detecting this so developers have an example of handling this.
  // 2.  Certain devices (very small amount of low/mid-tier Android devices) do not select a camera with the acceptableConstraints we list here.  In the future, we will provide code to handle the selection logic for these devices.
  // 3.  Certain devices (very small amount of low/mid-tier Android devices) have a device-wide behavior that requires user to click the video element in order to play the camera stream.  A future version of ZoOm will show the code that works around this issue by detecting this and programmatically pressing the video element on behalf of the user.

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

function doesZoomWrapperElementExist() {
    if(document.getElementById("zoom-parent-container")) {
      return true;
    }
    else {
      return false;
    }
}

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

function prepareInterface() {
    appendLog("Preparing interface...");
  
    if(!doesZoomSDKObjectExist()) {
      appendLog("Precondition failed: ZoomAuthentication.js must be loaded prior to using ZoomSDK functionality.");
      return;
    }
  
    window.ZoomSDK.prepareInterface("zoom-interface-container", "zoom-video-element", function(prepareInterfaceResult) {
      appendLog(prepareInterfaceResult);
    });
};

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

function onZoomSessionProcessingStarted(captureStatus) {
    appendLog("ZoOm Session processing started.  captureStatus: " + captureStatus);
}

function captureZoomSession() {
    appendLog("Starting ZoOm Session Capture...");
  
    if(!doesZoomSDKObjectExist()) {
      appendLog("Precondition failed: ZoomAuthentication.js must be loaded prior to using ZoomSDK functionality.");
      return;
    }
    
    let ZoomSDK = window.ZoomSDK;
    
    latestZoomSession = new ZoomSDK.ZoomSession(onZoomSessionComplete, videoTrack);
    // optional function to receive back the capture status at earliest possible moment to do fancy ui transitions and update user with progress
    // this affects slower machines/devices where ZoOm spends extra time at the end of the session creating the Facemap payload
    latestZoomSession.setOnZoomSessionProcessingStarted(onZoomSessionProcessingStarted);
    latestZoomSession.capture();
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

    // var targets = [{zoomSessionData:lastSessionData}];
    // var user = "yousef";
    // let enrollmentIdentifier = {enrollmentIdentifier:user.trim()};

    // var parameters = {};
    // parameters.source = enrollmentIdentifier;
    // parameters.targets = targets;
    // parameters.sessionId = lastSessionId;

    // console.log(parameters);

    // var dataToUpload = convert(parameters);

    // // var dataToUpload = convert({}, ["source", "targets", "sessionId"], {source, targets, "sessionId": lastSessionId})
    
    // dataToUpload.get("source");

    // var xhr = new XMLHttpRequest();
    // // xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function () {
    // if (this.readyState === 4) {
    //     var result = this.responseText;
    //     console.log("ZoOm REST API Response: " + result);
    // }
    // });

    // xhr.open("POST", "https://api.zoomauth.com/api/v1/biometrics/authenticate");
    // xhr.setRequestHeader("X-App-Token", licenseKey);
    // xhr.setRequestHeader("X-User-Agent", window.ZoomSDK.createZoomAPIUserAgentString(lastSessionId));
    // //xhr.setRequestHeader("Content-Type", "application/json");

    // xhr.onreadystatechange = function () {
    // if (this.readyState === 4) {
    //     appendLog("Result from ZoOm REST API: " + this.responseText);
    // }
    // };

    // xhr.send(dataToUpload);
};

function onComplete() {    
  appendLog("Calling ZoOm REST API with ZoOm Session Data...");
  var dataToUpload = new FormData();
  dataToUpload.append("sessionId", lastSessionId);
  var xhr = new XMLHttpRequest();
  var endpoint = "https://api.zoomauth.com/api/v1/biometrics/authenticate";
  var parameters = {};
  parameters.source = {enrollmentIdentifier: "Yousef"};
  parameters.targets = [{zoomSessionData: lastSessionData}];
  parameters.sessionId = lastSessionId;
  parameters.performContinuousLearning = "true";
  console.log(parameters);
  dataToUpload = convert(parameters);
  console.log(dataToUpload)

  xhr.open("POST", endpoint);
  xhr.setRequestHeader("X-App-Token", licenseKey);
  xhr.setRequestHeader("X-User-Agent", window.ZoomSDK.createZoomAPIUserAgentString(lastSessionId));
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
          appendLog("Result from ZoOm REST API: " + this.responseText);
      }
  }
  xhr.upload.onprogress = function name(event) {
    var progress = Math.round((event.loaded / event.total) * 100);
    console.log(progress);
  };
  xhr.send(dataToUpload);
};

export default {
    appendLog,
    loadZoomAuthenticationJS,
    preloadZoom,
    initializeOnlineWithLicense,
    checkBrowserSupport,
    setupCameraAndVideoElement, 
    prepareInterface,
    captureZoomSession,
    onComplete
};