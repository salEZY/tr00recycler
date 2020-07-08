import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transition } from "react-spring/renderprops";

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

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  return (
    <>
      <Header modal={modal} show={showModal} />
      <ToTopBtn />
      {modal ? (
        <Transition
          items={modal}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
          trail={250}
        >
          {(modal) =>
            modal &&
            ((props) => (
              <div style={props}>
                <Modal hide={hideModal} />
              </div>
            ))
          }
        </Transition>
      ) : (
        <>
          <Intro />
          {loading ? <Loader /> : <Main data={data} />}
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
