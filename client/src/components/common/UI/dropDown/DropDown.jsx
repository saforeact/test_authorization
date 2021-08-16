import { FormHelperText, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";

const DropDown = ({
  option = [],
  defaultOption = "None",
  onChange = () => {},
  value = "",
  error = "",
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const handleSetOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <Select
        open={open}
        onOpen={handleSetOpen}
        onClose={handleSetOpen}
        value={value}
        onChange={onChange}
        error={!!error}
        {...props}
      >
        {defaultOption && (
          <MenuItem value="">
            <em>{defaultOption}</em>
          </MenuItem>
        )}
        {option.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            onClick={item.func ? item.func : null}
          >
            {item.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={!!error}>{error}</FormHelperText>
    </>
  );
};

export default DropDown;
