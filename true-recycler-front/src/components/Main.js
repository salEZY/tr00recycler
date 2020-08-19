import React, { useState, useEffect } from "react";
import axios from "axios";

import AddMaterial from "./AddMaterial/AddMaterial";
import Buttons from "./Buttons";
import Input from "./Input/Input";
import MaterialItem from "./MaterialItem/MaterialItem";
import Loader from "./Loader/Loader";

const Main = () => {
  const [materialByType, setMaterialByType] = useState([]);
  const [filteredMaterial, setFilteredMaterial] = useState([]);
  const [dots, setDots] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/materials/").then((res) => {
      setData(res.data);
    });
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    let interval = setInterval(() => {
      dots.length === 3 ? setDots("") : setDots(dots + ".");
    }, 750);
    return () => {
      clearInterval(interval);
    };
  }, [dots]);

  return (
    <main>
      <div className="inputs-div">
        <AddMaterial setLoading={setLoading} />
        <div className="searches">
          <Buttons
            data={data}
            setMaterialByType={setMaterialByType}
            setFilteredMaterial={setFilteredMaterial}
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
      {loading ? (
        <Loader />
      ) : (
        <div className="materials-list">
          {loaded ? (
            <h2>Start searching{dots}</h2>
          ) : (
            <>
              {length < 2 ? (
                materialByType.map((el) => (
                  <MaterialItem
                    key={el.materialName}
                    name={el.materialName}
                    type={el.materialType}
                    matId={el._id}
                    setMaterialByType={setMaterialByType}
                  />
                ))
              ) : filteredMaterial.length === 0 ? (
                <p className="no-result">No valid result. Try again?</p>
              ) : (
                filteredMaterial.map((el) => (
                  <MaterialItem
                    key={el._id}
                    name={el.materialName}
                    type={el.materialType}
                    matId={el._id}
                    setFilteredMaterial={setFilteredMaterial}
                  />
                ))
              )}
            </>
          )}
        </div>
      )}
    </main>
  );
};

export default Main;
