import { MenuItem, Select } from "@material-ui/core";
import React from "react";

const DropDown = ({
  option = [],
  defaultOption = "None",
  onChange = () => {},
  ...props
}) => {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Select
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      value={value}
      onChange={handleChange}
      {...props}
    >
      <MenuItem value="">
        <em>{defaultOption}</em>
      </MenuItem>
      {option.map((item) => (
        <MenuItem value={item.value}>{item.text}</MenuItem>
      ))}
    </Select>
  );
};

export default DropDown;
