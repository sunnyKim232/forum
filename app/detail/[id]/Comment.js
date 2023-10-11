"use client";

import { useEffect, useRef, useState } from "react";

export default function Comment({ id }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const commentInputRef = useRef();
  const handleResizeHeight = () => {
    commentInputRef.current.style.height = "auto";
    commentInputRef.current.style.height =
      commentInputRef.current.scrollHeight + "px";
  };

  const readCommentList = () => {
    fetch("/api/comment/list?id=" + id)
      .then((r) => {
        if (r.status == 200) {
          return r.json();
        } else {
          //서버가 에러코드전송시 실행할코드
        }
      })
      .then((r) => {
        console.log(r.length);
        setCommentList(r);
      })
      .catch((error) => {
        //인터넷문제 등으로 실패시 실행할코드
        console.log(error);
      });
  };

  useEffect(() => {
    readCommentList();
  }, []);
  return (
    <div>
      <hr />
      {commentList.length > 0 ? (
        commentList.map((item, i) => {
          return (
            <div key={i}>
              <p>
                <span>{item.author}</span>: <span>{item.comment}</span>
              </p>
            </div>
          );
        })
      ) : (
        <></>
      )}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <textarea
          className="textarea"
          ref={commentInputRef}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          style={{ width: "50%", marginRight: "10px" }}
          rows={2}
        ></textarea>
        <button
          className="outlined"
          style={{ height: "40px" }}
          onClick={() => {
            fetch("/api/comment/new", {
              method: "POST",
              body: JSON.stringify({ contentId: id, comment: comment }),
            }).then(() => {
              commentInputRef.current.value = "";
              readCommentList();
            });
          }}
        >
          <span>전송</span>
        </button>
      </div>
    </div>
  );
}
