import React, { useState, useEffect } from "react";
import { Transition } from "react-spring/renderprops";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Intro from "./components/Intro/Intro";
import Main from "./components/Main";
import Modal from "./components/Modal/Modal";
import ToTopBtn from "./components/ToTopBtn/ToTopBtn";
import { Auth } from "./util/auth-context";
import { useAuth } from "./util/auth-hook";

function App() {
  const [modal, setModal] = useState(false);
  const { token, userId, email, login, logout } = useAuth();

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token, storedData.email);
    }
  }, [login]);

  return (
    <Auth.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        email: email,
        login: login,
        logout: logout,
      }}
    >
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
    </Auth.Provider>
  );
}

export default App;
