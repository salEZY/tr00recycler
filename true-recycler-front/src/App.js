import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/materials/").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
      <Header />
      <Main data={data} />
      <Footer />
    </>
  );
}

export default App;
