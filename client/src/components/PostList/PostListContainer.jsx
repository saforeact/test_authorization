import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAction, updatePosts } from "../../redux/actions";
import { getAllPosts, getMetaPosts } from "../../redux/selectors";
import Post from "./Post";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Quote = ({ post, index, activeIndex }) => (
  <Draggable draggableId={post._id} index={index}>
    {(provided) => (
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Post post={post} index={index} actionIndex={activeIndex} />
      </Box>
    )}
  </Draggable>
);

const QuoteList = React.memo(({ postList, activeIndex }) =>
  postList.map((post, index) => (
    <Quote post={post} index={index} key={post._id} activeIndex={activeIndex} />
  ))
);

const PostListContainer = () => {
  const postList = useSelector(getAllPosts);
  const { totalPages, loading } = useSelector(getMetaPosts);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [scroll, setScroll] = useState(false);
  const dispatch = useDispatch();
  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setScroll(true);
    }
  };

  useEffect(() => {
    if (!loading && totalPages > currentPage && scroll) {
      dispatch(getPostsAction({ page: currentPage }));
      setCurrentPage((prev) => prev + 1);
      setTimeout(() => setScroll(false), 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroll]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const onDragEndHendler = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newPostList = reorder(
      postList,
      result.source.index,
      result.destination.index
    );
    setActiveIndex(-1);
    dispatch(updatePosts(newPostList));
  };
  const onDragStartHendler = (e) => {
    setActiveIndex(e.source.index);
  };
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

export default PostListContainer;
