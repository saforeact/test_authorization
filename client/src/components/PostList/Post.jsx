import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { QuoteList } from "./dndComponents";

const Post = ({
  activeIndex = 0,
  onDragEndHendler,
  onDragStartHendler,
  postList,
}) => {
  return (
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
  );
};

export default Post;
