import React from "react";
import axios from "axios";
import "./Button.css";

const Button = ({ name, setMaterialByType, setFilteredMaterial, setType }) => {
  const getDataByTypeHandler = () => {
    axios.get(`/api/materials/type/${name}`).then((res) => {
      setMaterialByType(res.data.material);
      setType(name);
      setFilteredMaterial([]);
    });
  };

  return (
    <>
      <button className="btn" onClick={getDataByTypeHandler}>
        {name}
      </button>
    </>
  );
};

export default Button;
