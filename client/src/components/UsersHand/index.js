import React, {Component} from "react";
import "./style.css";
import PlayerCard from "../PlayerCard";

class UsersHand extends Component   {
    state = { 
    };

    render()    {
        return  (
            <div className="UsersHand">
                {
                    this.props.UsersHandArray.map((PlayerCardInHand) =>   {
                        return  (
                            <PlayerCard
                                key={PlayerCardInHand.id}
                                PlayerCardInHand={PlayerCardInHand}
                                UsersHand={this}
                            />
                        )
                    })
                }
            </div>
        );
    }
}
export default UsersHand;