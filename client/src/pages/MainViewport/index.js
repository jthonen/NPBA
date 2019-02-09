import React, {Component} from "react";
import API from "../../utils/API";

function DivA() {
    return (
        <div id="divA">
            <h1> "User account not found. We apologize for the inconvenience." </h1>
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
        currentPhase: {phase: "phaseA", user: "not found"},
        user: {},
        failureMessage: String
    };

    activateHome(data)  {
        this.setState({currentPhase: {phase: "phaseB", user: "found"}});
        this.setState({user: data});
    };

    componentDidMount() {
        let keyInSessionStorage = sessionStorage.sessionKey;
        let usernameInSessionStorage = sessionStorage.user.split('"')[1];
        API.getSessionKey(usernameInSessionStorage, keyInSessionStorage).then((results) =>   {
            (Array.isArray(results.data)) ? this.activateHome(results.data[0]): console.log(results.data);
        });
    };

    render()    {
        return (
            (this.state.currentPhase.phase === "phaseA") ? <DivA message={this.state.failureMessage}/> : <DivB />
        );
    };
};

export default MainViewport;