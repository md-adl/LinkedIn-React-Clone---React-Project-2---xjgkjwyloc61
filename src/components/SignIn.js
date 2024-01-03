import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import "../styles/App.css";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [{ token }, dispatch] = useStateProvider();
  const [email, setEmail] = useState("aju6697@gmail.com");
  const [password, setPassword] = useState("11111111");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const projectId = "f104bi07c490";

  useEffect(() => {
    var jwt = localStorage.getItem("jwtToken");
    var userN = localStorage.getItem("userName");
    console.log(jwt);
    if (localStorage.getItem("jwtToken")) {
      console.log("kgkjgh");
      dispatch({ type: "SET_NAME", userN });
      dispatch({ type: "SET_TOKEN", jwt });
      // navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log(token);
  }, [token]);

  let headersList = {
    projectId: projectId,
    "Content-Type": "application/json",
  };

  let reqOptions = {
    url: "https://academics.newtonschool.co/api/v1/user/login",
    method: "POST",
    headers: headersList,
  };

  const login = async () => {
    try {
      let response = await axios.request(reqOptions);
      console.log(response);
      if (response.status === 200) {
        dispatch({ type: "SET_NAME", payload: response.data.data.name });
        dispatch({ type: "SET_TOKEN", payload: response.data.token });
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("userName", response.data.data.name);
        console.log(response.data.token);
        await navigate("/");
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      console.error(error, errMsg);
      if (errMsg === "Incorrect EmailId or Password") {
        alert("Incorrect EmailId or Password");
      }
    }
  };

  const handleLogin = () => {
    const bodyContent = JSON.stringify({
      email: email,
      password: password,
      appType: "linkedin",
    });

    reqOptions.data = bodyContent;

    login();
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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

      <Box className="signUpBox">
        <Typography variant="h4" fontSize="34px" my="10px" fontWeight="600">
          Sign in
        </Typography>
        <Typography variant="h4" fontSize="17px" mb="10px">
          Stay updated on your professional world
        </Typography>
        <OutlinedInput
          aria-describedby="outlined-weight-helper-text"
          placeholder="Email"
          sx={{ mt: "10px" }}
          value={email}
          onChange={handleEmailChange}
        />

        <OutlinedInput
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
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          placeholder="password"
          sx={{ mt: "10px" }}></OutlinedInput>
        <Link
          to="/forgot"
          style={{ textDecoration: "none", marginTop: "15px" }}>
          <Typography variant="h4" fontSize="17px">
            Update password
          </Typography>
        </Link>

        <Button
          onClick={handleLogin}
          variant="contained"
          sx={{ borderRadius: "30px", mt: "20px", height: "50px" }}>
          Sign In
        </Button>
      </Box>
      <Typography variant="h4" textAlign="center" fontSize="17px" mt="20px">
        New to LinkedIn?
        <Link to="/signup" style={{ textDecoration: "none" }}>
          Join now
        </Link>
      </Typography>
    </div>
  );
}

export default SignIn;
