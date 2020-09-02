import React, { useState } from "react";

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
  const { token, userId, email, joined, login, logout } = useAuth();

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const userModalHandler = () => {
    if (!userModal) {
      setUserModal(true);
    } else {
      setUserModal(false);
    }
  };

  return (
    <Auth.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        email: email,
        joined: joined,
        login: login,
        logout: logout,
      }}
    >
      <Header
        modal={modal}
        show={showModal}
        userModalHandler={userModalHandler}
      />
      {userModal && (
        <UserModal setUserModal={setUserModal} userModal={userModal} />
      )}
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
