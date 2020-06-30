import React from "react";

import "./Form.css";

const Form = ({ name, register, onSubmiHandler }) => {
  return (
    <form method="POST" onSubmit={onSubmiHandler}>
      <h3>{name}</h3>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="form-input"
        required
      ></input>
      <input
        className="form-input"
        type="password"
        name="password"
        placeholder="Password"
        required
      ></input>
      {register ? (
        <>
          <input
            className="form-input"
            type="password"
            name="repeatPassword"
            placeholder="Repeat password"
            required
          ></input>
          <button className="auth">
            Sign Up <i class="fa fa-user-plus" aria-hidden="true"></i>
          </button>
        </>
      ) : (
        <button className="auth">
          Login <i class="fa fa-sign-in" aria-hidden="true"></i>
        </button>
      )}
    </form>
  );
};

export default Form;
