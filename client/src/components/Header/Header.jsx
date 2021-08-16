import { Box } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { SIGN_IN_PATH, SIGN_UP_PATH } from "../../constants";
import checkIsAuth from "../../hoc/checkIsAuth";
import {
  AvatarColor,
  DropDown,
  ModalEditProfile,
  SecondaryButton,
} from "../common/UI";
import useStyles from "./HeaderStyle";

const NotAuthHeader = () => {
  const classes = useStyles();
  return (
    <Box className={classes.navBar}>
      <NavLink to={SIGN_IN_PATH} activeClassName={classes.navLink__active}>
        <SecondaryButton>SignIn</SecondaryButton>
      </NavLink>
      <NavLink to={SIGN_UP_PATH} activeClassName={classes.navLink__active}>
        <SecondaryButton>SignUp</SecondaryButton>
      </NavLink>
    </Box>
  );
};

const ShowDropDown = ({ option }) => {
  const classes = useStyles();
  return (
    <DropDown
      name="avatar_dropDown"
      className={classes.dropDown}
      option={option}
      defaultOption=""
    ></DropDown>
  );
};
const AuthHeader = ({ isActive, user, option, logOutHendler }) => {
  const classes = useStyles();

  return (
    <Box className={classes.authUserBar}>
      <h1>Logo</h1>
      {isActive ? (
        <AvatarColor>
          {String(user.name[0]).toLocaleUpperCase()}
          <ShowDropDown option={option} />
        </AvatarColor>
      ) : (
        <SecondaryButton onClick={logOutHendler}>Log Out</SecondaryButton>
      )}
    </Box>
  );
};
const Header = ({
  isActive,
  user,
  option,
  isAuth,
  openModal,
  handleCloseModal,
  saveNewDataUser,
  logOutHendler,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.header}>
        <ModalEditProfile
          open={openModal}
          handleClose={handleCloseModal}
          onSubmit={saveNewDataUser}
        />
        {!isAuth ? (
          <NotAuthHeader />
        ) : (
          <AuthHeader
            isActive={isActive}
            user={user}
            option={option}
            logOutHendler={logOutHendler}
          />
        )}
      </Box>
    </div>
  );
};

export default checkIsAuth(Header);
