import React, { useState } from "react";
import logo from "../images/logo.png";
import "../styles/App.css";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

function Forgot() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, SetUserName] = useState("");
  const [CurrPassword, SetCurrPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const projectId = "f104bi07c490";

  let headersList = {
    projectId: projectId,
    "Content-Type": "application/json",
  };

  let reqOptions = {
    url: "https://academics.newtonschool.co/api/v1/user/updateMyPassword",
    method: "PATCH",
    headers: headersList,
  };

  
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      
      Hii Forgot Password 
      
    </div>
  );
}

export default Forgot;
