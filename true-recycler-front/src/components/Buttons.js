import React from "react";
import Button from "./Button";

const Buttons = ({ data, setMaterialByType, setFilteredMaterial }) => {
  let types = [];
  for (const el of data) {
    types.push(el.materialType);
  }
  let uniq = [...new Set(types)];

  const resetHandler = () => {
    setMaterialByType([]);
  };

  return (
    <>
      <h3>Search materials by type</h3>
      {uniq.map((el) => (
        <Button
          key={el}
          name={el}
          setMaterialByType={setMaterialByType}
          setFilteredMaterial={setFilteredMaterial}
        />
      ))}
      <button className="btn" onClick={resetHandler}>
        Reset
      </button>
    </>
  );
};

export default Buttons;
