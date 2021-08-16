import { Box } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import useStyles from "./PostListStyles";
const Post = ({ post, index, actionIndex }) => {
  const classes = useStyles();

  return (
    <Box
      key={post._id}
      className={classNames(
        classes.post,
        index === actionIndex && classes.activePost
      )}
    >
      <h1 className={classes.title}>{post.titlePost}</h1>
      <p className={classes.body}>{post.bodyPost}</p>
      <span className={classes.time}>{post.publicationTime}</span>
    </Box>
  );
};

export default Post;
