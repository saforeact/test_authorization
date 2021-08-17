import React from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard, FillAProfile, SignIn, SignUp } from "../components";
import {
  DASHBOARD_PATH,
  EDIT_PROFILE_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from "../constants";
import checkIsAuth from "../hoc/checkIsAuth";

const Routers = () => {
  return (
    <Switch>
      <Route path={SIGN_IN_PATH} component={checkIsAuth(SignIn)} />
      <Route path={SIGN_UP_PATH} component={checkIsAuth(SignUp)} />
      <Route path={EDIT_PROFILE_PATH} component={checkIsAuth(FillAProfile)} />
      <Route path={DASHBOARD_PATH} component={checkIsAuth(Dashboard)} />
    </Switch>
  );
};
export default Routers;
