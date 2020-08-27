import React, { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header";
import UserModal from "./components/UserModal/UserModal";
import Footer from "./components/Footer";
import Intro from "./components/Intro/Intro";
import Main from "./components/Main";
import Modal from "./components/Modal/Modal";
import ToTopBtn from "./components/ToTopBtn/ToTopBtn";
import { Auth } from "./util/auth-context";
import { useAuth } from "./util/auth-hook";

function App() {
  const [modal, setModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const { token, userId, email, login, logout } = useAuth();

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const userModalHandler = () => {
    setUserModal(true);
  };

  const HideUserModalHandler = () => {
    setUserModal(false);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token, storedData.email);
    }
  });

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
      <Header
        modal={modal}
        show={showModal}
        userModalHandler={userModalHandler}
      />
      {userModal && <UserModal HideUserModalHandler={HideUserModalHandler} />}
      <ToTopBtn />
      {modal ? (
        <Modal hide={hideModal} modal={modal} />
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
