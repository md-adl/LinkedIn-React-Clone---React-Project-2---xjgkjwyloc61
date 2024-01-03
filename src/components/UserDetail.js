import React, { useEffect, useRef, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import {
  Avatar,
  Box,
  IconButton,
  Modal,
  TextField,
  Input,
  Typography,
  Button,
  Popover,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./home/SideBar";
import Postbar from "./home/Postbar";
import axios from "axios";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import RefreshIcon from "@mui/icons-material/Refresh";
import CachedIcon from "@mui/icons-material/Cached";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const UserDetail = () => {
  const [{ ownPost, userName, token }, dispatch] = useStateProvider();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [comment, setComment] = useState("");
  const [flag, setflag] = useState("");
  const [saveId, setSaveId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const fileInputRef = useRef(null);
  const [resetComment, setResetComment] = useState("");
  const [commentId, setCommentId] = useState(-1);

  const openModal = (postId) => {
    setAnchorEl(null);
    setPostImage(null);
    setflag("");
    setIsModalOpen(true);
    console.log(token);
  };

  const handleOpenModal = (id) => {
    console.log(id);
    openModal(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalTwo = (post, index) => {
    setCommentId(index);
    setIsModalTwoOpen(true);
    setSaveId(post._id);
    console.log(post._id);
  };

  const closeModalTwo = () => {
    setIsModalTwoOpen(false);
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

  const handleRepost = () => {
    const postIndex = ownPost.findIndex((p) => p._id === saveId);
    console.log(saveId);

    if (postIndex !== -1) {
      const updatedPosts = [...ownPost];
      updatedPosts.splice(postIndex, 1);
      localStorage.setItem("ownPostData", JSON.stringify(updatedPosts));
      const ownPostDatas =
        JSON.parse(localStorage.getItem("ownPostData")) || [];
      dispatch({ type: "SET_OWNPOST", payload: ownPostDatas });
    }
    handleClose();
  };
  const handlePostSubmit = () => {
    const ownPostData = JSON.parse(localStorage.getItem("ownPostData")) || [];

    console.log("saveId:", saveId);
    const filteredPostIndex = ownPostData.findIndex(
      (post) => post._id === saveId,
    );
    console.log("filteredPostIndex:", filteredPostIndex);

    ownPostData[filteredPostIndex].title = postTitle;
    ownPostData[filteredPostIndex].content = postContent;
    if (!postImage) {
      ownPostData[filteredPostIndex]?.image?.push(postImage);
    }
    localStorage.setItem("ownPostData", JSON.stringify(ownPostData));
    const ownPostDatas = JSON.parse(localStorage.getItem("ownPostData")) || [];
    dispatch({ type: "SET_OWNPOST", payload: ownPostDatas });

    console.log(ownPost);
    setPostTitle("");
    setPostContent("");
    setPostImage(null);

    closeModal();
  };

  const handleLike = (post) => {
    const postIndex = ownPost.findIndex((p) => p._id === post._id);

    if (postIndex !== -1) {
      const updatedPosts = [...ownPost];
      const updatedPost = { ...updatedPosts[postIndex] };

      if (!updatedPost.liked) {
        updatedPost.color = "blue";
      } else {
        updatedPost.color = "#676767";
      }

      updatedPost.liked = !updatedPost.liked;
      updatedPosts[postIndex] = updatedPost;
      console.log(ownPost);
      localStorage.setItem("ownPostData", JSON.stringify(updatedPosts));
      dispatch({ type: "SET_OWNPOST", payload: updatedPosts });
    }
  };

  const handleCommentAdd = (post) => {
    const postIndex = ownPost.findIndex((p) => p._id === post._id);
    setSaveId(postIndex);
    ownPost[postIndex].comment = true;

    localStorage.setItem("ownPostData", JSON.stringify(ownPost));
    const ownPostDatas = JSON.parse(localStorage.getItem("ownPostData")) || [];
    dispatch({ type: "SET_OWNPOST", payload: ownPostDatas });
  };

  const handleComment = (event, post) => {
    const postIndex = ownPost.findIndex((p) => p._id === post._id);
    if (event.key === "Enter") {
      const existingComments = ownPost[postIndex].commentPost;
      if (existingComments && existingComments.length > 0) {
        ownPost[postIndex].commentPost = [...existingComments, comment];
      } else {
        ownPost[postIndex].commentPost = [comment];
      }
      localStorage.setItem("ownPostData", JSON.stringify(ownPost));
      const ownPostDatas =
        JSON.parse(localStorage.getItem("ownPostData")) || [];
      dispatch({ type: "SET_OWNPOST", payload: ownPostDatas });
      console.log(comment);
      console.log(ownPost[postIndex]);
      setComment("");
    }
  };
  const handleEditComment = (event) => {
    if (event.key === "Enter") {
      closeModalTwo();
      const postIndex = ownPost.findIndex((p) => p._id === saveId);
      console.log("post", postIndex);
      if (postIndex !== -1) {
        const existingComments = ownPost[postIndex].commentPost;
        if (existingComments.length > 0) {
          if (commentId !== -1) {
            console.log(resetComment);
            existingComments[commentId] = resetComment;
          }
        }
        ownPost[postIndex].commentPost = existingComments;

        localStorage.setItem("ownPostData", JSON.stringify(ownPost));
        const ownPostDatas =
          JSON.parse(localStorage.getItem("ownPostData")) || [];
        dispatch({ type: "SET_OWNPOST", payload: ownPostDatas });

        setResetComment("");
      }
    }
  };

  const handleDeleteComment = () => {
    if (saveId !== "" && commentId !== -1) {
      const postIndex = ownPost.findIndex((p) => p._id === saveId);

      if (postIndex !== -1) {
        const existingComments = ownPost[postIndex].commentPost;

        if (existingComments.length > commentId) {
          existingComments.splice(commentId, 1);

          ownPost[postIndex].commentPost = existingComments;

          localStorage.setItem("ownPostData", JSON.stringify(ownPost));
          const ownPostDatas =
            JSON.parse(localStorage.getItem("ownPostData")) || [];
          dispatch({ type: "SET_OWNPOST", payload: ownPostDatas });

          closeModalTwo();
        }
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event, post) => {
    setAnchorEl(event.currentTarget);
    setSaveId(post._id);
    console.log(post._id);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt="7px"
      sx={{ "@media(max-width:650px)": { flexDirection: "column" } }}>
      <Box>
        <SideBar />
      </Box>

      <Box
        width="50%"
        ml="13px"
        sx={{ "@media(max-width:650px)": { width: "93.4%" } }}>
        <Box
          pb="1px"
          sx={{
            background: "white",
            "@media(max-width:650px)": { width: "100%", ml: "6px" },
          }}>
          <Postbar />
        </Box>
        <Box
          width="95%"
          flexDirection="column"
          mt="7px"
          sx={{
            display: ownPost.length === 0 ? "none" : "flex",
            "@media(max-width:650px)": { width: "97.4%", ml: "6px" },
          }}
          gap="5px">
          {ownPost?.map((post) => {
            return (
              <Box
                key={post._id}
                width="100%"
                borderRadius="13px"
                display="flex"
                padding="20px 16px 0px 16px"
                flexDirection="column"
                sx={{
                  background: "white",
                  cursor: "pointer",
                  "@media(max-width:760px)": { pr: "20px" },
                }}>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex" ml="8px">
                    <Avatar width="50px" height="50px">
                      A
                    </Avatar>
                    <Typography
                      alignSelf="center"
                      ml="8px"
                      fontSize="21px"
                      fontWeight="600">
                      {userName}
                    </Typography>
                  </Box>
                  <MoreHorizIcon
                    aria-describedby={id}
                    onClick={(e) => handleClick(e, post)}
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
                    <Box
                      display="flex"
                      height="40px"
                      p="10px 10px 0px 10px"
                      onClick={handleRepost}
                      sx={{
                        cursor: "pointer",
                        color: "#676767",
                        "&:hover": { background: "#f1efef" },
                      }}>
                      <Typography ml="5px">Delete Post</Typography>
                    </Box>
                    <Box
                      display="flex"
                      height="40px"
                      p="10px 10px 0px 10px"
                      sx={{
                        cursor: "pointer",
                        color: "#676767",
                        "&:hover": { background: "#f1efef" },
                      }}>
                      <Typography
                        ml="5px"
                        onClick={() => handleOpenModal(post._id)}>
                        Update Post
                      </Typography>
                    </Box>
                  </Popover>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  ml="25px"
                  mt="10px"
                  pl="31px"
                  pb="10px">
                  <Typography
                    variant="h5"
                    color="#7a7aea"
                    fontSize="16px"
                    fontWeight="600">
                    {post.title}
                  </Typography>
                  <Typography fontSize="15px">{post.content}</Typography>
                </Box>
                <img
                  src={post.images && post.images[0]}
                  style={{
                    display: post.images && post.images.length === 0 && "none",
                  }}
                  width="100%"
                  height="400px"
                />
                <Box
                  display="flex"
                  width="100%"
                  justifyContent="space-between"
                  pt="10px"
                  mb="10px">
                  <Box
                    display="flex"
                    height="40px"
                    onClick={() => handleLike(post)}
                    sx={{
                      cursor: "pointer",
                      alignItems: "center",
                      width: "22%",
                      justifyContent: "center",
                      color: post.color,
                      "&:hover": { background: "#f1efef" },
                    }}>
                    <ThumbUpIcon />
                    <Typography ml="5px">Like</Typography>
                  </Box>
                  <Box
                    display="flex"
                    height="40px"
                    onClick={() => handleCommentAdd(post)}
                    sx={{
                      cursor: "pointer",
                      alignItems: "center",
                      p: "0px 10px 0px 10px",
                      justifyContent: "center",
                      color: "#676767",
                      "&:hover": { background: "#f1efef" },
                    }}>
                    <MessageIcon />
                    <Typography ml="5px">Comment</Typography>
                  </Box>
                </Box>
                {post.comment && (
                  <Box
                    display="flex"
                    pb="20px"
                    alignItems="center"
                    width="100%"
                    gap="5px"
                    borderBottom="1px solid rgba(0,0,0,0.3)">
                    <Avatar sx={{ width: "40px", height: "40px", ml: "10px" }}>
                      A
                    </Avatar>
                    <TextField
                      onKeyDown={(e) => {
                        handleComment(e, post);
                      }}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      value={comment}
                      id={`outlined-basic-${post._id}`}
                      sx={{ width: "89%" }}
                      placeholder="Enter your comment.."
                      variant="outlined"
                    />
                  </Box>
                )}
                <Box display="flex" flexDirection="column">
                  {post.commentPost?.map((obj, index) => {
                    return (
                      <Box key={obj._id} display="flex" p="10px">
                        <Avatar
                          sx={{
                            width: "40px",
                            height: "40px",
                            background: "#bdbdef",
                            color: "white",
                          }}>
                          A
                        </Avatar>
                        <Typography
                          variant="h1"
                          ml="10px"
                          alignSelf="center"
                          fontSize="16px"
                          width="100%"
                          borderRadius="10px"
                          height="36px"
                          display="flex"
                          alignItems="center"
                          pl="7px"
                          fontWeight="600"
                          sx={{ background: "#dcdada" }}>
                          {obj}
                        </Typography>
                        <MoreHorizIcon
                          onClick={() => openModalTwo(post, index)}
                          sx={{
                            m: "3px 5px 0px 5px",
                            cursor: "pointer",
                            borderRadius: "25px",
                            p: "5px",
                            "&:hover": { background: "lightgray" },
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
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
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={isModalTwoOpen} onClose={closeModalTwo}>
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
            <Typography fontSize="20px" fontWeight="600">
              {userName}
            </Typography>
          </Box>
          <TextField
            onChange={(e) => setResetComment(e.target.value)}
            onKeyDown={handleEditComment}
            value={resetComment}
            sx={{
              ml: "30px",
              mt: "10px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "10px",
                },
              },
              width: "92%",
            }}
            placeholder="Reset your Comment...."
            variant="outlined"
          />
          <Box display="flex" m="15px 0px 0px 48px">
            <Typography alignSelf="center">Delete Your Comment</Typography>
            <Button
              onClick={handleDeleteComment}
              variant="contained"
              sx={{ m: "0px 0px 0px 10px", p: "10px 20px 10px 20px" }}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserDetail;
