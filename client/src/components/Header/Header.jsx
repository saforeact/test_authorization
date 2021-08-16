import { Box } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  KEY_IN_LOCALSTORAGE_JWT_TOKEN,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from "../../constants";
import { dataClear, editProfileAction, setAuth } from "../../redux/actions";
import { getActiveUser, getIsActive, getIsAuth } from "../../redux/selectors";
import {
  AvatarColor,
  DropDown,
  ModalEditProfile,
  SecondaryButton,
} from "../common/UI";
import useStyles from "./HeaderStyle";

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isAuth = useSelector(getIsAuth);
  const isActive = useSelector(getIsActive);
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

  const notAuthHeader = () => (
    <Box className={classes.navBar}>
      <NavLink to={SIGN_IN_PATH} activeClassName={classes.navLink__active}>
        <SecondaryButton>SignIn</SecondaryButton>
      </NavLink>
      <NavLink to={SIGN_UP_PATH} activeClassName={classes.navLink__active}>
        <SecondaryButton>SignUp</SecondaryButton>
      </NavLink>
    </Box>
  );

  const showDropDown = () => (
    <DropDown
      name="avatar_dropDown"
      className={classes.dropDown}
      option={option}
      defaultOption=""
    ></DropDown>
  );

  const authHeader = () => (
    <Box className={classes.authUserBar}>
      <h1>Logo</h1>
      {isActive ? (
        <AvatarColor>
          {String(user.name[0]).toLocaleUpperCase()}
          {showDropDown()}
        </AvatarColor>
      ) : (
        <SecondaryButton onClick={logOutHendler}>Log Out</SecondaryButton>
      )}
    </Box>
  );

  if (isAuth !== undefined) {
    return (
      <div>
        <Box className={classes.header}>
          <ModalEditProfile
            open={openModal}
            handleClose={handleCloseModal}
            onSubmit={saveNewDataUser}
          />
          {!isAuth ? notAuthHeader() : authHeader()}
        </Box>
      </div>
    );
  } else {
    return null;
  }
};

export default Header;
