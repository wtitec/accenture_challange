import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import Profile from "./components/profile/index";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ba79ff;
`;

function SingInUp() {
  return (
    <AccountBox />
  );
}

function About() {
  return <h2>About</h2>;
}

// function Users() {
//   return <h2>Users</h2>;
// }

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null
    }
  }


  render() {
    return (
      <AppContainer>
        <Router>
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/profile">
              <Profile />
              </Route>
            <Route exact path="/login">
              <SingInUp />
            </Route>
          </Switch>
        </Router>
      </AppContainer>

    );
  }
}