"use client";

import { useEffect, useState } from "react";

export default function Like({ contentId }) {
  const [like, setLike] = useState();
  const countLike = () => {
    fetch("/api/like/list?id=" + contentId)
      .then((r) => {
        if (r.status == 200) {
          return r.json();
        } else {
          //서버가 에러코드전송시 실행할코드
        }
      })
      .then((r) => {
        setLike(r);
      })
      .catch((error) => {
        //인터넷문제 등으로 실패시 실행할코드
        console.log(error);
      });
  };

  useEffect(() => {
    countLike();
  }, []);
  return (
    <div>
      <p>좋아요 : {like}개</p>
      <button
        onClick={() => {
          fetch("/api/like/new", {
            method: "POST",
            body: JSON.stringify({ contentId: contentId }),
          }).then(() => {
            countLike();
          });
        }}
      >
        좋아요
      </button>
    </div>
  );
}
