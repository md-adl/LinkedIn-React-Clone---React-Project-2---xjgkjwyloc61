import React from "react";
import message from "../../images/message.jpg";

function Message() {
  return (
    <img
      src={message}
      alt="message"
      style={{
        width: "100%",
        height: "470px",
        padding:"20px"
      }}
    />
  );
}

export default Message;
