import React from "react";
import axios from "axios";
import { iconPick } from "../../util/iconPicker";

import "./Button.css";

const Button = ({
  name,
  setMaterialByType,
  setFilteredMaterial,
  setType,
  setLoaded,
  setLength,
}) => {
  let icon = iconPick(name);

  const getDataByTypeHandler = () => {
    axios.get(`/api/materials/type/${name}`).then((res) => {
      setMaterialByType(res.data.material);
      setType(name);
      setLength(0);
      setFilteredMaterial([]);
      setLoaded(false);
    });
  };

  return (
    <>
      <button className="btn" onClick={getDataByTypeHandler} title={name}>
        {name} <i className={icon} aria-hidden="true"></i>
      </button>
    </>
  );
};

export default Button;
