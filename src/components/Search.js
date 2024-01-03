import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Search = () => {
  const [{ searchPost }, dispatch] = useStateProvider();
  const navigate = useNavigate();
  const handlepersonalDetails = (id) => {
    dispatch({ type: "SET_PERSONAL", payload: id });
    console.log("search", searchPost);
    navigate("/detail");
  };

  useEffect(() => {
    if (!searchPost) {
      navigate("/");
    }
  }, [searchPost]);
  return (
    <Box alignItems="center" display="flex" justifyContent="center">
      {!searchPost ? (
        <Box>
          <Typography
            variant="h3"
            textAlign="center"
            m="auto"
            color="lightgray">
            Please Enter the valid Search
          </Typography>
        </Box>
      ) : (
        <Box width="70%">
          {searchPost.map((post) => {
            const uniqueKey = uuidv4();
            return (
              <Box
                key={uniqueKey}
                onClick={() => {
                  handlepersonalDetails(post);
                }}
                width="100%"
                display="flex"
                mt="10px"
                padding="20px"
                borderRadius="25px"
                sx={{
                  background: "white",
                  cursor: "pointer",
                  "&:hover": { background: "#eeeeee" },
                }}>
                <img src={post.channel.image} width="50px" height="50px" />
                <Box display="flex" flexDirection="column" ml="15px">
                  <Typography
                    variant="h5"
                    color="#7a7aea"
                    fontSize="20px"
                    fontWeight="600">
                    {post.channel.name}
                  </Typography>
                  <Typography fontSize="17px">{post.author.name}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Search;
