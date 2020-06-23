import React from "react";
import Button from "./Button";

const Buttons = ({
  data,
  setMaterialByType,
  setFilteredMaterial,
  setType,
  setLoaded,
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
      {uniq.map((el) => (
        <Button
          key={el}
          name={el}
          setMaterialByType={setMaterialByType}
          setFilteredMaterial={setFilteredMaterial}
          setType={setType}
          setLoaded={setLoaded}
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
