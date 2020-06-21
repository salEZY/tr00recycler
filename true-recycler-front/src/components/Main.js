import React, { useState } from "react";
import Buttons from "./Buttons";
import Input from "./Input";
import MaterialItem from "./MaterialItem";

const Main = ({ data }) => {
  const [materialByType, setMaterialByType] = useState([]);
  const [filteredMaterial, setFilteredMaterial] = useState([]);
  const [type, setType] = useState("");

  return (
    <main>
      <Buttons
        data={data}
        setMaterialByType={setMaterialByType}
        setFilteredMaterial={setFilteredMaterial}
        setType={setType}
      />
      <Input
        data={data}
        setFilteredMaterial={setFilteredMaterial}
        setMaterialByType={setMaterialByType}
      />
      <div className="materials-list">
        {materialByType.map((el) => (
          <MaterialItem key={el} name={el} type={type} />
        ))}
        {filteredMaterial.map((el) => (
          <MaterialItem
            key={el._id}
            name={el.materialName}
            type={el.materialType}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;
