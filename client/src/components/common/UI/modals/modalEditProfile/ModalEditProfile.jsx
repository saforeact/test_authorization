import { Modal } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getActiveUser } from "../../../../../redux/selectors";
import { EditProfileForm } from "../../../Forms";
import useStyles from "./ModalEditProfileStyle";

const ModalEditProfile = ({ open, handleClose, onSubmit = () => {} }) => {
  const classes = useStyles();

  const user = useSelector(getActiveUser);
  const saveNewUserData = (form) => {
    onSubmit(form);
  };
  return (
    <Modal open={open} onClose={handleClose} className={classes.wrapper}>
      <div className={classes.modalWindow}>
        <EditProfileForm
          onSubmit={saveNewUserData}
          oldForm={{
            name: user?.name,
            surname: user?.surname,
            date: user?.date,
            sex: user?.sex,
          }}
        />
      </div>
    </Modal>
  );
};

export default ModalEditProfile;
