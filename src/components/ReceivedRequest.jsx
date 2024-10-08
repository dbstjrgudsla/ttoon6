import React from "react";
import { ReactComponent as NoFriendAsked } from "../img/NoFriendAsked.svg";
import "../styles/Friend.css";

const ReceivedRequest = () => {
  return (
    <div className="FriendListWrapper">
      <NoFriendAsked />
    </div>
  );
};

export default ReceivedRequest;
