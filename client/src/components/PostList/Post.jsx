import { Box } from "@material-ui/core";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { QuoteList } from "./dndComponents";

const Post = ({
  activeIndex,
  onDragEndHendler,
  onDragStartHendler,
  postList,
}) => {
  return (
    <Box>
      <DragDropContext
        onDragEnd={onDragEndHendler}
        onDragStart={onDragStartHendler}
      >
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <QuoteList postList={postList} activeIndex={activeIndex} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div id="loader"></div>
    </Box>
  );
};

export default Post;
