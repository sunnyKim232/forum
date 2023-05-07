"use client";

import { useEffect, useState } from "react";

export default function Comment(id) {
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <div>댓글 리스트</div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ contentId: id, comment: comment }),
          });
        }}
      >
        전송
      </button>
    </div>
  );
}
