import React, { useState } from "react";
import styled from "styled-components";
import {
  BoxContainer,
} from "../libs/common";
// import { AccountContext } from "./accountContext";

const Dados = styled.div`
  text-align: center;
`;

const DadosItem = styled.span`
  display: flex;
  flex-direction: column;
`;

const SmallText = styled.span`
  font-size: 12px;
`;

const AvatarImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100px;
  /* position: relative;
  top: -100px; */
`;

export function ProfileView(props) {
  // const { switchToSignup } = useContext(AccountContext);

  const [data] = useState(JSON.parse(sessionStorage.getItem("datauser")));


  return (
    <BoxContainer>
      <Dados>
        <AvatarImg src={data.avatar} />
        <DadosItem>{data.name}</DadosItem>
        <DadosItem>
          <SmallText>{data.email}</SmallText>
        </DadosItem>
        <DadosItem>
          <SmallText>{data.dev}</SmallText>
        </DadosItem>
      </Dados>
    </BoxContainer>
  );
}
