import React, {Component} from "react";
import "./style.css";
import AccountNotFound from "../../components/AccountNotFound";
import MainProfilePanel from "../../components/MainProfilePanel";
import GameViewport from "../GameViewport";
import API from "../../utils/API";

class MainViewport extends Component {
    state = {
        currentPhase: {phase: "phaseA", user: "not found"},
        user: {},
        failureMessage: String,
        optionClicked: String
    };

    handlePlayClick = (event) => {
        return this.setState({optionClicked: event.target.id});
    }

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
        console.log(this.state.user);
        return (
            <div id="MainViewport">
                {
                    (this.state.currentPhase.phase === "phaseA") ?
                        <AccountNotFound/> :
                        <MainProfilePanel 
                            username={this.state.user.userName}
                            handlePlayClick={this.handlePlayClick}
                        />
                }
                {/* {
                    (this.state.optionClicked === "Play") ? <GameViewport /> : <div id="hidden"> </div>
                } */}
            </div>
        );
    };
};

export default MainViewport;