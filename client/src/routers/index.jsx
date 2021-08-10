import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Dashboard, SignIn, SignUp } from "../components";

export const Routers = () => {
  const isAuth = useSelector((state) => state.user.data.isAuth);
  if (isAuth !== undefined) {
    if (!isAuth) {
      return (
        <Switch>
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <Redirect to="/signIn" />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Redirect to="/dashboard" />
        </Switch>
      );
    }
  } else {
    return <></>;
  }
};
