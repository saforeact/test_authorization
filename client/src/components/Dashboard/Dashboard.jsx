import { Box } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { PostList } from "..";
import { sendPostAction } from "../../redux/actions";
import { SendPostForm } from "../common/Forms";

import useStyles from "./DashboardStyle";

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const formNewPostHendler = (form) => {
    dispatch(sendPostAction(form));
  };

  return (
    <Box className={classes.wrapper}>
      <h1>Dashboard</h1>
      <SendPostForm onSubmit={formNewPostHendler} />
      <PostList />
    </Box>
  );
};

export default Dashboard;
