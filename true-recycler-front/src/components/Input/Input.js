import React, { useState } from "react";

import "./Input.css";

const Input = ({
  data,
  setFilteredMaterial,
  setMaterialByType,
  setLoaded,
  setLength,
}) => {
  const [inputText, setInputText] = useState("");

  const filterHandler = (e) => {
    setInputText(e.target.value);
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

  const clearInputHandler = () => {
    setInputText("");
    setFilteredMaterial([]);
  };

  return (
    <div className="input-div">
      <h3 style={{ fontFamily: "Arial" }}>
        Search materials by name(minimum 2 characters)
        <i
          className="fa fa-search"
          aria-hidden="true"
          style={{ marginLeft: "10px" }}
        ></i>
      </h3>
      <input
        type="text"
        className="input"
        onChange={filterHandler}
        value={inputText}
      />
      <i
        className="fas fa-eraser erase"
        aria-hidden="true"
        onClick={clearInputHandler}
        title="Reset input search"
      ></i>
    </div>
  );
};

export default Input;
