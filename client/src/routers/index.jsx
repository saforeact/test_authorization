import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Dashboard, FillAProfile, SignIn, SignUp } from "../components";
import {
  DASHBOARD_PATH,
  EDIT_PROFILE_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from "../constants";
import { getIsActive, getIsAuth } from "../redux/selectors";

export const Routers = () => {
  const history = useHistory();

  const isAuth = useSelector(getIsAuth);
  const isActive = useSelector(getIsActive);

  useEffect(() => {
    if (isAuth) {
      if (!isActive) {
        history.push(EDIT_PROFILE_PATH);
      } else {
        history.push(DASHBOARD_PATH);
      }
    }
  }, [isAuth, isActive, history]);

  if (isAuth !== undefined) {
    if (!isAuth) {
      return (
        <Switch>
          <Route path={SIGN_IN_PATH} component={SignIn} />
          <Route path={SIGN_UP_PATH} component={SignUp} />

          <Redirect to={SIGN_IN_PATH} />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path={EDIT_PROFILE_PATH} component={FillAProfile} />
          <Route path={DASHBOARD_PATH} component={Dashboard} />
          <Redirect to={DASHBOARD_PATH} />
        </Switch>
      );
    }
  } else {
    return null;
  }
};
