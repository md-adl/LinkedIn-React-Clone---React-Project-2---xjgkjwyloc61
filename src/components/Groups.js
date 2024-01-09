import React, { useEffect, useRef, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import {
  Avatar,
  Box,
  Modal,
  Typography,
  Button,
  IconButton,
  Input,
  TextField,
  Popover,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import image from "../images/image.jpg";
import { useNavigate } from "react-router-dom";

const Groups = () => {
  const [{ groupPost, userName, token }, dispatch] = useStateProvider();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [groupPostStore, setGroupPostStore] = useState([]);
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupImage, setGroupImage] = useState("");
  const fileInputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [groupPosts, setGroupPosts] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    console.log(groupPostStore);
  }, [groupPostStore]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      setGroupImage(selectedFile);
    }
  };

  const handleClick = (event, obj) => {
    setAnchorEl(event.currentTarget);
    setGroupPosts(obj);
    console.log(obj);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateGroup = () => {
    axios
      .post(
        "https://academics.newtonschool.co/api/v1/linkedin/channel/",
        {
          name: groupTitle,
          description: groupDescription,
          images: groupImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectId: "f104bi07c490",
          },
        },
      )
      .then((response) => {
        console.log(response);
        if (
          response?.response?.message == "Channel with this name already exists"
        )
          alert("Channel with this name already exists");

        const existingGroups =
          JSON.parse(localStorage.getItem("groupData")) || [];

        const updatedGroups = [...existingGroups, response.data.data];

        localStorage.setItem("groupData", JSON.stringify(updatedGroups));
        dispatch({ type: "SET_GROUP", payload: updatedGroups });

        setGroupTitle("");
        setGroupImage(null);
        setGroupDescription("");
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response.data.message === "Channel with this name already exists"
        ) {
          alert("Channel with this name already exists... Try Something else");
        }
      });
  };

  const handleDeleteGroup = (obj) => {
    console.log(groupPosts);
    axios
      .delete(
        `https://academics.newtonschool.co/api/v1/linkedin/channel/${groupPosts._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectId: "f104bi07c490",
          },
        },
      )
      .then((response) => {
        console.log(response);
        const existingGroups =
          JSON.parse(localStorage.getItem("groupData")) || [];

        const updatedGroups = existingGroups.filter(
          (group) => group._id !== groupPosts._id,
        );

        localStorage.setItem("groupData", JSON.stringify(updatedGroups));
        dispatch({ type: "REMOVE_GROUP_POST", payload: groupPosts._id });
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.message === "No document found with that ID") {
          const existingGroups =
            JSON.parse(localStorage.getItem("groupData")) || [];

          const updatedGroups = existingGroups.filter(
            (group) => group._id !== obj._id,
          );

          localStorage.setItem("groupData", JSON.stringify(updatedGroups));
          dispatch({ type: "REMOVE_GROUP_POST", payload: obj._id });
        }
      });
    setAnchorEl(null);
  };

  const handleUpdateGroup = () => {
    console.log("groupPostStore", groupPostStore);
    axios
      .patch(
        `https://academics.newtonschool.co/api/v1/linkedin/channel/${groupPostStore._id}/`,
        {
          name: groupTitle,
          description: groupDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectId: "f104bi07c490",
          },
        },
      )
      .then((response) => {
        console.log(response);
        // dispatch({ type: "SET_GROUP", payload: response.data.data });
        setGroupTitle("");
        setGroupImage(null);
        setGroupDescription("");
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();

  return (
    <Box
      width="70%"
      sx={{
        background: "white",
        "@media(max-width:650px)": { width: "90%" },
      }}
      borderRadius="10px"
      m="auto"
      mt="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        borderBottom="1px solid rgba(0,0,0,0.3)">
        <Typography
          varian="h6"
          color="green"
          fontSize="14px"
          fontWeight="600"
          pl="20px"
          alignSelf="center">
          My Groups
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            setFlag(false);
            openModal();
          }}
          sx={{
            borderRadius: "25px",
            textTransform: "none",
            height: "35px",
            m: "10px",
          }}>
          Create Group
        </Button>
      </Box>
      <Box
        width="100%"
        height="500px"
        sx={{
          background: "white",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        borderRadius="10px"
        m="auto">
        {groupPost?.map((obj) => {
          return (
            <Box
              key={obj._id}
              display="flex"
              width="100%"
              justifyContent="space-between"
              height="108px"
              sx={{ cursor: "pointer" }}>
              <Box display="flex">
                <Box ml="20px" alignSelf="center">
                  <img
                    src={image}
                    style={{
                      width: "70px",
                      height: "70px",
                      transform: "rotate(180deg)",
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignSelf="center"
                  ml="15px">
                  <Box display="flex">
                    <Typography fontSize="17px" fontWeight="600">
                      {obj.name}
                    </Typography>

                    <Typography
                      ml="10px"
                      border="1px solid rgba(0,0,0,0.4)"
                      padding="0px 10px"
                      color="#3a3a3a"
                      fontSize="14px"
                      borderRadius="3px"
                      sx={{ background: "#e1e1e1" }}>
                      Owner
                    </Typography>
                  </Box>
                  <Typography fontSize="14px" color="#a2a2a2">
                    {obj.description}
                  </Typography>
                  <Typography color="gray">1 member</Typography>
                </Box>
              </Box>
              <MoreHorizIcon
                aria-describedby={id}
                onClick={(e) => {
                  handleClick(e, obj);
                }}
                sx={{
                  alignSelf: "center",
                  mr: "16px",
                  borderRadius: "25px",
                  "&:hover": { background: "lightgray" },
                }}
              />
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
                <Typography
                  p="18px"
                  onClick={() => handleDeleteGroup(obj)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { background: "lightgray" },
                  }}>
                  Delete Group
                </Typography>
                {/* <Typography
                  p="18px"
                  onClick={() => {
                    setFlag(true);
                    setGroupPostStore(obj);
                    openModal();
                  }}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { background: "lightgray" },
                  }}>
                  Edit Group
                </Typography> */}
                <Typography
                  p="18px"
                  onClick={() => navigate("/")}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { background: "lightgray" },
                  }}>
                  Go to Home
                </Typography>
              </Popover>
            </Box>
          );
        })}
      </Box>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          borderRadius="15px"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "744px",
            height: "560px",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            "@media(max-width:800px)": {
              width: "500px",
            },
            "@media(max-width:600px)": {
              width: "75%",
            },
          }}>
          <Typography
            varian="h6"
            fontSize="20px"
            fontWeight="600"
            pl="10px"
            alignSelf="center">
            {flag ? "Update Group" : "Create Group"}
          </Typography>

          <Box display="flex" alignItems="center" gap="12px">
            <IconButton onClick={handleIconClick} sx={{ width: "100%" }}>
              <AddPhotoAlternateIcon
                sx={{
                  width: "250px",
                  height: "250px",
                  color: "pink",
                  "@media(max-width:600px)": {
                    width: "100px",
                    height: "100px",
                  },
                }}
              />
            </IconButton>
            <Input
              type="file"
              inputRef={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Box>
          <label className="inputLabel">Group name</label>
          <br />
          <input
            required
            type="text"
            value={groupTitle}
            onChange={(e) => {
              setGroupTitle(e.target.value);
            }}
            placeholder="Enter your group name"
            className="inputClass"
          />
          <br />
          <label className="inputLabel">Description</label>
          <br />
          <textarea
            rows="6"
            required
            type="text"
            value={groupDescription}
            onChange={(e) => {
              setGroupDescription(e.target.value);
            }}
            placeholder=" What is the purpose of your group?"
            style={{
              borderRadius: "6px",
              margin: "5px 0px 20px 0px",
              paddingLeft: "6px",
              paddingTop: "6px",
              border: "1px solid gray",
              width: "100%",
            }}
          />
          <br />
          <label className="inputLabel">Location</label>
          <br />
          <input
            type="text"
            placeholder="Add a location to your group"
            className="inputClass"
          />
          <br />
          <label className="inputLabel">Rules</label>
          <br />
          <input
            type="text"
            placeholder="Set the tone and expectation of your group"
            className="inputClass"
          />
          <br />
          <label className="inputLabel">Discoverability</label>
          <Typography fontSize="15px" mt="4px">
            Public groups appear in search results and are visible to others on
            member's profiles.
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            mt="15px"
            height="50px"
            width="100%">
            <Button
              onClick={flag ? handleUpdateGroup : handleCreateGroup}
              variant="contained"
              sx={{
                borderRadius: "10px",
                alignSelf: "center",
                width: "70%",
                textTransform: "none",
              }}>
              {flag ? "Update Group" : "Create Group"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Groups;
