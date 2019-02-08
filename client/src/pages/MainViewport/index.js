import React, {Component} from "react";
import API from "../../utils/API";

function authorizeAccess()  {
    let keyInSessionStorage = sessionStorage.sessionKey;
    let usernameInSessionStorage = sessionStorage.user.split('"')[1];
    API.getSessionKey(usernameInSessionStorage, keyInSessionStorage).then((results) =>   {
        console.log(results.data[0]);
    });
};

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
        currentPhase: {phase: "phaseA", user: "not found"}
    };

    render()    {
        authorizeAccess();
        return (
            (this.state.currentPhase.phase === "phaseA") ? <DivA /> : <DivB />
        );
    };
};

export default MainViewport;