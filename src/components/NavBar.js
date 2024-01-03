import React, { useEffect, useRef, useState } from "react";
import logo2 from "../images/logo2.jpg";
import {
  Avatar,
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useStateProvider } from "../utils/StateProvider";
import GroupsIcon from "@mui/icons-material/Groups";
import SensorsIcon from "@mui/icons-material/Sensors";

const NavBar = () => {
  const [{}, dispatch] = useStateProvider();
  const [alignment, setAlignment] = useState("web");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 980);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [{ posts, userName }] = useStateProvider();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
    }
  };

  const handleWindowResize = () => {
    setIsSmallScreen(window.innerWidth <= 765);
    if (window.innerWidth <= 765) {
      setSearchInputVisible(false);
    }
  };

  useEffect(() => {
    // Add an event listener to handle window resize
    window.addEventListener("resize", handleWindowResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleLongInput = () => {
    setSearchInputVisible(true);
  };
  const handlesmallInput = () => {
    setSearchInputVisible(false);
    console.log("heyyy");
  };

  const handleChangeKey = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const updatedPost1 = posts.filter((post) =>
      post.channel.name.toLowerCase().includes(searchValue),
    );
    const updatedPost2 = posts.filter((post) =>
      post.author.name.toLowerCase().includes(searchValue),
    );
    const result = updatedPost1.concat(updatedPost2);
    console.log(updatedPost1);
    console.log(updatedPost2);
    console.log(result);
    dispatch({ type: "SET_SEARCH", payload: result });
    navigate("/search");
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userName");
    navigate("/signin");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      sx={{ background: "#ffffff", pb: searchInputVisible && "10px" }}>
      {searchInputVisible ? (
        <>
          <Box display="flex" mt="3px" width="98%">
            <img
              src={logo2}
              className="linkedInLogo"
              onClick={() => navigate("/")}
            />
            <ArrowBackIcon
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                ml: "10px",
                mr: "4px",
                width: "30px",
                cursor: "pointer",
                borderRadius: "15px",
                "&:hover": { background: "#eeeeee" },
              }}
              onClick={handlesmallInput}
            />
            <TextField
              onKeyDown={handleEnterKey}
              onChange={handleChangeKey}
              value={search}
              variant="outlined"
              fullWidth
              placeholder="Search..."
              sx={{
                height: "45px",
                mt: "5px",
                ml: "5px",
                background: "#edf3f8",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </>
      ) : (
        <>
          <Box display="flex" mt="3px" width="28%">
            <img
              src={logo2}
              className="linkedInLogo"
              onClick={() => navigate("/")}
            />
            {!isSmallScreen ? (
              <TextField
                onKeyDown={handleEnterKey}
                onChange={handleChangeKey}
                value={search}
                variant="outlined"
                fullWidth
                placeholder="Search..."
                sx={{
                  height: "45px",
                  mt: "0px",
                  ml: "5px",
                  pb: "9px",
                  background: "#edf3f8",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <SearchIcon
                onClick={handleLongInput}
                sx={{
                  width: "40px",
                  height: "40px",
                  ml: "10px",
                  mt: "5px",
                  cursor: "pointer",
                  borderRadius: "25px",
                  "&:hover": { background: "#e4e3e2" },
                  "@media(max-width:460px)": {
                    width: "30px",
                    height: "30px",
                  },
                }}
              />
            )}
          </Box>
          <Stack spacing={2} alignItems="center">
            <ToggleButtonGroup
              color="primary"
              value="home"
              exclusive
              onChange={handleChange}
              sx={{ gap: "10px", "@media(max-width:766px)": { gap: "0px" } }}
              aria-label="Platform">
              <ToggleButton
                onClick={() => navigate("/")}
                value="home"
                display="flex"
                sx={{ flexDirection: "column", border: "none" }}>
                <HomeIcon />
                {isSmallScreen ? null : (
                  <Typography
                    variant="h2"
                    fontSize="13px"
                    sx={{ textTransform: "none" }}>
                    Home
                  </Typography>
                )}
              </ToggleButton>
              <ToggleButton
                onClick={() => navigate("/group")}
                value="job"
                display="flex"
                sx={{ flexDirection: "column", border: "none" }}>
                <GroupsIcon />
                {isSmallScreen ? null : (
                  <Typography
                    variant="h2"
                    sx={{ textTransform: "none" }}
                    fontSize="13px">
                    Group
                  </Typography>
                )}
              </ToggleButton>
              <ToggleButton
                onClick={() => navigate("/network")}
                value="network"
                display="flex"
                sx={{ flexDirection: "column", border: "none" }}>
                <SensorsIcon />
                {isSmallScreen ? null : (
                  <Typography
                    variant="h2"
                    fontSize="13px"
                    sx={{ textTransform: "none" }}>
                    Jobs
                  </Typography>
                )}
              </ToggleButton>

              <ToggleButton
                onClick={() => navigate("/message")}
                value="messaging"
                display="flex"
                sx={{ flexDirection: "column", border: "none" }}>
                <MessageIcon />
                {isSmallScreen ? null : (
                  <Typography
                    variant="h2"
                    sx={{ textTransform: "none" }}
                    fontSize="13px">
                    Messaging
                  </Typography>
                )}
              </ToggleButton>
              <ToggleButton
                onClick={() => navigate("/notification")}
                value="notification"
                display="flex"
                sx={{
                  flexDirection: "column",
                  border: "none",
                  "@media(max-width:460px)": { display: "none" },
                }}>
                <NotificationsIcon />
                {isSmallScreen ? null : (
                  <Typography
                    variant="h2"
                    sx={{ textTransform: "none" }}
                    fontSize="13px">
                    Notification
                  </Typography>
                )}
              </ToggleButton>
              <ToggleButton
                aria-describedby={id}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  border: "none",
                }}
                variant="contained"
                onClick={handleClick}>
                <Avatar sx={{ width: "25px", height: "25px" }}>
                  {userName ? userName[0] : ""}
                </Avatar>
                {isSmallScreen ? null : (
                  <Typography
                    variant="h3"
                    sx={{ textTransform: "none" }}
                    fontSize="15px">
                    {localStorage.getItem("userName")}
                  </Typography>
                )}
              </ToggleButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}>
                <MenuItem
                  sx={{ gap: "5px" }}
                  onClick={() => {
                    navigate("/");
                    handleClose();
                  }}>
                  <Avatar sx={{ width: "25px", height: "25px" }}>
                    {userName ? userName[0] : ""}
                  </Avatar>{" "}
                  {localStorage.getItem("userName")}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/user");
                    handleClose();
                  }}>
                  View Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/premium");
                    handleClose();
                  }}>
                  Try Premium for free
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                {/* <MenuItem onClick={() => navigate("/forgot")}>
                  Update Password?
                </MenuItem> */}
              </Popover>
            </ToggleButtonGroup>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default NavBar;
