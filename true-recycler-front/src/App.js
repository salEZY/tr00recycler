import React, { useState } from "react";
import { Transition } from "react-spring/renderprops";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Intro from "./components/Intro/Intro";
import Main from "./components/Main";
import Modal from "./components/Modal/Modal";
import ToTopBtn from "./components/ToTopBtn/ToTopBtn";

function App() {
  const [modal, setModal] = useState(false);

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
          <Main />
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
