import React, { useState, useContext } from "react";
import axios from "axios";

import Message from "../Message/Message";
import { messageHandler } from "../../util/messageHandler";
import { Auth } from "../../util/auth-context";
import "./AddMaterial.css";

const AddMaterial = ({ setLoading }) => {
  const auth = useContext(Auth);
  const [materialType, setMaterialType] = useState("");
  const [matName, setMaterialName] = useState("");
  const [selectMsg, setSelectMsg] = useState("");
  const [materialNameMsg, setMaterialNameMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const clearForm = () => {
    setMaterialType("");
    setMaterialName("");
  };

  const addMaterialHandler = (e) => {
    e.preventDefault();

    if (matName === "") {
      messageHandler(setMaterialNameMsg, "Name is missing!", clearForm);
    }

    if (materialType === "") {
      messageHandler(setSelectMsg, "Type not selected!", clearForm);
      return;
    }
    let materialName = matName.charAt(0).toUpperCase() + matName.slice(1);
    setLoading(true);
    axios
      .post(
        "/api/materials/add",
        { materialName, materialType },
        { headers: { Authorization: auth.token } }
      )
      .then((res) => {
        messageHandler(setSuccess, res.data.message, clearForm);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        messageHandler(setErrorMsg, error.response.data.message, clearForm);
        return;
      });
  };

  return (
    <>
      <form method="POST">
        <h4>Add Material</h4>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setMaterialName(e.target.value)}
          value={matName}
        />
        <Message msg={materialNameMsg} danger={true} id="addFormStyle" />
        <select
          name=""
          onChange={(e) => setMaterialType(e.target.value)}
          value={materialType}
        >
          <option value="">--Select--</option>
          <option value="Paper">Paper</option>
          <option value="General">General</option>
          <option value="Plastic">Plastic</option>
          <option value="Glass">Glass</option>
          <option value="Lightning-waste">Lightning-waste</option>
          <option value="Metal">Metal</option>
          <option value="E-waste">E-waste</option>
        </select>
        <Message msg={selectMsg} danger={true} id="addFormStyle" />
        <button onClick={addMaterialHandler} id="addMatBtn">
          <i className="fas fa-plus-circle"></i> Add
        </button>
        <Message msg={errorMsg} danger={true} id="addFormStyle" />
        <Message msg={success} id="addFormStyle" />
      </form>
    </>
  );
};

export default AddMaterial;
