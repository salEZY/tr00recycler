import React, { useState } from "react";
import Buttons from "./Buttons";
import Input from "./Input";

const Main = ({ data }) => {
  const [materialByType, setMaterialByType] = useState([]);
  const [filteredMaterial, setFilteredMaterial] = useState([]);

  return (
    <main>
      <Buttons
        data={data}
        setMaterialByType={setMaterialByType}
        setFilteredMaterial={setFilteredMaterial}
      />
      <Input
        data={data}
        setFilteredMaterial={setFilteredMaterial}
        setMaterialByType={setMaterialByType}
      />
      <div className="materials-list">
        {materialByType.map((el) => (
          <p key={el}>{el}</p>
        ))}
        {filteredMaterial.map((el) => (
          <p key={el._id}>{el.materialName}</p>
        ))}
      </div>
    </main>
  );
};

export default Main;
