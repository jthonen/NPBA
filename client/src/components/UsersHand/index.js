import React from "react";
import "./style.css";
import PlayerCard from "../PlayerCard";

function UsersHand(props) {
    return  (
        <div className="UsersHand">
            {
                props.UsersHandArray.map((PlayerCardInHand) =>   {
                    return  (
                        <PlayerCard key={PlayerCardInHand.id} PlayerCardInHand={PlayerCardInHand} />
                    )
                })
            }
        </div>
    );
};

export default UsersHand;