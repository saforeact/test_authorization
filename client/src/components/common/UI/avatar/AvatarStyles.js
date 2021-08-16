import { makeStyles } from "@material-ui/core";
import { deepOrange, grey, teal, yellow } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  grey: {
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
  },
  yellow: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
  teal: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
  },
}));
