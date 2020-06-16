import React from "react";
import Button from "./Button";

const Buttons = ({ data, setMaterialByType }) => {
  let types = [];
  for (const el of data) {
    types.push(el.materialType);
  }
  let uniq = [...new Set(types)];

  return (
    <>
      {uniq.map((el) => (
        <Button key={el} name={el} setMaterialByType={setMaterialByType} />
      ))}
    </>
  );
};

export default Buttons;
