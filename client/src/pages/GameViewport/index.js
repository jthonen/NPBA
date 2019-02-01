import React, {Component} from "react";
import "./style.css";
import UsersHand from "../../components/UsersHand";
import API from "../../utils/API";

class GameViewport extends Component    {
    state = {
        UsersHandArray: []
    };

    loadHand = () =>  {
        API.loadHand()
        .then((res) => {
            return this.setState({UsersHandArray: res.data.nba_data});
        })
        .catch(err => console.log(err));
    };

    componentDidMount() {
        this.loadHand();
    };

    render()    {
        console.log(this.state)
        return (
            <div id="GameViewport">
                <UsersHand UsersHandArray={this.state.UsersHandArray} />
            </div>
        );
    };
};

export default GameViewport;