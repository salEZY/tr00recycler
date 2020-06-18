import React from "react";
import axios from "axios";
import "./Button.css";

const Button = ({ name, setMaterialByType, setFilteredMaterial }) => {
  const getDataByTypeHandler = () => {
    axios.get(`/api/materials/type/${name}`).then((res) => {
      setMaterialByType(res.data.material);
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
