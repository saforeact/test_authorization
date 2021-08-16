import { Avatar } from "@material-ui/core";
import React from "react";
import useStyles from "./AvatarStyles";
import classNames from "classnames";
const AvatarColor = ({ children }) => {
  const classes = useStyles();
  const selectColor = () => listColor(Math.round(Math.random() * 3));

  const listColor = (index) => {
    switch (index) {
      case 0:
        return "orange";
      case 1:
        return "teal";
      case 2:
        return "yellow";
      default:
        return "grey";
    }
  };
  return (
    <Avatar className={classNames(classes.root, classes[selectColor()])}>
      {children}
    </Avatar>
  );
};

export default AvatarColor;
