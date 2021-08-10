import { Container, makeStyles } from "@material-ui/core";
import { Header } from "./elements";
import { Routers } from "./routers";
const useStyles = makeStyles({
  wrapper: {},
});
const App = () => {
  const classes = useStyles();
  console.log(`App`);
  return (
    <Container className={classes.wrapper}>
      <Header />
      <Routers />
    </Container>
  );
};

export default App;
