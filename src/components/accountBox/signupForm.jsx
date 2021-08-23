import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  FormItems,
  Input,
  MutedText,
  SubmitButton,
} from "../libs/common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import axios from 'axios';

const handleSubmit = (event) => {
  event.preventDefault();
  
  axios.get('http://192.168.15.101:6001/api-information').then( res => {
    alert(JSON.stringify(res.data));
  });
}

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit}>
        <FormItems>
          <Input type="text" placeholder="Full Name" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm Password" />
        </FormItems>
        <Marginer direction="vertical" margin={20} />
        <SubmitButton type="submit">Signup</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedText>
        Already have an account?
        <BoldLink onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedText>
    </BoxContainer>
  );
}
