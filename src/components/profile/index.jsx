import React, { useState, Component } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ProfileView } from "./ProfileView";
import { AccountContext } from "./accountContext";
import { Link } from 'react-router-dom';

const BoxContainer = styled.div`
  width: 280px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: rgb(165, 85, 253);
  background: linear-gradient(
    58deg,
    rgba(165, 85, 253, 1) 20%,
    rgba(90, 43, 141, 1) 100%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

const LogoutButton = styled.div`
  width: 25px;
    height: 25px;
    position: absolute;
    display: flex;
    z-index: 1;
    top: 15px;
    right: 20px;
    background: rgba(255, 255, 255,0.5);
    display: block;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
`;





const ProtectedRoute = ({ isEnabled }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const logout = ()=>{
    sessionStorage.clear();
  }

  const contextValue = { switchToSignup, switchToSignin };

  return isEnabled === true ?
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>

        <Link to="/login" style={{ textDecoration: "none" }}><LogoutButton onClick={logout}>X</LogoutButton></Link>
          

          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          <HeaderContainer>
            <HeaderText>Profile</HeaderText>
            <SmallText>Information</SmallText>
          </HeaderContainer>
        </TopContainer>
        <InnerContainer>
          <ProfileView />
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
    : ""
};

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageview: false,
      data: {}
    }
  }

  async checkAuth() {
    let token = sessionStorage.getItem("token")
    let requestOptions = {
      method: "POST",
      headers: { 'Authorization': `Bearer ${token}` },
    };
    const url = "https://49cdc2ddle.execute-api.sa-east-1.amazonaws.com/v1"
    // const url = "http://api-antares.sa-east-1.elasticbeanstalk.com"
    // const url = "http://93.188.161.212:6001"
    // const url = "http://192.168.15.101:6001"

    let auth = await fetch(`${url}/token-verify`, requestOptions)
      .then(response => response.json())
      .then(data => data.authorization)
      .catch(() => {
        return "error"
      });

    if (auth === "error") {
      alert("Server error!")
    } else if (auth === undefined) {
      alert("Email or password is invalid! Try again.")
    } else {
      this.setState({ pageview: auth })
    }



    if (auth !== true) {
      window.location.replace("/login");
    }
  }

  componentDidMount() {
    this.checkAuth();
  }

  render() {
    const { pageview } = this.state
    return (
      <ProtectedRoute isEnabled={pageview} />


    )
  }
}