import React from "react";

import { iconPick } from "../../util/iconPicker";

import "./Button.css";

const Button = ({ name, onClickHandler }) => {
  let icon = iconPick(name);

  return (
    <>
      <button className="btn" onClick={() => onClickHandler(name)} title={name}>
        <i className={icon} aria-hidden="true"></i> {name}
      </button>
    </>
  );
};

export default Button;
