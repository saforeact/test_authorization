import { Box, Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { dataClear } from "../../redux/actions";
import { getIsAuth } from "../../redux/selectors";
import useStyles from "./HeaderStyle";

const MyHeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const logOutHendler = () => {
    localStorage.removeItem("token");
    dispatch(dataClear());
  };
  return (
    <div>
      <Box className={classes.header}>
        {!isAuth ? (
          <Box className={classes.navBar}>
            <NavLink to="/signIn" activeClassName={classes.navLink__active}>
              <Button color="secondary">SignIn</Button>
            </NavLink>
            <NavLink to="/signUp" activeClassName={classes.navLink__active}>
              <Button color="secondary">SignUp</Button>
            </NavLink>
          </Box>
        ) : (
          <Box className={classes.authUserBar}>
            <h1>Logo</h1>
            <Button color="secondary" onClick={logOutHendler}>
              Log Out
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default MyHeader;
