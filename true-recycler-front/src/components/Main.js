import React, { useState, useEffect } from "react";
import Buttons from "./Buttons";
import Input from "./Input";
import MaterialItem from "./MaterialItem";

const Main = ({ data }) => {
  const [materialByType, setMaterialByType] = useState([]);
  const [filteredMaterial, setFilteredMaterial] = useState([]);
  const [type, setType] = useState("");
  const [dots, setDots] = useState("");
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    let interval = setInterval(() => {
      if (dots.length > 2) setDots("");
      else setDots(dots + ".");
    }, 750);
    return () => {
      clearInterval(interval);
    };
  }, [dots]);

  return (
    <main>
      <Buttons
        data={data}
        setMaterialByType={setMaterialByType}
        setFilteredMaterial={setFilteredMaterial}
        setType={setType}
        setLoaded={setLoaded}
      />
      <Input
        data={data}
        setFilteredMaterial={setFilteredMaterial}
        setMaterialByType={setMaterialByType}
        setLoaded={setLoaded}
      />
      <div className="materials-list">
        {loaded ? (
          <p style={{ fontSize: "1.5rem" }}>Start searching{dots}</p>
        ) : (
          <>
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
          </>
        )}
      </div>
    </main>
  );
};

export default Main;
