import React, {Component} from "react";

function DivA() {
    return (
        <div id="divA">
        </div>
    );
};

function DivB() {
    return (
        <div id="divB">
        </div>
    );
};

class MainViewport extends Component {
    state = {
        currentPhase: "phaseA",
        user: "not found"
    };

    render()    {
        return (
            (this.state.currentPhase === "phaseA") ? <DivA /> : <DivB />
        );
    };
};

export default MainViewport;