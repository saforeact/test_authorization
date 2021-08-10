import { Button } from "@material-ui/core";
import React from "react";

const _SubmitButton = ({ children }) => (
  <Button type="submit" color="primary">
    {children}
  </Button>
);

export default _SubmitButton;
