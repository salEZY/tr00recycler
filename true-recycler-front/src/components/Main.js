import React, { useState } from "react";
import Buttons from "./Buttons";
import Input from "./Input";

const Main = ({ data }) => {
  const [materialByType, setMaterialByType] = useState([]);

  return (
    <main>
      <Buttons data={data} setMaterialByType={setMaterialByType} />
      <Input />
      {materialByType.map((el) => (
        <p key={el}>{el}</p>
      ))}
    </main>
  );
};

export default Main;
