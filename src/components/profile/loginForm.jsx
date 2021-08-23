import React, { useContext, useState } from "react";
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

  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault()
  
    const requestOptions = {
      method:'POST', 
      headers: {'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')}
    };
    const token = await fetch('http://192.168.15.101:6001/login', requestOptions)
      .then(response => response.json())
      .then(data => data ? data.token : false);

      sessionStorage.setItem( "token", token );

      history.push("/profile")
    
  }
  
  return (
    <BoxContainer>
      <p>WILLIAN TAKASHI ISHIDA</p>
      <span>abc</span>
    </BoxContainer>
  );
}
