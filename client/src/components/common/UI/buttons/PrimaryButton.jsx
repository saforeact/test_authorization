import { Button } from "@material-ui/core";
import React from "react";

const PrimaryButton = ({ children, ...props }) => (
  <Button color="primary" {...props}>
    {children}
  </Button>
);

export default PrimaryButton;
