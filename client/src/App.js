import { Container, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./components";
import { dataAction } from "./redux/actions";
import { getIsAuth } from "./redux/selectors";
import Routers from "./routers";

const useStyles = makeStyles({
  wrapper: {},
});
const App = () => {
  const classes = useStyles();
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataAction());
  }, [dispatch]);

  if (isAuth === undefined) {
    return null;
  }
  return (
    <Container className={classes.wrapper}>
      <Header />
      <Routers />
    </Container>
  );
};

export default App;
