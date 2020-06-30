import React from "react";

import "./Form.css";

const Form = ({ name, register, onSubmiHandler }) => {
  return (
    <form method="POST" onSubmit={onSubmiHandler}>
      <h3>{name}</h3>
      <input type="email" name="email" placeholder="Email" required></input>
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
      ></input>
      {register ? (
        <>
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat password"
            required
          ></input>
          <button>Sign Up</button>
        </>
      ) : (
        <button>Login</button>
      )}
    </form>
  );
};

export default Form;
