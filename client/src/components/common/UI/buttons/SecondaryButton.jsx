import { Button } from "@material-ui/core";
import React from "react";

const SecondaryButton = ({ children, ...props }) => {
  return (
    <Button color="secondary" {...props}>
      {children}
    </Button>
  );
};

export default SecondaryButton;
