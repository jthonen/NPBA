import React, {Component} from "react";
import "./style.css";
import ZoOmFrame from "../VideoFrame"
import ZoOmFunctions from "./ZoomFunctions";

const appendLog = ZoOmFunctions.appendLog;
const captureZoomSession = ZoOmFunctions.captureZoomSession;
const onLivenessCheckComplete = ZoOmFunctions.onLivenessCheckComplete;

function timer(run, time) {
  return setTimeout(function() {
    run();
  }, time);
}

function captureAndSendZoomSession()  {
  captureZoomSession();
  timer(onLivenessCheckComplete, 15000);
};

class ZoOmAuthentication extends Component{


  zoomCall = () =>    {
        window.onload = function () {
          appendLog("window.onload fired.");
        };

        timer(captureAndSendZoomSession, 6000);      
    };

    componentDidMount() {
      this.zoomCall();
    };

    render()    {
        return  (
          <ZoOmFrame />
        )
    }
}

export default ZoOmAuthentication;