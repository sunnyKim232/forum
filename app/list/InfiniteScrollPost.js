"use client";

import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useInView } from "react-intersection-observer";
import { fetchPost } from "../../actions/postActions";

const InfiniteScrollPost = ({ initialPost, session }) => {
  const [post, setPost] = useState(initialPost);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  async function loadMorePost() {
    const next = page + 1;
    const post = await fetchPost({ page: next });
    if (post?.length) {
      setPage(next);
      setPost((prev) => [...(prev?.length ? prev : []), ...post]);
    }
  }

  useEffect(() => {
    if (inView) {
      loadMorePost();
    }
  }, [inView]);

  return (
    <>
      {post.length >= 1 ? (
        post.map((item) => {
          return (
            <div key={item._id.toString()}>
              <ListItem
                contentId={item._id.toString()}
                title={item.title}
                content={item.content}
                author={item.author ? item.author : null}
                session={session}
              />
            </div>
          );
        })
      ) : (
        <p>등록된 글이 없습니다.</p>
      )}

      <div ref={ref}></div>
    </>
  );
};

export default InfiniteScrollPost;
