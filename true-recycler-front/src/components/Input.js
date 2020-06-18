import React from "react";

import "./Input.css";

const Input = ({ data, setFilteredMaterial, setMaterialByType }) => {
  const filterHandler = (e) => {
    setMaterialByType([]);
    if (e.target.value.length < 3) {
      setFilteredMaterial([]);
      return;
    } else {
      let filtered = data.filter((el) =>
        el.materialName.toLowerCase().includes(e.target.value)
      );
      setFilteredMaterial(filtered);
    }
  };

  return (
    <>
      <h3>
        Search by name(minimum 3 characters)
        <i
          className="fa fa-search"
          aria-hidden="true"
          style={{ marginLeft: "10px" }}
        ></i>
      </h3>
      <input type="text" className="input" onChange={filterHandler} />
    </>
  );
};

export default Input;
