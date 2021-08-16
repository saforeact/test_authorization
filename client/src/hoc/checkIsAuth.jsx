import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DASHBOARD_PATH, EDIT_PROFILE_PATH, SIGN_IN_PATH } from "../constants";
import { getIsActive, getIsAuth } from "../redux/selectors";

const checkIsAuth =
  (Component) =>
  ({ ...props }) => {
    const isAuth = useSelector(getIsAuth);
    const isActive = useSelector(getIsActive);

    const history = useHistory();

    React.useEffect(() => {
      if (isAuth) {
        if (!isActive) {
          history.push(EDIT_PROFILE_PATH);
        } else {
          history.push(DASHBOARD_PATH);
        }
      } else {
        history.push(SIGN_IN_PATH);
      }
    }, [isAuth, isActive, history]);

    if (isAuth === undefined) {
      return null;
    }

    return <Component {...props} />;
  };

export default checkIsAuth;
