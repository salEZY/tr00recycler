import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Intro from "./components/Intro/Intro";
import Main from "./components/Main";
import Modal from "./components/Modal/Modal";
import ToTopBtn from "./components/ToTopBtn/ToTopBtn";
import Loader from "./components/Loader/Loader";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios.get("/api/materials/").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <ToTopBtn />
      {modal ? (
        <Modal setModal={setModal} />
      ) : (
        <>
          <Header setModal={setModal} />
          <Intro />
          {loading ? <Loader /> : <Main data={data} />}
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
