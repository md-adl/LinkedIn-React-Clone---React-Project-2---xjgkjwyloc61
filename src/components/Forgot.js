import React, { useState } from "react";
import logo from "../images/logo.png";
import "../styles/App.css";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
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

  const login = async () => {
    try {
      console.log(reqOptions);
      let response = await axios.request(reqOptions);
      if (response.status === 200) {
        console.log(response);
        // dispatch({ type: "SET_NAME", payload: response.data.name });
        // dispatch({ type: "SET_TOKEN", payload: response.data.token });
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("userName", response.data.name);
        await navigate("/signin");
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      console.log(error);
      alert(error.response?.statusText + " Please Try agin later");
    }
  };

  const handleLogin = () => {
    const bodyContent = JSON.stringify({
      name: userName,
      email: email,
      passwordCurrent: CurrPassword,
      password: newPassword,
      appType: "linkedIn",
    });

    reqOptions.data = bodyContent;

    login();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleUserNameChange = (event) => {
    SetUserName(event.target.value);
  };

  const handleCurrentPasswordChange = (event) => {
    SetCurrPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setnewPassword(event.target.value);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box display="flex" justifyContent="center">
        <img src={logo} className="linkedInLogo" />
      </Box>

      <Box className="signUpBox">
        <Typography variant="h4" fontSize="34px" my="10px" fontWeight="600">
          Update password?
        </Typography>
        <Typography variant="h4" fontSize="13px" mb="10px">
          Stay updated on your professional world
        </Typography>
        <FormLabel sx={{ mb: "5px" }}>Enter Name</FormLabel>
        <OutlinedInput
          id="outlined-adornment-weight"
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
          value={userName}
          onChange={handleUserNameChange}
        />
        <FormLabel sx={{ mt: "20px", mb: "5px" }}>Enter Email</FormLabel>
        <OutlinedInput
          id="outlined-adornment-weight"
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
          value={email}
          onChange={handleEmailChange}
        />
        <FormLabel sx={{ mt: "20px", mb: "5px" }}>Enter Password</FormLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          value={CurrPassword}
          onChange={handleCurrentPasswordChange}
        />
        <FormLabel sx={{ mt: "20px", mb: "5px" }}>Confirm Password</FormLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <Button
          onClick={handleLogin}
          variant="contained"
          sx={{ borderRadius: "30px", mt: "20px", height: "50px" }}>
          Reset Password
        </Button>
        <Typography variant="h4" textAlign="center" fontSize="17px" mt="20px">
          <Link to="/signin" style={{ textDecoration: "none" }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </div>
  );
}

export default Forgot;
