import React, { useState } from "react";
import axios from "axios";
import { Transition } from "react-spring/renderprops";

import "./Form.css";

const Form = ({ name, register }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // let user = { email, password };
  // if (name === "register") user = { ...user, repeatPassword };
  // axios.post(`/api/auth/${name}`, user).then((res) => {});

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  };

  const errorMessageHandler = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg("");
    }, 4000);
    clearForm();
    return;
  };

  const loginHandler = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMsg("Email and/or password missing!");
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
      clearForm();
      return;
    }

    if (password.length < 6) {
      errorMessageHandler("Password should be atleast 6 characters");
    }

    console.log(email, password);
    clearForm();
  };

  const registerHandler = (e) => {
    e.preventDefault();

    if (email === "" || password === "" || repeatPassword === "") {
      setErrorMsg("Email and/or passwords missing!");
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
      clearForm();
      return;
    }

    if (password !== repeatPassword || password.length < 6) {
      errorMessageHandler("Passwords do not match or too short!");
    }

    console.log(email, password, repeatPassword);
    clearForm();
  };
  return (
    <form method="POST">
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
      <input
        className="form-input"
        type="password"
        name="password"
        placeholder="Password(atleast 6 characters.)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      ></input>
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
          <button className="auth" onClick={registerHandler}>
            Sign Up <i className="fa fa-user-plus" aria-hidden="true"></i>
          </button>
        </>
      ) : (
        <button className="auth" onClick={loginHandler}>
          Login <i className="fa fa-sign-in" aria-hidden="true"></i>
        </button>
      )}
      <Transition
        items={errorMsg}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
        trail={200}
      >
        {(errorMsg) =>
          errorMsg &&
          ((props) => (
            <div style={props} className="error">
              {errorMsg} <i className="fas fa-exclamation-circle"></i>
            </div>
          ))
        }
      </Transition>
    </form>
  );
};

export default Form;
