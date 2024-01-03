import React, { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import SchoolIcon from "@mui/icons-material/School";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

const Details = () => {
  const [{ personalDetail, token, profile }, dispatch] = useStateProvider();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowed, setisFollowed] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    try {
      axios
        .get(
          `https://academics.newtonschool.co/api/v1/linkedin/user/${personalDetail.channel.owner}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              projectId: "f104bi07c490",
            },
          },
        )
        .then((response) => {
          dispatch({ type: "SET_PROFILE", payload: response.data.data });
        });
    } catch {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const ownFollow = JSON.parse(localStorage.getItem("follow")) || [];

    if (profile && profile._id) {
      const profileExists = ownFollow.some((item) => item._id === profile._id);

      if (profileExists && !profile.follow) {
        const updatedProfile = { ...profile, follow: true };
        dispatch({
          type: "SET_PROFILE",
          payload: updatedProfile,
        });
      }
    }
  }, [profile, dispatch]);

  var follower;
  var Connection;
  const projectId = "f104bi07c490";

  const handleFollow = () => {
    if (profile && profile._id) {
      const ownFollow = JSON.parse(localStorage.getItem("follow")) || [];
      const profileExistsIndex = ownFollow.findIndex(
        (item) => item._id === profile._id,
      );
      if (profileExistsIndex !== -1) {
        ownFollow[profileExistsIndex].follow = true;
        dispatch({
          type: "SET_PROFILE",
          payload: ownFollow[profileExistsIndex],
        });
      } else {
        // If the profile doesn't exist in ownFollow, add it
        profile.follow = true;
        console.log("jabfkhdjacf", profile);
        ownFollow.push(profile);
        dispatch({
          type: "SET_PROFILE",
          payload: profile,
        });
      }

      localStorage.setItem("follow", JSON.stringify(ownFollow));
    }
  };

  const handleUnFollow = () => {
    if (profile && profile._id) {
      const ownFollow = JSON.parse(localStorage.getItem("follow")) || [];
      const profileExistsIndex = ownFollow.findIndex(
        (item) => item._id === profile._id,
      );

      ownFollow[profileExistsIndex] = profile;
      ownFollow[profileExistsIndex].follow = false;
      localStorage.setItem("follow", JSON.stringify(ownFollow));

      dispatch({
        type: "SET_PROFILE",
        payload: ownFollow[profileExistsIndex],
      });
    }
  };

  return (
    <>
      <Box
        width="844px"
        justifySelf="center"
        margin="auto"
        borderRadius="12px"
        pb="20px"
        position="relative"
        sx={{ background: "white" }}
        mt="25px">
        <img
          src={profile?.profileImage}
          width="100%"
          height="150px"
          style={{ borderRadius: "12px 12px 0px 0px", objectFit: "cover" }}
        />
        <Avatar
          sx={{
            position: "absolute",
            top: "63px",
            left: "21px",
            width: "130px",
            height: "130px",
          }}>
          <img src={personalDetail.channel.image} />
        </Avatar>

        <Box display="flex">
          <Box mt="50px" ml="20px" width="70%">
            <Typography fontSize="23px" fontWeight="600" fontFamily="Helvetica">
              {personalDetail.author.name}
            </Typography>
            <Typography fontSize="15px" color="#363636" fontFamily="Helvetica">
              {personalDetail.channel.name}
            </Typography>
            <Typography fontSize="15px" color="#949494" fontFamily="Helvetica">
              {profile?.address[0]?.street +
                " , " +
                profile?.address[0]?.state +
                " , " +
                profile?.address[0]?.country}
            </Typography>
            <Typography fontSize="15px" color="#949494" fontFamily="Helvetica">
              {(follower = Math.floor(Math.random() * 100) + 1)}
              {(Connection = Math.floor(Math.random() * 1000) + 1)}
              {follower + " "} Followers {" " + Connection + " "} Connections
            </Typography>
            <Typography fontSize="15px" color="#949494" fontFamily="Helvetica">
              Contact Number : {profile?.phone}
            </Typography>
            <Box display="flex" gap="5px" mt="10px">
              <Button
                sx={{ borderRadius: "25px", px: "20px" }}
                variant="contained">
                Message
              </Button>

              {profile?.follow ? (
                <Button
                  onClick={handleUnFollow}
                  sx={{ borderRadius: "25px", px: "20px" }}
                  variant="outlined">
                  Unfollow
                </Button>
              ) : (
                <Button
                  onClick={handleFollow}
                  sx={{ borderRadius: "25px", px: "20px" }}
                  variant="outlined">
                  Follow
                </Button>
              )}
              <Button
                onClick={openModal}
                sx={{ borderRadius: "25px", px: "20px" }}
                variant="text">
                Payment
              </Button>
            </Box>
          </Box>
          <Box width="30px" mt="50px">
            {profile?.workExperience?.map((obj) => {
              return (
                <>
                  <Typography fontSize="15px" fontWeight="600">
                    {obj.companyName}
                  </Typography>
                </>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ background: "white" }}
        borderRadius="12px"
        width="844px"
        justifySelf="center"
        margin="auto"
        mt="15px">
        <Typography p="20px" fontSize="26px">
          About
        </Typography>
        <Typography color="#8d8d8d" p="0px 20px 20px 20px">
          {personalDetail.content}
        </Typography>
      </Box>
      <Box
        gap="20px"
        width="844px"
        justifySelf="center"
        margin="auto"
        borderRadius="12px"
        mt="15px"
        sx={{ background: "white" }}
        display={profile?.workExperience?.length === 0 ? "none" : "flex"}>
        {profile?.workExperience?.length != 0 &&
          profile?.workExperience?.map((obj) => {
            return (
              <Box width="100%">
                <Typography p="20px 20px 10px 20px" fontSize="26px">
                  Work Experience
                </Typography>
                <Box
                  display="flex"
                  color="#8d8d8d"
                  p="0px 0px 0px 20px"
                  fontSize="18px"
                  fontWeight="700">
                  <BusinessCenterIcon color="#c9c9c9" />
                  <Typography ml="8px">
                    <a
                      style={{ textDecoration: "none", color: "#8d8d8d" }}
                      target="_blank"
                      href={`https://www.google.com/search?q=${obj.companyName}&rlz=1C1VDKB_enIN1030IN1030&oq=anything&aqs=chrome..69i57j0i271l3.2784j0j7&sourceid=chrome&ie=UTF-8`}>
                      {obj.companyName}
                    </a>
                  </Typography>
                </Box>

                <Typography
                  color="#8d8d8d"
                  p="3px 0px 0px 20px"
                  fontSize="14px">
                  {obj.designation}
                </Typography>
                <Typography
                  color="#8d8d8d"
                  p="3px 0px 0px 20px"
                  fontSize="14px">
                  {obj.description}
                </Typography>
                <Typography
                  color="#8d8d8d"
                  p="3px 0px 10px 20px"
                  fontSize="14px">
                  {obj.location}
                </Typography>
                <hr
                  style={{
                    width: "95%",
                    display:
                      profile?.workExperience?.length === 1 ? "none" : "",
                  }}
                />
              </Box>
            );
          })}
      </Box>
      <Box
        gap="20px"
        width="844px"
        justifySelf="center"
        margin="auto"
        borderRadius="12px"
        mt="15px"
        pb="20px"
        sx={{ background: "white", display: "flex", flexDirection: "column" }}
        display={profile?.education?.length === 0 ? "none" : "flex"}>
        <Typography p="20px 20px 0px 20px" fontSize="26px">
          Education
        </Typography>
        {profile?.education?.length != 0 &&
          profile?.education?.map((obj, index) => {
            return (
              <Box width="100%">
                <Box
                  display="flex"
                  color="#8d8d8d"
                  p="0px 0px 0px 20px"
                  fontSize="18px"
                  fontWeight="700">
                  <SchoolIcon color="#c9c9c9" />
                  <Typography ml="8px">
                    <a
                      style={{ textDecoration: "none", color: "#8d8d8d" }}
                      target="_blank"
                      href={`https://www.google.com/search?q=${obj.schoolName}&rlz=1C1VDKB_enIN1030IN1030&oq=anything&aqs=chrome..69i57j0i271l3.2784j0j7&sourceid=chrome&ie=UTF-8`}>
                      {obj.schoolName}
                    </a>
                  </Typography>
                </Box>
                <Typography
                  color="#8d8d8d"
                  p="3px 0px 0px 20px"
                  fontSize="14px">
                  {obj.degree}
                </Typography>
                <Typography
                  color="#8d8d8d"
                  p="3px 0px 0px 20px"
                  fontSize="14px">
                  {obj.description}
                </Typography>

                <hr
                  style={{
                    width: "95%",
                    display:
                      index === profile?.education?.length - 1 ||
                      profile?.education?.length === 1
                        ? "none"
                        : "",
                  }}
                />
              </Box>
            );
          })}
      </Box>
      <Box
        gap="20px"
        width="844px"
        justifySelf="center"
        margin="auto"
        borderRadius="12px"
        mt="15px"
        pb="20px"
        mb="20px"
        sx={{ background: "white", display: "flex", flexDirection: "column" }}
        display={profile?.skills?.length === 0 ? "none" : "flex"}>
        <Typography p="20px 20px 0px 20px" fontSize="26px">
          Skills
        </Typography>
        {profile?.skills?.length != 0 &&
          profile?.skills?.map((obj) => {
            return (
              <Box
                display="flex"
                color="#8d8d8d"
                p="0px 0px 0px 20px"
                fontSize="18px"
                fontWeight="700">
                <AutoFixHighIcon color="#c9c9c9" width="40px" height="40px" />
                <Typography ml="7px">
                  <a
                    target="_blank"
                    href={`https://www.google.com/search?q=${obj}&rlz=1C1VDKB_enIN1030IN1030&oq=anything&aqs=chrome..69i57j0i271l3.2784j0j7&sourceid=chrome&ie=UTF-8`}
                    style={{ textDecoration: "none", color: "#8d8d8d" }}>
                    {obj}
                  </a>
                </Typography>
              </Box>
            );
          })}
      </Box>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: "50px",
          }}>
          {profile?.paymentDetails?.map((obj) => {
            return (
              <>
                <Typography fontSize="18px" fontWeight="700" color="#7d7b7b">
                  Card Number{" : " + obj.cardNumber}
                </Typography>
                <Typography fontSize="17px" fontWeight="700" color="#7d7b7b">
                  CVV{" : " + obj.cvv}
                </Typography>
              </>
            );
          })}
        </Box>
      </Modal>
    </>
  );
};

export default Details;
