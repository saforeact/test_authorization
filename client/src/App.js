import { Container, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "./elements";
import { dataAction } from "./redux/actions";
import { Routers } from "./routers";
const useStyles = makeStyles({
  wrapper: {},
});
const App = () => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

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
