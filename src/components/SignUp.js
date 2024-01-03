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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const projectId = "f104bi07c490";

  let headersList = {
    projectId: projectId,
    "Content-Type": "application/json",
  };

  let reqOptions = {
    url: "https://academics.newtonschool.co/api/v1/user/signup",
    method: "POST",
    headers: headersList,
  };

  const login = async () => {
    try {
      let response = await axios.request(reqOptions);
      console.log(response);
      if (response.status === 201) {
        console.log(response);
        alert("SuccessFully SignedUp");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      console.error(error, errMsg);
      if (errMsg === "User already exists") {
        alert("User already exist");
        navigate("/signin");
      } else if (errMsg === "Invalid input data. A user must have a name") {
        alert("Invalid input data. A user must have a name");
      } else if (
        errMsg === "Invalid input data. Please provide a valid email"
      ) {
        alert("Invalid input data. Please provide a valid email");
      } else {
        console.log("error");
      }
    }
  };
  const handleSubmit = () => {
    const bodyContent = JSON.stringify({
      name: userName,
      email: email,
      password: password,
      appType: "linkedin",
    });

    reqOptions.data = bodyContent;

    if (password.length < 8) {
      alert("Password should contain more than 8 characters.");
    } else {
      login();
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box display="flex" justifyContent="center">
        <img
          src={logo}
          className="linkedInLogo2"
          onClick={() => navigate("/")}
        />
      </Box>
      <Typography variant="h4" textAlign="center" fontSize="32px" mt="20px">
        Make the most of your professional life
      </Typography>
      <Box className="signUpBox">
        <FormLabel sx={{ mb: "5px" }}>Enter Name</FormLabel>
        <OutlinedInput
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
          value={userName}
          onChange={handleNameChange}
        />
        <FormLabel sx={{ mt: "20px", mb: "5px" }}>Enter Email</FormLabel>
        <OutlinedInput
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
          value={password}
          onChange={handlePasswordChange}
        />
        <Typography
          variant="h6"
          textAlign="center"
          width="400px"
          fontSize="11px"
          mt="20px">
          By clicking Agree & Join, you agree to the LinkedIn User Agreement,{" "}
          <a
            target="_blank"
            href="https://www.linkedin.com/legal/privacy-policy?trk=registration-frontend_join-form-privacy-policy">
            Privacy Policy
          </a>
          , and{" "}
          <a
            target="_blank"
            href="https://www.linkedin.com/legal/cookie-policy?trk=registration-frontend_join-form-cookie-policy">
            Cookie Policy
          </a>
          .
        </Typography>
        <Button
          variant="contained"
          sx={{ borderRadius: "30px", mt: "20px", height: "50px" }}
          onClick={handleSubmit}>
          Agree & Join
        </Button>
        <Typography variant="h4" textAlign="center" fontSize="17px" mt="20px">
          Already on LinkedIn?{" "}
          <Link to="/signin" style={{ textDecoration: "none" }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </div>
  );
}

export default SignUp;
