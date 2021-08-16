import { colors, makeStyles } from "@material-ui/core";

export default makeStyles({
  post: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0",
    border: "1px black solid",
    padding: 10,
    backgroundColor: colors.teal[100],
    userSelect: "none",
  },
  title: {
    alignSelf: "center",
  },
  body: {},
  time: {},
  activePost: {
    backgroundColor: colors.blue[50],
  },
});
