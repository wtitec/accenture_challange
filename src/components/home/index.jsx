import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const TitleContainer = styled.p`
  display: flex;
  flex-direction: column;
`;

const LinkEnter = styled.a`
  display: flex;
  flex-direction: column;
  color:　#fff;
  cursor: pointer;
`;

export default class Profile extends Component {

  render() {
    return (
      <Container>
        <TitleContainer>
          Accenture Challange
        </TitleContainer>
        <LinkEnter>
          <Link to="/login" style={{ textDecoration: "none" }}>Enter now!</Link>
        </LinkEnter>
      </Container>


    )
  }
}