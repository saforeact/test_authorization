import { Box } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { editProfileAction } from "../../redux/actions";
import { EditProfileForm } from "../common/Forms";
import useStyle from "./FillAProfileStyle";

const FillAProfile = () => {
  const classes = useStyle();

  const dispatch = useDispatch();

  const sendForm = (form) => {
    dispatch(editProfileAction(form));
  };
  return (
    <Box className={classes.wrapper}>
      <h1>Edit Profile</h1>
      <EditProfileForm onSubmit={sendForm} />
    </Box>
  );
};

export default FillAProfile;
