import {
  Avatar,
  Box,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MessageIcon from "@mui/icons-material/Message";
import RepeatIcon from "@mui/icons-material/Repeat";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import LoopIcon from "@mui/icons-material/Loop";
import EditIcon from "@mui/icons-material/Edit";
import { v4 as uuidv4 } from "uuid";

const PostSection = () => {
  const [{ posts, token, ownPost, personalDetail, userName}, dispatch] =
    useStateProvider();
  const navigate = useNavigate();
  const [online, setOnline] = useState(true);
  const [comment, setComment] = useState("");
  const [resetComment, setResetComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveId, setSaveId] = useState("");
  const [commentPost, setCommentPost] = useState({});
  // const [sortByLikes, setSortByLikes] = useState(false);
  
  

  let followers;

  useEffect(() => {
    console.log("postsdfdf", posts);

    if (!localStorage.getItem("posts")) {
      axios
        .get(
          "https://academics.newtonschool.co/api/v1/linkedin/post?limit=98",
          {
            headers: {
              projectId: "f104bi07c490",
            },
          },
        )
        .then((response) => {
          // console.log(response.data.data);
          console.log("sdbfdskjfbhdkfb");
          dispatch({
            type: "SET_POST",
            payload: response.data.data,
          });
          console.log(token);
        })
        .catch((error) => {
          setOnline(false);
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    console.log("posts", posts);
    // if (sortByLikes) {
    //   const sortedPosts = [...posts].sort((b, a) => b.likeCount - a.likeCount);
    //   dispatch({ type: "SET_POST", payload: sortedPosts });
    // }
  }, [dispatch, posts]);
  

  const handleLike = (post) => {
    const postIndex = posts.findIndex((p) => p._id === post._id);

    if (postIndex !== -1) {
      const updatedPosts = [...posts];
      const updatedPost = { ...updatedPosts[postIndex] };

      if (!updatedPost.liked) {
        updatedPost.likeCount += 1;
        updatedPost.color = "blue";
      } else {
        updatedPost.likeCount -= 1;
        updatedPost.color = "#676767";
      }

      updatedPost.liked = !updatedPost.liked; // Toggle the 'liked' property
      updatedPosts[postIndex] = updatedPost;
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      dispatch({ type: "SET_POST", payload: updatedPosts });
    }
  };
  // const handleSortByLikes = () => {
  //   setSortByLikes(!sortByLikes);
  // };

  const handleComment = (event) => {
    const postIndex = posts.findIndex((p) => p._id === commentPost._id);
    if (event.key === "Enter" && commentPost && commentPost._id) {
      const bodyContent = {
        content: comment,
      };
      let headersList = {
        Authorization: `Bearer ${token}`,
        projectId: "f104bi07c490",
      };

      axios
        .post(
          `https://academics.newtonschool.co/api/v1/linkedin/comment/${commentPost._id}`,
          bodyContent,
          { headers: headersList },
        )
        .then((response) => {
          console.log("first response", response);
          axios
            .get(
              `https://academics.newtonschool.co/api/v1/linkedin/post/${commentPost._id}/comments`,
              { headers: headersList },
            )
            .then((response) => {
              console.log("response", response);
              if (postIndex !== -1) {
                const updatedPosts = [...posts];
                const updatedPost = { ...updatedPosts[postIndex] };
                updatedPost.postComment = response.data.data;
                updatedPosts[postIndex] = updatedPost;
                dispatch({ type: "SET_POST", payload: updatedPosts });
              }
            })
            .catch((err) => {
              console.log(err);
              if (err.code === "ERR_NETWORK") {
                alert("Check Your Connenction");
              }
            });
        })
        .catch((err) => {
          console.log(err);
          if (err.code === "ERR_NETWORK") {
            alert("Check Your Connenction");
          }
        });
      setComment("");
    }
  };

  const openModal = (post) => {
    setIsModalOpen(true);
    setCommentPost(post);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCommentAdd = (post) => {
    const postIndex = posts.findIndex((p) => p._id === post._id);
    const updatedPosts = [...posts];
    const updatedPost = { ...updatedPosts[postIndex] };
    setCommentPost(post);

    let headersList = {
      Authorization: `Bearer ${token}`,
      projectId: "f104bi07c490",
    };
    axios
      .get(
        `https://academics.newtonschool.co/api/v1/linkedin/post/${post._id}/comments`,
        { headers: headersList },
      )
      .then((response) => {
        console.log("response", response);
        setTimeout(() => {
          updatedPost.postComment = response.data.data;
          updatedPosts[postIndex] = updatedPost;
          dispatch({ type: "SET_POST", payload: updatedPosts });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "ERR_NETWORK") {
          alert("Check Your Connenction");
        }
      });
    updatedPost.comment = true;
    updatedPosts[postIndex] = updatedPost;
    dispatch({ type: "SET_POST", payload: updatedPosts });
  };

  const handlepersonalDetails = (id) => {
    dispatch({ type: "SET_PERSONAL", payload: id });
    navigate("/detail");
  };

  const handleEditComment = (event) => {
    if (event.key === "Enter") {
      const bodyContent = {
        content: resetComment,
      };
      let headersList = {
        Authorization: `Bearer ${token}`,
        projectId: "f104bi07c490",
      };

      axios
        .patch(
          `https://academics.newtonschool.co/api/v1/linkedin/comment/${commentPost._id}`,
          bodyContent,
          { headers: headersList },
        )
        .then((response) => {
          console.log("thirs response", response);
          handleCommentAdd(commentPost);
        })
        .catch((err) => {
          console.log(err);
          if (err.code === "ERR_NETWORK") {
            alert("Check Your Connenction");
          }
        });
      setResetComment("");
    }
  };
  return (
    <>
      {/* <button onClick={handleSortByLikes}>Sort By Likes</button> */}
      {posts.length != 0 ? (
        <Box display="flex" flexDirection="column">
          {posts
            ?.slice()
            .reverse()
            .map((post, index) => {
              console.log("Current Post:", post);
              const followers = Math.floor(Math.random() * 10000) + 1;
              const uniqueKey = uuidv4();
              return (
                <Box
                  key={post._id}
                  sx={{
                    background: "white",
                    borderRadius: "15px",
                    mb: "8px",
                    border: "solid 0.1px rgba(158,164,182,0.3)",
                  }}
                  display="flex"
                  flexDirection="column">
                  <Box
                    display="flex"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handlepersonalDetails(post);
                    }}>
                    <Avatar sx={{ width: "50px", height: "50px", m: "10px" }}>
                      <img
                        src={post?.author?.profileImage}
                        style={{ width: "100%" }}
                      />
                    </Avatar>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center">
                      <Typography variant="h1" fontSize="15px" ml="7px">
                        {post?.author?.name}
                      </Typography>
                      <Typography
                        variant="h1"
                        fontSize="13px"
                        ml="7px"
                        color="#979797">
                        {post?.channel?.name}
                      </Typography>
                      <Typography
                        variant="h1"
                        fontSize="13px"
                        ml="7px"
                        color="#979797">
                        {followers}
                        Followers
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="h3"
                    fontSize="16px"
                    color="#979797"
                    m="10px">
                    {post.content}
                  </Typography>
                  <img
                    src={post?.channel?.image}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    margin="10px">
                    <Box display="flex">
                      <ThumbUpIcon color="blue" fontSize="13px" />
                      <Typography fontSize="13px" ml="5px">
                        {post.likeCount + " "} Liked
                      </Typography>
                    </Box>
                    <Box display="flex">
                      <Typography fontSize="13px">
                        {post.commentCount + " "} Comments
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    width="100%"
                    justifyContent="space-between"
                    mb="10px">
                    <Box
                      display="flex"
                      ml="10px"
                      height="40px"
                      onClick={() => {
                        handleLike(post);
                      }}
                      sx={{
                        cursor: "pointer",
                        alignItems: "center",
                        width: "25%",
                        justifyContent: "center",
                        color: post.color,
                        "&:hover": { background: "#f1efef" },
                      }}>
                      <ThumbUpIcon />
                      <Typography
                        ml="5px"
                        sx={{ "@media(max-width:420px)": { display: "none" } }}>
                        Like
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      height="40px"
                      onClick={() => post && handleCommentAdd(post)}
                      sx={{
                        cursor: "pointer",
                        alignItems: "center",
                        width: "25%",
                        mr: "10px",
                        justifyContent: "center",
                        color: "#676767",
                        "&:hover": { background: "#f1efef" },
                      }}>
                      <MessageIcon />
                      <Typography
                        ml="5px"
                        sx={{ "@media(max-width:420px)": { display: "none" } }}>
                        Comment
                      </Typography>
                    </Box>
                    {/* <Box
                      display="flex"
                      height="40px"
                      sx={{
                        cursor: "pointer",
                        alignItems: "center",
                        width: "25%",
                        justifyContent: "center",
                        color: "#676767",
                        "&:hover": { background: "#f1efef" },
                      }}>
                      <RepeatIcon />
                      <Typography
                        ml="5px"
                        sx={{ "@media(max-width:420px)": { display: "none" } }}>
                        Repost
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      mr="10px"
                      height="40px"
                      sx={{
                        cursor: "pointer",
                        alignItems: "center",
                        width: "25%",
                        justifyContent: "center",
                        color: "#676767",
                        "&:hover": { background: "#f1efef" },
                      }}>
                      <SendIcon />
                      <Typography
                        ml="5px"
                        sx={{ "@media(max-width:420px)": { display: "none" } }}>
                        Send
                      </Typography>
                    </Box> */}
                  </Box>
                  {post.comment && (
                    <Box
                      display="flex"
                      pb="20px"
                      alignItems="center"
                      width="100%"
                      gap="5px"
                      borderBottom="1px solid rgba(0,0,0,0.3)">
                      <Avatar
                        sx={{ width: "40px", height: "40px", ml: "10px" }}>
                        A
                      </Avatar>
                      <TextField
                        onKeyDown={handleComment}
                        onChange={(e) => {
                          setComment(e.target.value);
                          console.log(e.target.value);
                        }}
                        value={comment}
                        id={uniqueKey}
                        sx={{ width: "85%" }}
                        placeholder="Enter your comment.."
                        variant="outlined"
                      />
                    </Box>
                  )}
                  <Box display="flex" flexDirection="column">
                    {post.postComment?.map((obj) => {
                      return (
                        <Box
                          key={obj._id}
                          display="flex"
                          p="10px"
                          // border="0.5px solid rgb(0,0,0,0.4)"
                        >
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
                            {obj.content}
                          </Typography>
                          <EditIcon
                            sx={{
                              mr: "5px",
                              cursor: "pointer",
                              borderRadius: "25px",
                              p: "5px",
                              "&:hover": { background: "lightgray" },
                            }}
                            onClick={() => openModal(obj)}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
        </Box>
      ) : (
        <Box
          height="200px"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center">
          <CircularProgress sx={{ width: "100px", height: "100px" }} />
        </Box>
      )}
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
            onChange={(e) => setResetComment(e.target.value)}
            onKeyDown={handleEditComment}
            value={resetComment}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
              },
              width: "100%",
            }}
            placeholder="Reset your Comment...."
            variant="outlined"
          />
        </Box>
      </Modal>
    </>
  );
};

export default PostSection;
