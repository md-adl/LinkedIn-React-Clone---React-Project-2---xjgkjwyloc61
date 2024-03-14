import React from "react";
import notification from "../../images/Notificationimg.jpg";

function Notification() {
  return (
    <img
      src={notification}
      alt="message"
      style={{
        width: "100%",
        height: "470px",
      }}
    />
  );
}

export default Notification;
