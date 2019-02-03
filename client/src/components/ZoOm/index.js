import React, {Component} from "react";
import "./style.css";

class FaceTek extends Component {

    success = (res) => {
        let tracks = res.getVideoTracks();
        console.log(res);
        console.log(tracks);
        res.addTrack(tracks[0]);
        this.initCameraAndVideoLoop()
    };

    failure = (res) =>  {
        return console.log(res.code)
    }

    initCameraAndVideoLoop(constraintIndexToTry) {

        var acceptableConstraints = [
            { audio: false, video: { width: { exact: 640 }, height: { exact: 360 }, facingMode: "user" } },
            { audio: false, video: { width: { exact: 1280 }, height: { exact: 720 }, facingMode: "user" } },
            { audio: false, video: { width: { exact: 1920 }, height: { exact: 1080 }, facingMode: "user" } },
            { audio: false, video: { width: { exact: 640 }, height: { exact: 480 }, facingMode: "user" } }
            ];
    
        navigator.mediaDevices.getUserMedia(acceptableConstraints[constraintIndexToTry]).then(function (stream) {
        document.getElementById("zoom-parent-container").classList.remove("display-none");

            var videoElement = document.getElementById("zoom-video-element");
            console.log("Camera/Video initialized successfully.");
            // videoTrack = stream.getVideoTracks()[0];
                
            videoElement.srcObject = stream;
        
            videoElement.addEventListener("loadeddata", function () {
            // zoom-parent-container MUST be styled to the SAME ASPECT RATIO as the camera or you will get undefined/unsupported behavior.
            // Note 1 - In this example, we read the height that is defined from CSS, then set the width according to the aspect ratio of the track we received (the camera stream).
            // Note 2 - We also make sure to not set the width to a float value to avoid sub-pixel rendering, which negatively impacts performance and can cause off-by-one UI issues.
            // Note 3 - We choose the "loadeddata" listener and reading the videoHeight and videoWidth from the actual <video> element as the most cross-browser compatible method of getting the true height and width (aspect ratio) chosen.  There are other methods like MediaStreamTrack.getSettings() that do not rely on an event listener but do not work across all browsers.
            var aspectRatioOfSelectedCameraStream = videoElement.videoHeight / videoElement.videoWidth;
            document.getElementById("zoom-parent-container").style.width = Math.round((parseInt(window.getComputedStyle(document.getElementById("zoom-parent-container")).height)) / aspectRatioOfSelectedCameraStream) + "px";
            });
        },

        function (error) {
            if (constraintIndexToTry < acceptableConstraints.length - 1) {
                console.log("getUserMedia response: could not get stream for contstraint: " + constraintIndexToTry + ". Trying next constraint.<" + error.message + ">");
                this.initCameraAndVideoLoop(constraintIndexToTry + 1);
            }
            else {
                console.log("Camera selection did not complete: exhausted all attempts to getUserMedia from acceptable constraints list.  Latest getUserMedia response: " + error.message);
            }
        });
    }


        // More notes on getUserMedia and camera compat
        // A near-term future release of ZoOm will include camera code to solve these known getUserMedia edge cases:
        // 1.  Certain devices (very small amount of low/mid-tier Android devices) will sometimes not fire loaddeddata listener.  For those devices, we have found that the browser is capable of getUserMedia but due to a bug in the hardware, it is not allowed to get a camera stream until the browser is force closed and relaunched.  A future version of ZoOm will provide an example of detecting this so developers have an example of handling this.
        // 2.  Certain devices (very small amount of low/mid-tier Android devices) do not select a camera with the acceptableConstraints we list here.  In the future, we will provide code to handle the selection logic for these devices.
        // 3.  Certain devices (very small amount of low/mid-tier Android devices) have a device-wide behavior that requires user to click the video element in order to play the camera stream.  A future version of ZoOm will show the code that works around this issue by detecting this and programmatically pressing the video element on behalf of the user.
    render()    {
        return(
            <div>
                <div>
                    <ul className="slideshow">
                        <li></li><li></li><li></li><li></li><li></li>
                        <li></li><li></li><li></li><li></li><li></li>
                        <li></li><li></li><li></li><li></li><li></li>
                        <li></li><li></li><li></li><li></li><li></li>
                        <li></li><li></li><li></li><li></li><li></li>
                    </ul>

                    <div id="zoom-parent-container">
                        <div id="zoom-interface-container"></div>
                        <video autoPlay playsInline id="zoom-video-element"></video>
                        <script>
                            {window.navigator.getUserMedia({
                                video: {
                                    mandatory: {
                                        minWidth: 1280,
                                        minHeight: 720,
                                        minFrameRate: 30
                                        },
                                    optional: [
                                        { minFrameRate: 60 }
                                    ]
                                },
                                audio: true
                            }, this.success, this.failure)}
                         </script>
                    </div>
                </div>
            </div>
        );
    };
};

export default FaceTek;
