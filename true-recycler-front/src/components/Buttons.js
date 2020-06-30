import React from "react";
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

  return (
    <div style={{ margin: "30px auto" }}>
      <h3>
        Search materials by type
        <i
          className="fa fa-search"
          aria-hidden="true"
          style={{ marginLeft: "10px" }}
        ></i>
      </h3>
      {uniq.map((type) => (
        <Button
          key={type}
          name={type}
          setMaterialByType={setMaterialByType}
          setFilteredMaterial={setFilteredMaterial}
          setType={setType}
          setLoaded={setLoaded}
          setLength={setLength}
        />
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
