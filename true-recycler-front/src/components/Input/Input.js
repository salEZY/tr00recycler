import React from "react";

import "./Input.css";

const Input = ({
  data,
  setFilteredMaterial,
  setMaterialByType,
  setLoaded,
  setLength,
}) => {
  const filterHandler = (e) => {
    setLength(e.target.value.length);
    setMaterialByType([]);
    if (e.target.value.length < 2) {
      setFilteredMaterial([]);
      setLoaded(true);
      return;
    } else {
      let filtered = data.filter((el) =>
        el.materialName.toLowerCase().includes(e.target.value)
      );
      setFilteredMaterial(filtered);
      setLoaded(false);
    }
  };

  return (
    <div className="input-div">
      <h3>
        Search by name(minimum 2 characters)
        <i
          className="fa fa-search"
          aria-hidden="true"
          style={{ marginLeft: "10px" }}
        ></i>
      </h3>
      <input type="text" className="input" onChange={filterHandler} />
    </div>
  );
};

export default Input;
