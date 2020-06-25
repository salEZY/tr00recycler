import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Main from "./components/Main";
import ToTopBtn from "./components/ToTopBtn";
import Loader from "./components/Loader";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/materials/").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Header />
      <ToTopBtn />
      <Intro />
      {loading ? <Loader /> : <Main data={data} />}
      <Footer />
    </>
  );
}

export default App;
