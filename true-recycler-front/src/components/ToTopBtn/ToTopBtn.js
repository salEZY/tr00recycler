import React, { useState } from "react";
import { css } from "emotion";
import { Transition } from "react-spring/renderprops";

import "./ToTopBtn.css";

const ToTopButton = () => {
  const [show, setShow] = useState("none");
  const [btn, setBtn] = useState(false);

  const style = css`
    display: ${show};
  `;

  const btnHandler = (display, btn) => {
    setShow(display);
    setBtn(btn);
  };

  window.onscroll = () => {
    window.scrollY > 700
      ? btnHandler("block", true)
      : btnHandler("none", false);
  };

  return (
    <Transition
      items={btn}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      trail={250}
    >
      {(btn) =>
        btn &&
        ((props) => (
          <div style={props} className="error">
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
          </div>
        ))
      }
    </Transition>
  );
};

export default ToTopButton;
