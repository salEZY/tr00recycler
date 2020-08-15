import React, { useState, useEffect } from "react";

import AddMaterial from "./AddMaterial/AddMaterial";
import Buttons from "./Buttons";
import Input from "./Input/Input";
import MaterialItem from "./MaterialItem/MaterialItem";

const Main = ({ data }) => {
  const [materialByType, setMaterialByType] = useState([]);
  const [filteredMaterial, setFilteredMaterial] = useState([]);
  const [type, setType] = useState("");
  const [dots, setDots] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [length, setLength] = useState(0);

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
      <div className="inputs-div">
        <AddMaterial />
        <div className="searches">
          <Buttons
            data={data}
            setMaterialByType={setMaterialByType}
            setFilteredMaterial={setFilteredMaterial}
            setType={setType}
            setLoaded={setLoaded}
            setLength={setLength}
          />
          <Input
            data={data}
            setFilteredMaterial={setFilteredMaterial}
            setMaterialByType={setMaterialByType}
            setLoaded={setLoaded}
            setLength={setLength}
          />
        </div>
      </div>

      <div className="materials-list">
        {loaded ? (
          <h2 style={{ fontFamily: "Arial", marginTop: "50px" }}>
            Start searching{dots}
          </h2>
        ) : (
          <>
            {length < 2 ? (
              materialByType.map((el) => (
                <MaterialItem key={el} name={el} type={type} />
              ))
            ) : filteredMaterial.length === 0 ? (
              <p
                style={{
                  margin: "40px auto",
                  color: "#026928",
                  fontSize: "2rem",
                  fontWeight: "bolder",
                  fontFamily: "Arial",
                }}
              >
                No valid result. Try again?
              </p>
            ) : (
              filteredMaterial.map((el) => (
                <MaterialItem
                  key={el._id}
                  name={el.materialName}
                  type={el.materialType}
                />
              ))
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Main;
