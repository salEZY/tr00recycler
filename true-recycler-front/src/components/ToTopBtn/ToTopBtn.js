import React, { useState } from "react";
import { css } from "emotion";

import "./ToTopBtn.css";

const ToTopButton = () => {
  const [show, setShow] = useState("none");

  const style = css`
    display: ${show};
  `;

  const btnHandler = (display) => {
    setShow(display);
  };

  window.onscroll = () => {
    window.scrollY > 700 ? btnHandler("block") : btnHandler("none");
  };

  return (
    <span
      id="to-top-btn"
      className={style}
      onClick={() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }}
    >
      <i className="fa fa-angle-up" aria-hidden="true"></i>
    </span>
  );
};

export default ToTopButton;
