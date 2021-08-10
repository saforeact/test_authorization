import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Dashboard, SignIn, SignUp } from "../components";
import { dataThunk } from "../Redux/reducers/userReduce";

export const Routers = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  dispatch(dataThunk(token));

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
