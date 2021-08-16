import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAction, updatePosts } from "../../redux/actions";
import { getAllPosts, getIsAuth, getMetaPosts } from "../../redux/selectors";
import Post from "./Post";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const PostListContainer = () => {
  const dispatch = useDispatch();

  const postList = useSelector(getAllPosts);
  const { totalPages, loading } = useSelector(getMetaPosts);
  const isAuth = useSelector(getIsAuth);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);
  const [scroll, setScroll] = useState(false);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setScroll(true);
    }
  };
  const onDragEndHendler = (result) => {
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }

    setActiveIndex(-1);
    dispatch(
      updatePosts(
        reorder(postList, result.source.index, result.destination.index)
      )
    );
  };
  const onDragStartHendler = (e) => {
    setActiveIndex(e.source.index);
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
    if (!postList.length && isAuth) {
      dispatch(getPostsAction({ page: currentPage }));
      setCurrentPage((prev) => prev + 1);
      setTimeout(() => setScroll(false), 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postList]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  if (!postList.length) {
    return <div>Loading...</div>;
  }
  return (
    <Post
      onDragEndHendler={onDragEndHendler}
      onDragStartHendler={onDragStartHendler}
      activeIndex={activeIndex}
      postList={postList}
    />
  );
};

export default PostListContainer;
