import React, { useContext, useState, useRef } from "react";
import { Link, useHistory } from 'react-router-dom';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  FormItems,
  Input,
  MutedLink,
  MutedText,
  SubmitButton,
} from "../libs/common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";


export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const inputUser = useRef();
  const inputPass = useRef();

  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (username === "") {
      return inputUser.current.focus();
    } else if (password === "") {
      return inputPass.current.focus();
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64') }
    };
    const url = "https://49cdc2ddle.execute-api.sa-east-1.amazonaws.com/v1"
    // const url = "http://api-antares.sa-east-1.elasticbeanstalk.com"
    // const url = "http://93.188.161.212:6001"

    const data = await fetch(`${url}/login`, requestOptions)
      .then(response => response.json())
      .then(data => data ? data : false)
      .catch(() => {
        return "error"
      });

    if ('token' in data) {
      if (data.token === "error") {
        alert("Server error!")
        return inputUser.current.focus();
      } else if (data.token === undefined) {
        alert("Email or password is invalid! Try again.")
        return inputUser.current.focus();
      }
    }

    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("datauser", JSON.stringify({
      name: data.name,
      email: data.email,
      dev: data.dev,
      avatar: data.avatar
    }));
    history.push("/profile")

  }

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit}>
        <FormItems>
          <Input ref={inputUser} name="username" type="email" placeholder="Email" onInput={e => setUsername(e.target.value)} />
          <Input ref={inputPass} name="password" type="password" placeholder="Password" onInput={e => setPassword(e.target.value)} />
        </FormItems>
        <Marginer direction="vertical" margin={20} />
        <MutedLink><Link to="/profile" style={{ textDecoration: "none" }}><MutedText>Forget your password?</MutedText></Link></MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit">Signin</SubmitButton>
      </FormContainer>

      <Marginer direction="vertical" margin="1em" />
      <MutedText>
        Don't have an accoun?{" "}
        <BoldLink onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedText>
    </BoxContainer>
  );
}
