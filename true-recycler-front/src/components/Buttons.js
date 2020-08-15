import React from "react";
import axios from "axios";

import Button from "./Button/Button";

const Buttons = ({
  data,
  setMaterialByType,
  setFilteredMaterial,
  setType,
  setLoaded,
  setLength,
}) => {
  let types = [];
  for (const el of data) {
    types.push(el.materialType);
  }
  let uniq = [...new Set(types)];

  const resetHandler = () => {
    setMaterialByType([]);
    setLoaded(true);
  };

  const getDataByTypeHandler = (name) => {
    axios.get(`/api/materials/type/${name}`).then((res) => {
      setMaterialByType(res.data.material);
      setType(name);
      setLength(0);
      setFilteredMaterial([]);
      setLoaded(false);
    });
  };

  return (
    <div>
      <h3 style={{ fontFamily: "Arial" }}>
        Search by type
        <i
          className="fa fa-search"
          aria-hidden="true"
          style={{ marginLeft: "10px" }}
        ></i>
      </h3>
      {uniq.map((type) => (
        <Button key={type} name={type} onClickHandler={getDataByTypeHandler} />
      ))}
      <i
        className="fa fa-times delete"
        aria-hidden="true"
        onClick={resetHandler}
        title="Reset search"
      ></i>
    </div>
  );
};

export default Buttons;
