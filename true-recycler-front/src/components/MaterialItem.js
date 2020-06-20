import React from "react";

import "./MaterialItem.css";
import { iconPick } from "../util/iconPicker";

const MaterialItem = ({ name, type }) => {
  let icon = iconPick(type);

  return (
    <div className="mat-item">
      <p>Name: {name}</p>
      <p>
        Type: <i className={icon} aria-hidden="true"></i>
      </p>
    </div>
  );
};

export default MaterialItem;
