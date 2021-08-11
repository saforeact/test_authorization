import { makeStyles } from "@material-ui/core";
import { amber, grey } from "@material-ui/core/colors";

export default makeStyles({
  header: {
    backgroundColor: grey[300],
    height: 100,
    display: "flex",
    alignItems: "center",
    "& a": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  navBar: { display: "flex", alignItems: "center", marginLeft: 10 },
  navLink__active: {
    border: "2px solid",
    borderRadius: 12,
    borderColor: amber[500],
  },
  authUserBar: {
    width: "100%",
    padding: "0 10px",
    display: "flex",
    justifyContent: "space-between",
  },
});
