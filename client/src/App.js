import { Container, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Header } from "./components";
import { EDIT_PROFILE_PATH, KEY_IN_LOCALSTORAGE_JWT_TOKEN } from "./constants";
import { dataAction } from "./redux/actions";
import { getIsActive, getIsAuth } from "./redux/selectors";
import { Routers } from "./routers";

const useStyles = makeStyles({
  wrapper: {},
});
const App = () => {
  const classes = useStyles();
  const token = localStorage.getItem(KEY_IN_LOCALSTORAGE_JWT_TOKEN);
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuth = useSelector(getIsAuth);
  const isActive = useSelector(getIsActive);

  useEffect(() => {
    if (isAuth && !isActive) {
      history.push(EDIT_PROFILE_PATH);
    }
  }, [isAuth, isActive, history]);

  useEffect(() => {
    dispatch(dataAction(token));
  }, [dispatch, token]);

  return (
    <Container className={classes.wrapper}>
      <Header />
      <Routers />
    </Container>
  );
};

export default App;
