import React from "react";
import { Transition } from "react-spring/renderprops";

import "./Message.css";

const Message = ({ msg, danger, id }) => {
  return (
    <Transition
      items={msg}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      trail={300}
    >
      {(msg) =>
        msg &&
        ((props) => (
          <p style={props} className={danger ? "error" : "success"} id={id}>
            {danger ? (
              <i className="fas fa-exclamation-circle"></i>
            ) : (
              <i className="fa fa-check-square-o" aria-hidden="true"></i>
            )}{" "}
            {msg}
          </p>
        ))
      }
    </Transition>
  );
};

export default Message;
