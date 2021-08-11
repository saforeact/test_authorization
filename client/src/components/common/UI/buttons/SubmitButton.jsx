import { Button } from "@material-ui/core";
import React from "react";

const SubmitButton = ({ children }) => (
  <Button type="submit" color="primary">
    {children}
  </Button>
);

export default SubmitButton;
