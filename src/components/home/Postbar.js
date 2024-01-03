import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArticleIcon from "@mui/icons-material/Article";
import React, { useEffect, useRef, useState } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Postbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flag, setflag] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [{ userName, token, ownPost }, dispatch] = useStateProvider();
  const fileInputRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

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
      setPostImage(selectedFile);
      setflag(selectedFile.name);
    }
  };
  const handlePostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("content", postContent);
      formData.append("images", postImage);

      await axios
        .post(
          "https://academics.newtonschool.co/api/v1/linkedin/post/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              projectId: "f104bi07c490",
            },
          },
        )
        .then((response) => {
          console.log(response.data.data);
          const existingPosts =
            JSON.parse(localStorage.getItem("ownPostData")) || [];
          const updatedPosts = [...existingPosts, response.data.data];

          localStorage.setItem("ownPostData", JSON.stringify(updatedPosts));
          const ownPostData =
            JSON.parse(localStorage.getItem("ownPostData")) || [];
          dispatch({ type: "SET_OWNPOST", payload: ownPostData });
        })
        .catch((err) => console.log(err));

      setPostTitle("");
      setPostContent("");
      setPostImage(null);

      closeModal();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };
  useEffect(() => {
    console.log(ownPost);
  }, [ownPost]);
  const navigate = useNavigate();
  return (
    <Box width="100%" borderRadius="10px" sx={{ background: "white" }}>
      <Box display="flex">
        <Avatar
          onClick={() => navigate("/user")}
          sx={{
            width: "50px",
            height: "50px",
            ml: "15px",
            cursor: "pointer",
            mt: "10px",
          }}>
          {userName[0]}
        </Avatar>
        <Box
          border="1px solid gray"
          borderRadius="25px"
          height="45px"
          m="12px"
          width="88%"
          onClick={openModal}
          sx={{ cursor: "pointer", "&:hover": { background: "#f3f2f2" } }}>
          <Typography
            variant="h1"
            fontSize="17px"
            color="gray"
            mt="12px"
            ml="20px">
            Start a post
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-around" my="10px">
        <Box display="flex" sx={{ cursor: "pointer" }} onClick={openModal}>
          <ImageIcon sx={{ color: "#378fe9" }} />
          <Typography variant="h2" fontSize="14px" alignSelf="center" ml="5px">
            Media
          </Typography>
        </Box>
        <Box display="flex" sx={{ cursor: "pointer" }} onClick={openModal}>
          <CalendarMonthIcon sx={{ color: "#cb8f36" }} />
          <Typography variant="h2" fontSize="14px" alignSelf="center" ml="5px">
            Event
          </Typography>
        </Box>
        <Box display="flex" sx={{ cursor: "pointer" }} onClick={openModal}>
          <ArticleIcon sx={{ color: "#e06847" }} />
          <Typography variant="h2" fontSize="14px" alignSelf="center" ml="5px">
            Write Article
          </Typography>
        </Box>
      </Box>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "744px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            "@media(max-width:800px)": {
              width: "500px",
            },
            "@media(max-width:600px)": {
              width: "300px",
            },
          }}>
          <Box display="flex" alignItems="center" gap="12px">
            <Avatar width="50px" height="50px">
              A
            </Avatar>
            <Typography>{userName}</Typography>
          </Box>
          <TextField
            onChange={(e) => setPostTitle(e.target.value)}
            value={postTitle}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
              },
              width: "100%",
            }}
            placeholder="Enter the Title"
            variant="outlined"
            multiline
          />
          <TextField
            onChange={(e) => setPostContent(e.target.value)}
            value={postContent}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
              },
              width: "100%",
              height: "440px",
              overflowY: "scroll",
            }}
            placeholder="What do you want to talk about"
            variant="outlined"
            multiline
          />
          <Box display="flex" justifyContent="space-between">
            <Box display="flex">
              <IconButton onClick={handleIconClick}>
                <InsertPhotoIcon />
              </IconButton>
              <Input
                type="file"
                inputRef={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Typography alignSelf="center">{flag}</Typography>
            </Box>
            <Button
              onClick={handlePostSubmit}
              variant="contained"
              color="primary">
              Post
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Postbar;
