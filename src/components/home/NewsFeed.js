import { Box, Typography } from "@mui/material";
import React from "react";

const NewsFeed = () => {
  return (
    <Box
      width="260px"
      display="flex"
      flexDirection="column"
      borderRadius="10px"
      ml="20px"
      position="sticky"
      top="20px"
      sx={{
        background: "white",
        height: "max-content",
        "@media (max-width: 1000px)": {
          display: "none",
        },
      }}>
      <Typography
        variant="h3"
        fontSize="17px"
        alignSelf="baseline"
        mt="15px"
        ml="14px"
        fontWeight="600">
        LinkedIn News
      </Typography>
      <ul className="newReaderList">
        <li>IT Deals the recovery parts</li>
        <Typography fontSize="13px" color="gray">
          now
        </Typography>
        <li>Budject clothing now in vogue</li>
        <Typography fontSize="13px" color="gray">
          1day ago
        </Typography>
        <li>Kuku FM raises $25 million</li>
        <Typography fontSize="13px" color="gray">
          20h ago
        </Typography>
        <li> More Indians to staudy abroad</li>
        <Typography fontSize="13px" color="gray">
          20h ago
        </Typography>
        <li> How to ace training programmes</li>
        <Typography fontSize="13px" color="gray">
          2h ago
        </Typography>
        <li>FMCG firms ride millet wave</li>
        <Typography fontSize="13px" color="gray">
          now
        </Typography>
        <li>Data science jobs grow beyond IT</li>
        <Typography fontSize="13px" color="gray">
          1day ago
        </Typography>
        <li>Global carmakers bet big on India</li>
        <Typography fontSize="13px" color="gray">
          20h ago 1,204 readers
        </Typography>
        <li>Achieving gender pay parity</li>
        <Typography fontSize="13px" color="gray">
          20h ago
        </Typography>
      </ul>
    </Box>
  );
};

export default NewsFeed;
