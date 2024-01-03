import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import logo2 from "../images/logo2.jpg";
import { Link, useNavigate } from "react-router-dom";

const Premium = () => {
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);
  const [flag4, setFlag4] = useState(false);
  const flagRef = useRef(null);
  const navigate = useNavigate();

  const handleChangeBoxOne = () => {
    setFlag1(true);
    setFlag2(false);
    setFlag3(false);
    setFlag4(false);
    window.scrollTo(0, document.body.scrollHeight - 800);
  };
  const handleChangeBoxTwo = () => {
    setFlag1(false);
    setFlag2(true);
    setFlag3(false);
    setFlag4(false);
    window.scrollTo(0, document.body.scrollHeight - 800);
  };
  const handleChangeBoxThree = () => {
    setFlag1(false);
    setFlag2(false);
    setFlag3(true);
    setFlag4(false);
    window.scrollTo(0, document.body.scrollHeight - 800);
  };
  const handleChangeBoxFour = () => {
    setFlag1(false);
    setFlag2(false);
    setFlag3(false);
    setFlag4(true);
    window.scrollTo(0, document.body.scrollHeight - 800);
  };
  return (
    <>
      <Box
        width="100%"
        height="50px"
        borderBottom="0.1px outset"
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        sx={{ background: "#ffffff" }}>
        <img
          src={logo2}
          style={{ width: "45px", height: "45px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <Box width="27%" />
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography color="#969393">Back to LinkedIn?</Typography>
        </Link>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="14px"
        sx={{ background: "#ffffff" }}>
        <Typography
          fontSize="21px"
          fontWeight="600"
          mt="30px"
          textAlign="center">
          Join the millions of LinkedIn members using Premium to get ahead.
        </Typography>
        <Typography fontSize="17px" textAlign="center">
          Thousands of members in Bengaluru use Premium
        </Typography>
        <Typography fontSize="17px" mb="30px" textAlign="center">
          Start your free 1-month trial today. Cancel anytime. We'll send you a
          reminder 7 days before your trial ends.
        </Typography>
      </Box>
      <Grid container mt="40px">
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          p="0"
          display="flex"
          justifyContent="center">
          <Box
            onClick={handleChangeBoxOne}
            sx={{
              width: "100%",
              background: "white",
              margin: "15px",
              color: "#9b9b9b",
              boxShadow: "5px 5px 10px 2px #888888",
              cursor: "pointer",
            }}>
            <Typography fontSize="27px" ml="23px" color="#666666" mt="17px">
              Career
            </Typography>
            <Typography fontSize="18px" ml="23px">
              Get hired and get ahead
            </Typography>
            <hr style={{ width: "97%" }} />
            <ul>
              <li>Stand out and get in touch with hiring managers</li>
              <li>See how you compare to other applicants</li>
              <li>Learn new skills to advance your career</li>
            </ul>
            <Button
              sx={{
                border: "1px solid",
                borderRadius: "25px",
                width: "90%",
                margin: "inherit",
                mt: "57px",
              }}>
              Learn More
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          p="0"
          display="flex"
          justifyContent="center">
          <Box
            onClick={handleChangeBoxTwo}
            sx={{
              width: "100%",
              background: "white",
              margin: "15px",
              color: "#9b9b9b",
              boxShadow: "5px 5px 10px 2px #888888",
              cursor: "pointer",
            }}>
            <Typography mt="17px" fontSize="27px" ml="23px" color="#666666">
              Business
            </Typography>
            <Typography fontSize="18px" ml="23px">
              Grow and nurture your network
            </Typography>
            <hr style={{ width: "97%" }} />
            <ul>
              <li>Find and contact the right professional people</li>
              <li>Promote and grow your professional business</li>
              <li>Learn new skills to enhance your professional brand</li>
            </ul>
            <Button
              sx={{
                border: "1px solid",
                borderRadius: "25px",
                width: "90%",
                margin: "inherit",
                mt: "57px",
              }}>
              Learn More
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          p="0"
          display="flex"
          justifyContent="center"
          ml="0">
          <Box
            onClick={handleChangeBoxThree}
            sx={{
              width: "100%",
              background: "white",
              margin: "15px",
              color: "#9b9b9b",
              boxShadow: "5px 5px 10px 2px #888888",
              cursor: "pointer",
            }}>
            <Typography mt="17px" fontSize="27px" ml="23px" color="#666666">
              Sales Navigator
            </Typography>
            <Typography fontSize="18px" ml="23px">
              Unlock sales opportunities
            </Typography>
            <hr style={{ width: "97%" }} />
            <ul>
              <li>Find leads and accounts in your target market</li>
              <li>Get real-time insights for warm outreach</li>
              <li>Build trusted relationships with customers and prospects</li>
            </ul>
            <Button
              sx={{
                border: "1px solid",
                borderRadius: "25px",
                width: "90%",
                margin: "inherit",
                mt: "57px",
              }}>
              Learn More
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          p="0"
          display="flex"
          justifyContent="center">
          <Box
            onClick={handleChangeBoxFour}
            sx={{
              width: "100%",
              background: "white",
              margin: "15px",
              color: "#9b9b9b",
              boxShadow: "5px 5px 10px 2px #888888",
              cursor: "pointer",
            }}>
            <Typography mt="17px" fontSize="27px" ml="23px" color="#666666">
              Recruiter Lite
            </Typography>
            <Typography fontSize="18px" ml="23px">
              Find and hire talent
            </Typography>
            <hr style={{ width: "97%" }} />
            <ul>
              <li>Find great relationships with candidates, faster</li>
              <li>Contact top Recruiter lite talent directly</li>
              <li>Build relationships with prospective hires</li>
            </ul>
            <Button
              sx={{
                border: "1px solid",
                borderRadius: "25px",
                width: "90%",
                margin: "inherit",
                mt: "57px",
              }}>
              Learn More
            </Button>
          </Box>
        </Grid>
      </Grid>
      {flag1 && (
        <Box
          width="100%"
          mt="30px"
          sx={{
            display: "flex",
            background: "white",
            "@media(max-width:826px)": {
              width: "100%",
              flexDirection: "column",
            },
          }}>
          <Box
            width="50%"
            paddingLeft="100px"
            pt="110px"
            sx={{
              "@media(max-width:826px)": {
                width: "95%",
                pl: "30px",
                borderRadius: 0,
                pb: "60px",
              },
              borderRadius: "0 50% 50% 0",
              background: "#ecf0ea",
            }}>
            <Typography color="#587598" fontSize="28px" fontWeight="600">
              Career
            </Typography>
            <Typography color="#587598" fontSize="112px" fontWeight="800">
              2.6x
            </Typography>
            <Typography width="70%" fontWeight="600" fontSize="21px">
              Candidates with Premium Career get hired an average of 2.6x as
              fast
            </Typography>
            <Button
              sx={{
                background: "#1976d2",
                mt: "40px",
                color: "white",
                p: "15px",
                borderRadius: "25px",
              }}>
              Start my free month
            </Button>
            <Typography mt="25px">
              Price: <del>₹1,567.79</del>* 1-month free trial
            </Typography>
            <Typography width="63%" color="#999999" fontSize="14px">
              After your free month, pay as little as ₹1,567.79* / month after.
              Cancel anytime. We'll remind you 7 days before your trial ends.
            </Typography>
          </Box>
          <Box
            width="50%"
            ml="40px"
            sx={{ "@media(max-width:826px)": { width: "87%" } }}>
            <Typography className="headingsection">
              Find and contact anyone
            </Typography>
            <Typography className="subHeadingsection">
              Find and contact the right people to grow your network and see
              who's viewed your profile
            </Typography>
            <ul className="listSection">
              <li>5 InMails per month</li>
              <li>See Who's Viewed Your Profile from the last 90 days</li>
              <li>Open Profile</li>
            </ul>
            <Typography className="headingsection">
              Exclusive insights to get ahead
            </Typography>
            <Typography className="subHeadingsection">
              Stay informed about companies of interest, see how you compare to
              other job applicants, and more
            </Typography>
            <ul className="listSection">
              <li>Job and applicant insights</li>
              <li>Top Applicant Job recommendations</li>
              <li>Company insights</li>
              <li>Resume insights</li>
            </ul>
            <Typography className="headingsection">
              Stay up-to-date on the latest skills
            </Typography>
            <Typography className="subHeadingsection">
              Grow and learn new skills to advance your career and professional
              brand
            </Typography>
            <ul className="listSection">
              <li>16,000+ LinkedIn Learning courses</li>
              <li style={{ marginBottom: "60px" }}>
                Full access to Interview Preparation tools
              </li>
            </ul>
          </Box>
        </Box>
      )}
      {flag2 && (
        <Box
          width="100%"
          mt="30px"
          sx={{
            display: "flex",
            background: "white",
            "@media(max-width:826px)": {
              width: "100%",
              flexDirection: "column",
            },
          }}>
          <Box
            width="50%"
            paddingLeft="100px"
            pt="110px"
            sx={{
              "@media(max-width:826px)": {
                width: "95%",
                pl: "30px",
                borderRadius: 0,
                pb: "60px",
              },
              borderRadius: "0 50% 50% 0",
              background: "#f2eef2",
            }}>
            <Typography color="#80597e" fontSize="28px" fontWeight="600">
              Business
            </Typography>
            <Typography color="#80597e" fontSize="112px" fontWeight="800">
              4x
            </Typography>
            <Typography width="70%" fontWeight="600" fontSize="21px">
              Premium members get an average of 4x more profile views
            </Typography>
            <Button
              sx={{
                background: "#1976d2",
                mt: "40px",
                color: "white",
                p: "15px",
                borderRadius: "25px",
              }}>
              Start my free month
            </Button>
            <Typography mt="25px">
              Price: <del>₹1,567.79</del>* 1-month free trial
            </Typography>
            <Typography width="63%" color="#999999" fontSize="14px">
              After your free month, pay as little as ₹1,567.79* / month after.
              Cancel anytime. We'll remind you 7 days before your trial ends.
            </Typography>
          </Box>
          <Box
            width="50%"
            ml="40px"
            sx={{ "@media(max-width:826px)": { width: "87%" } }}>
            <Typography className="headingsection">
              Find and contact anyone
            </Typography>
            <Typography className="subHeadingsection">
              Find and contact the right people to grow your network and see
              who's viewed your profile
            </Typography>
            <ul className="listSection">
              <li>5 InMails per month</li>
              <li>See Who's Viewed Your Profile from the last 90 days</li>
              <li>Open Profile</li>
            </ul>
            <Typography className="headingsection">
              Exclusive insights to get ahead
            </Typography>
            <Typography className="subHeadingsection">
              Stay informed about companies of interest, see how you compare to
              other job applicants, and more
            </Typography>
            <ul className="listSection">
              <li>Job and applicant insights</li>
              <li>Top Applicant Job recommendations</li>
              <li>Company insights</li>
              <li>Resume insights</li>
            </ul>
            <Typography className="headingsection">
              Stay up-to-date on the latest skills
            </Typography>
            <Typography className="subHeadingsection">
              Grow and learn new skills to advance your career and professional
              brand
            </Typography>
            <ul className="listSection">
              <li>16,000+ LinkedIn Learning courses</li>
              <li style={{ marginBottom: "60px" }}>
                Full access to Interview Preparation tools
              </li>
            </ul>
          </Box>
        </Box>
      )}
      {flag3 && (
        <Box
          width="100%"
          mt="30px"
          sx={{
            display: "flex",
            background: "white",
            "@media(max-width:826px)": {
              width: "100%",
              flexDirection: "column",
            },
          }}>
          <Box
            width="50%"
            paddingLeft="100px"
            pt="110px"
            sx={{
              "@media(max-width:826px)": {
                width: "95%",
                pl: "30px",
                borderRadius: 0,
                pb: "60px",
              },
              borderRadius: "0 50% 50% 0",
              background: "#f3eeec",
            }}>
            <Typography color="#8f5849" fontSize="28px" fontWeight="600">
              Sales Navigator Core
            </Typography>
            <Typography color="#8f5849" fontSize="112px" fontWeight="800">
              3.8x
            </Typography>
            <Typography width="70%" fontWeight="600" fontSize="21px">
              Members with Sales Navigator are connected to 3.8x more
              decision-makers
            </Typography>
            <Button
              sx={{
                background: "#1976d2",
                mt: "40px",
                color: "white",
                p: "15px",
                borderRadius: "25px",
              }}>
              Start my free month
            </Button>
            <Typography mt="25px">
              Price: <del>₹1,567.79</del>* 1-month free trial
            </Typography>
            <Typography width="63%" color="#999999" fontSize="14px">
              After your free month, pay as little as ₹1,567.79* / month after.
              Cancel anytime. We'll remind you 7 days before your trial ends.
            </Typography>
          </Box>
          <Box
            width="50%"
            ml="40px"
            sx={{ "@media(max-width:826px)": { width: "87%" } }}>
            <Typography className="headingsection">
              Find and contact anyone
            </Typography>
            <Typography className="subHeadingsection">
              Find and contact the right people to grow your network and see
              who's viewed your profile
            </Typography>
            <ul className="listSection">
              <li>5 InMails per month</li>
              <li>See Who's Viewed Your Profile from the last 90 days</li>
              <li>Open Profile</li>
            </ul>
            <Typography className="headingsection">
              Exclusive insights to get ahead
            </Typography>
            <Typography className="subHeadingsection">
              Stay informed about companies of interest, see how you compare to
              other job applicants, and more
            </Typography>
            <ul className="listSection">
              <li>Job and applicant insights</li>
              <li>Top Applicant Job recommendations</li>
              <li>Company insights</li>
              <li>Resume insights</li>
            </ul>
            <Typography className="headingsection">
              Stay up-to-date on the latest skills
            </Typography>
            <Typography className="subHeadingsection">
              Grow and learn new skills to advance your career and professional
              brand
            </Typography>
            <ul className="listSection">
              <li>16,000+ LinkedIn Learning courses</li>
              <li style={{ marginBottom: "60px" }}>
                Full access to Interview Preparation tools
              </li>
            </ul>
          </Box>
        </Box>
      )}
      {flag4 && (
        <Box
          width="100%"
          mt="30px"
          sx={{
            display: "flex",
            background: "white",
            "@media(max-width:826px)": {
              width: "100%",
              flexDirection: "column",
            },
          }}>
          <Box
            width="50%"
            paddingLeft="100px"
            pt="110px"
            sx={{
              "@media(max-width:826px)": {
                width: "95%",
                pl: "30px",
                borderRadius: 0,
                pb: "60px",
              },
              borderRadius: "0 50% 50% 0",
              background: "#ecf0ea",
            }}>
            <Typography color="#44712e" fontSize="28px" fontWeight="600">
              Recruiter Lite
            </Typography>
            <Typography color="#44712e" fontSize="112px" fontWeight="800">
              2.6x
            </Typography>
            <Typography width="70%" fontWeight="600" fontSize="21px">
              Join the thousands of businesses that are hiring with Recruiter
              Lite
            </Typography>
            <Button
              sx={{
                background: "#1976d2",
                mt: "40px",
                color: "white",
                p: "15px",
                borderRadius: "25px",
              }}>
              Start my free month
            </Button>
            <Typography mt="25px">
              Price: <del>₹1,567.79</del>* 1-month free trial
            </Typography>
            <Typography width="63%" color="#999999" fontSize="14px">
              After your free month, pay as little as ₹1,567.79* / month after.
              Cancel anytime. We'll remind you 7 days before your trial ends.
            </Typography>
          </Box>
          <Box
            width="50%"
            ml="40px"
            sx={{ "@media(max-width:826px)": { width: "87%" } }}>
            <Typography className="headingsection">
              Find and contact anyone
            </Typography>
            <Typography className="subHeadingsection">
              Find and contact the right people to grow your network and see
              who's viewed your profile
            </Typography>
            <ul className="listSection">
              <li>5 InMails per month</li>
              <li>See Who's Viewed Your Profile from the last 90 days</li>
              <li>Open Profile</li>
            </ul>
            <Typography className="headingsection">
              Exclusive insights to get ahead
            </Typography>
            <Typography className="subHeadingsection">
              Stay informed about companies of interest, see how you compare to
              other job applicants, and more
            </Typography>
            <ul className="listSection">
              <li>Job and applicant insights</li>
              <li>Top Applicant Job recommendations</li>
              <li>Company insights</li>
              <li>Resume insights</li>
            </ul>
            <Typography className="headingsection">
              Stay up-to-date on the latest skills
            </Typography>
            <Typography className="subHeadingsection">
              Grow and learn new skills to advance your career and professional
              brand
            </Typography>
            <ul className="listSection">
              <li>16,000+ LinkedIn Learning courses</li>
              <li style={{ marginBottom: "60px" }}>
                Full access to Interview Preparation tools
              </li>
            </ul>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Premium;
