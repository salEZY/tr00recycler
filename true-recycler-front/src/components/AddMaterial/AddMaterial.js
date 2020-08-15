import React, { useState } from "react";
import axios from "axios";

import Message from "../Message/Message";
import { messageHandler } from "../../util/messageHandler";
import "./AddMaterial.css";

const AddMaterial = () => {
  const [materialType, setMaterialType] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [selectMsg, setSelectMsg] = useState("");
  const [materialNameMsg, setMaterialNameMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const clearForm = () => {
    setMaterialType("");
    setMaterialName("");
  };

  const HandleSelectChange = (e) => {
    setMaterialType(e.target.value);
  };

  const HandleInputChange = (e) => {
    setMaterialName(e.target.value);
  };

  const addMaterialHandler = (e) => {
    e.preventDefault();

    if (materialName === "") {
      messageHandler(setMaterialNameMsg, "Name is missing!", clearForm);
    }

    if (materialType === "") {
      messageHandler(setSelectMsg, "Type not selected!", clearForm);
      return;
    }

    axios
      .post("/api/materials/add", { materialName, materialType })
      .then((res) => messageHandler(setSuccess, res.data.message, clearForm))
      .catch((error) => {
        messageHandler(setErrorMsg, error.response.data.message, clearForm);
        return;
      });
  };

  return (
    <>
      <form method="POST">
        <h3>Add Material</h3>
        <input type="text" placeholder="Name" onChange={HandleInputChange} />
        <Message msg={materialNameMsg} danger={true} />
        <select name="" onChange={HandleSelectChange}>
          <option value="">--Select--</option>
          <option value="Paper">Paper</option>
          <option value="General">General</option>
          <option value="Plastic">Plastic</option>
          <option value="Glass">Glass</option>
          <option value="Lightning-waste">Lightning-waste</option>
          <option value="Metal">Metal</option>
          <option value="E-waste">E-waste</option>
        </select>
        <Message msg={selectMsg} danger={true} />
        <button onClick={addMaterialHandler} id="addMatBtn">
          Add <i className="fas fa-plus-circle"></i>
        </button>
        <Message msg={errorMsg} danger={true} />
        <Message msg={success} />
      </form>
    </>
  );
};

export default AddMaterial;
