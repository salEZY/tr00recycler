import React, { useState, useContext } from "react";
import axios from "axios";

import Message from "../Message/Message";
import { messageHandler } from "../../util/messageHandler";
import { Auth } from "../../util/auth-context";
import "./Form.css";

const Form = ({ name, register, hide }) => {
  const auth = useContext(Auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [repeatPasswordMsg, setRepeatPasswordMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  };

  const loginHandler = (e) => {
    e.preventDefault();

    if (!!!email && !!!password) {
      messageHandler(setEmailMsg, "Email is missing!", clearForm);
      messageHandler(setPasswordMsg, "Password is missing!", clearForm);
      return;
    }
    if (!!!email) {
      messageHandler(setEmailMsg, "Email is missing!", clearForm);
      return;
    }
    if (!!!password) {
      messageHandler(setPasswordMsg, "Password is missing!", clearForm);
      return;
    }

    if (password.length < 6) {
      messageHandler(
        setPasswordMsg,
        "Password should be atleast 6 characters",
        clearForm
      );
      return;
    }

    axios
      .post(`/api/auth/login`, { email, password })
      .then((res) => {
        auth.login(res.data.user, res.data.token);
        hide();
      })
      .catch((error) => {
        messageHandler(setErrorMsg, error.response.data.message, clearForm);
        return;
      });

    clearForm();
  };

  const registerHandler = (e) => {
    e.preventDefault();

    if (!!!email && !!!password && !!!repeatPassword) {
      messageHandler(setEmailMsg, "Email is missing!", clearForm);
      messageHandler(setPasswordMsg, "Password is missing!", clearForm);
      messageHandler(
        setRepeatPasswordMsg,
        "Repeated password is missing!",
        clearForm
      );
      return;
    }
    if (!!!email) {
      messageHandler(setEmailMsg, "Email is missing!", clearForm);
      return;
    }
    if (!!!password) {
      messageHandler(setPasswordMsg, "Password is missing!", clearForm);
      return;
    }
    if (!!!repeatPassword) {
      messageHandler(
        setRepeatPasswordMsg,
        "Repeated password is missing!",
        clearForm
      );
      return;
    }

    if (password !== repeatPassword || password.length < 6) {
      messageHandler(
        setErrorMsg,
        "Passwords do not match or too short!",
        clearForm
      );
    }

    axios
      .post(`/api/auth/register`, { email, password, repeatPassword })
      .then((res) => {
        auth.login(res.data.user.uid, res.data.token, res.data.user.email);
        hide();
      })
      .catch((error) => {
        console.log(error);
        messageHandler(setErrorMsg, error.response.data.message, clearForm);
        return;
      });
    clearForm();
  };

  return (
    <form method="POST" className="auth-form">
      <h3>{name.toUpperCase()}</h3>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      ></input>
      <Message msg={emailMsg} danger={true} />
      <input
        className="form-input"
        type="password"
        name="password"
        placeholder="Password(atleast 6 characters.)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      ></input>
      <Message msg={passwordMsg} danger={true} />
      {register ? (
        <>
          <input
            className="form-input"
            type="password"
            name="repeatPassword"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          ></input>
          <Message msg={repeatPasswordMsg} danger={true} />
          <button className="auth reg" onClick={registerHandler}>
            <i className="fa fa-user-plus" aria-hidden="true"></i> Sign Up
          </button>
        </>
      ) : (
        <button className="auth reg" onClick={loginHandler}>
          <i className="fa fa-sign-in" aria-hidden="true"></i> Login
        </button>
      )}
      <Message msg={errorMsg} danger={true} />
    </form>
  );
};

export default Form;
