import { Box, TextField } from "@material-ui/core";
import React from "react";

const _Input = ({ error, ...props }) => {
  return (
    <Box>
      <TextField {...props} error={!!error} helperText={error} />
    </Box>
  );
};

export default _Input;
