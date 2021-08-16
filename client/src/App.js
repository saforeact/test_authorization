import { Container, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "./components";
import { dataAction } from "./redux/actions";
import Routers from "./routers";

const useStyles = makeStyles({
  wrapper: {},
});
const App = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataAction());
  }, [dispatch]);

  return (
    <Container className={classes.wrapper}>
      <Header />
      <Routers />
    </Container>
  );
};

export default App;
