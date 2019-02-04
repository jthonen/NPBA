import React from "react";
import "./style.css";

function ZoomFrame()    {
    return (
        <div id="zoom-old-placeholder">
            <div id="zoom-parent-container">
                <div id="zoom-interface-container"></div>
                <video id="zoom-video-element" playsInline autoPlay></video>
            </div>
        </div>
    );
};

export default ZoomFrame;