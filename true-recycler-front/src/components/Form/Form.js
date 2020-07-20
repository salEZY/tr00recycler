import React, { useState } from "react";
import axios from "axios";
import { Transition } from "react-spring/renderprops";

import "./Form.css";

const Form = ({ name, register }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  };

  const messageHandler = (func, msg) => {
    func(msg);
    setTimeout(() => {
      func("");
    }, 1000);
    clearForm();
  };

  const loginHandler = (e) => {
    e.preventDefault();

    if (!!!email || !!!password) {
      messageHandler(setErrorMsg, "Email and/or password missing!");
      return;
    }

    if (password.length < 6) {
      messageHandler(setErrorMsg, "Password should be atleast 6 characters");
      return;
    }

    axios
      .post(`/api/auth/login`, { email, password })
      .then((res) => {
        console.log(res.data.token);
        messageHandler(setSuccess, "Success!");
      })
      .catch((error) => {
        messageHandler(setErrorMsg, error.response.data.message);
        return;
      });
    clearForm();
  };

  const registerHandler = (e) => {
    e.preventDefault();

    if (!!!email || !!!password || !!!repeatPassword) {
      messageHandler(setErrorMsg, "Email and/or passwords missing!");
      return;
    }

    if (password !== repeatPassword || password.length < 6) {
      messageHandler(setErrorMsg, "Passwords do not match or too short!");
    }

    axios
      .post(`/api/auth/register`, { email, password, repeatPassword })
      .then((res) => {
        console.log(res.data.token);
        messageHandler(setSuccess, "You have successfully registered!");
      })
      .catch((error) => {
        messageHandler(setErrorMsg, error.response.data.message);
        return;
      });
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
      <Transition
        items={success}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
        trail={200}
      >
        {(success) =>
          success &&
          ((props) => (
            <div style={props} className="success">
              {success}{" "}
              <i className="fa fa-check-square-o" aria-hidden="true"></i>
            </div>
          ))
        }
      </Transition>
    </form>
  );
};

export default Form;
