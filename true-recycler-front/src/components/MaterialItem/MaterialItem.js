import React from "react";

import "./MaterialItem.css";
import { iconPick } from "../../util/iconPicker";

const MaterialItem = ({ name, type }) => {
  let icon = iconPick(type);

  return (
    <div className="mat-item" title={`${name} - ${type}`}>
      <h4>{name}</h4>
      <p>
        Type: <i className={icon} aria-hidden="true" title={type}></i>
      </p>
    </div>
  );
};

export default MaterialItem;
