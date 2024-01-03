import React, { useEffect } from "react";
import SideBar from "./SideBar";
import Postbar from "./Postbar";
import PostSection from "./PostSection";
import NewsFeed from "./NewsFeed";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box className="homepagefeed">
      <SideBar />
      <Box
        width="555px"
        display="flex"
        flexDirection="column"
        ml="20px"
        sx={{
          "@media (max-width: 864px)": { width: "471px" },
          "@media (max-width: 664px)": { width: "94%" },
        }}>
        <Postbar />
        <hr style={{ width: "99%", marginTop: "13px", marginBottom: "13px" }} />
        <PostSection />
      </Box>
      <NewsFeed />
    </Box>
  );
};

export default Home;
