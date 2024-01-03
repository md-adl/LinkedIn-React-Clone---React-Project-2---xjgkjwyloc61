import React from "react";
import message from "../images/message.png";

function Message() {
  return (
    <img
      src={message}
      alt="message"
      style={{
        width: "100%",
        height: "470px",
      }}
    />
  );
}

export default Message;
