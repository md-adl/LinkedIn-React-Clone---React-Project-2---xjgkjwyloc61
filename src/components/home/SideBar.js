import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateProvider } from "../../utils/StateProvider";

const SideBar = () => {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column">
      <Box
        width="225px"
        alignItems="center"
        display="flex"
        flexDirection="column"
        borderRadius="10px"
        position="sticky"
        top="20px"
        sx={{
          background: "white",
          height: "max-content",
          "@media (max-width: 644px)": {
            width: "94%",
            alignSelf: "center",
            position: "unset",
          },
        }}>
        <Avatar
          onClick={() => navigate("/user")}
          sx={{
            width: "72px",
            height: "72px",
            mt: "20px",
            background: "#0a66c2",
            cursor: "pointer",
          }}>
          {userName ? userName[0] : ""}
        </Avatar>

        <Typography
          onClick={() => navigate("/user")}
          variant="h4"
          fontSize="20px"
          mt="15px"
          sx={{ cursor: "pointer" }}>
          {userName}
        </Typography>
        <hr style={{ width: "100%" }} />
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          color="gray"
          margin="10px">
          <Typography variant="h4" fontSize="13px" ml="10px">
            Profile Viewers
          </Typography>
          <Typography variant="h4" fontSize="13px" color="blue" mr="10px">
            129
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          color="gray"
          margin="10px">
          <Typography variant="h4" fontSize="13px" ml="10px">
            Post Impressions
          </Typography>
          <Typography variant="h4" fontSize="13px" color="blue" mr="10px">
            6746
          </Typography>
        </Box>
        <hr style={{ width: "100%" }} />
        <Box width="100%" color="gray" margin="10px" textAlign="center">
          <Typography variant="h4" fontSize="12px">
            Access exclusive tools & insights
          </Typography>
          <Link to="/premium" style={{ textDecoration: "none" }}>
            <Typography variant="h4" fontSize="12px" color="blue">
              Try premium for free
            </Typography>
          </Link>
        </Box>
      </Box>
      <Box
        width="225px"
        display="flex"
        flexDirection="column"
        borderRadius="10px"
        m="8px 0px 8px 0px"
        sx={{
          background: "white",
          height: "max-content",
          "@media (max-width: 644px)": {
            width: "94%",
            alignSelf: "center",
          },
        }}>
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/group")}
          fontSize="14px"
          color="#9b9b9b"
          m="20px">
          Group
        </Typography>
      </Box>
    </Box>
  );
};

export default SideBar;
