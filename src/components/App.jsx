import "../styles/App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Forgot from "./Forgot";
import NavBar from "./NavBar";
import Home from "./home/Home";
import Premium from "./Premium";
import Search from "./Search";
import UserDetail from "./UserDetail";
import Details from "./Details";
import Groups from "./Groups";
import { useStateProvider } from "../utils/StateProvider";
import { useEffect } from "react";
import Network from "./Network";
import Message from "./Message";
import Notification from "./Notification";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [{ token, ownPost }, dispatch] = useStateProvider();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const userName = localStorage.getItem("userName");

    if (jwtToken && userName) {
      dispatch({ type: "SET_NAME", payload: userName });
      dispatch({ type: "SET_TOKEN", payload: jwtToken });

      const groupData = JSON.parse(localStorage.getItem("groupData")) || [];
      dispatch({ type: "SET_GROUP", payload: groupData });

      const ownPostData = JSON.parse(localStorage.getItem("ownPostData")) || [];
      dispatch({ type: "SET_OWNPOST", payload: ownPostData });

      try {
        const savedPosts = localStorage.getItem("posts");
        if (savedPosts) {
          const parsedPosts = JSON.parse(savedPosts);
          dispatch({ type: "SET_POST", payload: parsedPosts });
        }
      } catch (error) {
        console.error("Error parsing posts data:", error);
      }
    } else if (location.pathname === "/signup") {
      navigate("/signup");
    } else if (location.pathname === "/forgot") {
      navigate("/forgot");
    } else {
      navigate("/signin");
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    console.log(ownPost);
  }, [ownPost]);
  return (
    <>
      {location.pathname === "/signup" ? (
        <SignUp />
      ) : location.pathname === "/signin" ? (
        <SignIn />
      ) : location.pathname === "/forgot" ? (
        <Forgot />
      ) : location.pathname === "/premium" ? (
        <Premium />
      ) : (
        <>
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/user" element={<UserDetail />} />
            <Route path="/detail" element={<Details />} />
            <Route path="/group" element={<Groups />} />
            <Route path="/network" element={<Network />} />
            <Route path="/message" element={<Message />} />
            <Route path="/notification" element={<Notification />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
