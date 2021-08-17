import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KEY_IN_LOCALSTORAGE_JWT_TOKEN } from "../../constants";
import { dataClear, editProfileAction, setAuth } from "../../redux/actions";
import { getActiveUser, getIsActive, getIsAuth } from "../../redux/selectors";
import Header from "./Header";

const HeaderContainer = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(getIsAuth);
  const isActive = useSelector(getIsActive);
  // const user = { name: "asda" };
  const user = useSelector(getActiveUser);

  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };
  const logOutHendler = () => {
    localStorage.removeItem(KEY_IN_LOCALSTORAGE_JWT_TOKEN);
    dispatch(setAuth(false));
    dispatch(dataClear());
  };
  const saveNewDataUser = (form) => {
    dispatch(editProfileAction(form));
    handleCloseModal();
  };
  const option = [
    {
      text: "Edit Profile",
      value: "Edit Profile",
      func: handleCloseModal,
    },
    { text: "Log Out", value: "Log Out", func: logOutHendler },
  ];
  if (isAuth === undefined) {
    return null;
  }
  return (
    <Header
      isActive={isActive}
      user={user}
      option={option}
      isAuth={isAuth}
      openModal={openModal}
      handleCloseModal={handleCloseModal}
      saveNewDataUser={saveNewDataUser}
      logOutHendler={logOutHendler}
    />
  );
};

export default HeaderContainer;
