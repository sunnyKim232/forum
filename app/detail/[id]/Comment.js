"use client";

import { useEffect, useRef, useState } from "react";

export default function Comment({ id }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const commentInputRef = useRef();

  const readCommentList = () => {
    fetch("/api/comment/list?id=" + id)
      .then((r) => {
        if (r.status == 200) {
          console.log("리스트 성공", r);
          return r.json();
        } else {
          //서버가 에러코드전송시 실행할코드
        }
      })
      .then((r) => {
        console.log(r);
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
                {item.author}: {item.comment}
              </p>
            </div>
          );
        })
      ) : (
        <></>
      )}

      <input
        ref={commentInputRef}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></input>
      <button
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
        전송
      </button>
    </div>
  );
}
