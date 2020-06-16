import React, { useState } from "react";
import Buttons from "./Buttons";

const Main = ({ data }) => {
  const [materialByType, setMaterialByType] = useState([]);

  return (
    <>
      <Buttons data={data} setMaterialByType={setMaterialByType} />
      {materialByType.map((el) => (
        <p key={el}>{el}</p>
      ))}
    </>
  );
};

export default Main;
