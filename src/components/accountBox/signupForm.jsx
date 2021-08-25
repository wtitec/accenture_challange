import React, { useContext, useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  
  const [name, setUsername] = useState("");
  const [email, setUserEmail] = useState("");
  const [dev, setUserDev] = useState("");
  const [pass1, setPassword1] = useState("");
  const [pass2, setPassword2] = useState("");

  const inputName= useRef();
  const inputEmail = useRef();
  const inputDev = useRef();
  const inputPass1 = useRef();
  const inputPass2 = useRef();

  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (name === "") {
      return inputName.current.focus();
    } else if (email === "") {
      return inputEmail.current.focus();
    } else if (dev === "") {
      return inputDev.current.focus();
    } else if (pass1 === "" ) {
      return inputPass1.current.focus();
    } else if (pass2 === "") {
      return inputPass2.current.focus();
    } else if (pass1 !== pass2) {
      alert("Divergent passwords!")
      return inputPass1.current.focus();
    }
    
    let token = sessionStorage.getItem("token")
    let requestOptions = {
      method: "POST",
      headers: { 'Authorization': `Bearer ${token}`,
      'Content-Type':'application/json' },
      body: JSON.stringify({
        "name":name,
        "email":email,
        "dev": dev,
        "password": pass1
      }),
    };
    // const url = "https://49cdc2ddle.execute-api.sa-east-1.amazonaws.com/v1"
    const url = "http://api-antares.sa-east-1.elasticbeanstalk.com"
    // const url = "http://93.188.161.212:6001"
    // const url = "http://192.168.15.101:6001"

    const data = await fetch(`${url}/adduser`, requestOptions)
      .then(response => response.json())
      .then(data => data ? data : false)
      .catch(() => {
         "error"
      });

      if ('error' in data) {
        alert("Email exist!")
        return inputEmail.current.focus();
      } else {
        alert("Success!")
        history.push("/")
      }

  }
  

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit}>
        <FormItems>
          <Input ref={inputName}  type="text" placeholder="Full Name" onInput={e => setUsername(e.target.value)} />
          <Input ref={inputEmail} type="email" placeholder="Email" onInput={e => setUserEmail(e.target.value)} />
          <Input ref={inputDev} type="text" placeholder="Status Developer" onInput={e => setUserDev(e.target.value)} />
          <Input ref={inputPass1} type="password" placeholder="Password" onInput={e => setPassword1(e.target.value)} />
          <Input ref={inputPass2} type="password" placeholder="Confirm Password" onInput={e => setPassword2(e.target.value)} />
        </FormItems>
        <Marginer direction="vertical" margin={10} />
        <SubmitButton type="submit">Signup</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={5} />
      <MutedText>
        Already have an account?
        <BoldLink onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedText>
    </BoxContainer>
  );
}
