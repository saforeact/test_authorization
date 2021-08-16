import { Box } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import useStyles from "./PostListStyles";

export const Quote = ({ post, index, activeIndex }) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={post._id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            key={post._id}
            className={classNames(
              classes.post,
              index === activeIndex && classes.activePost
            )}
          >
            <h1 className={classes.title}>{post.titlePost}</h1>
            <p className={classes.body}>{post.bodyPost}</p>
            <span className={classes.time}>{post.publicationTime}</span>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};
export const QuoteList = React.memo(({ postList, activeIndex }) =>
  postList.map((post, index) => (
    <Quote post={post} index={index} key={post._id} activeIndex={activeIndex} />
  ))
);
