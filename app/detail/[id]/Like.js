"use client";

import { useEffect, useState } from "react";

export default function Like({ contentId }) {
  const [like, setLike] = useState();
  const [isLiked, setIsLiked] = useState(false);
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

  const isLikedBefore = () => {
    fetch("/api/like/isLiked?id=" + contentId)
      .then((r) => {
        if (r.status == 200) {
          return r.json();
        } else {
          //서버가 에러코드전송시 실행할코드
        }
      })
      .then((r) => {
        setIsLiked(r);
      })
      .catch((error) => {
        //인터넷문제 등으로 실패시 실행할코드
        console.log(error);
      });
  };

  const likeThisPost = () => {
    fetch("/api/like/new", {
      method: "POST",
      body: JSON.stringify({ contentId: contentId }),
    }).then(() => {
      countLike();
      isLikedBefore();
    });
  };
  useEffect(() => {
    countLike();
    isLikedBefore();
  }, []);

  const unlikeThisPost = () => {
    fetch("/api/like/new", {
      method: "POST",
      body: JSON.stringify({ contentId: contentId }),
    }).then(() => {
      countLike();
      isLikedBefore();
    });
  };
  return (
    <div>
      <p>좋아요 : {like}개</p>
      {isLiked ? (
        <button className="outlined" onClick={unlikeThisPost}>
          <span>좋아요 취소</span>
        </button>
      ) : (
        <button className="outlined" onClick={likeThisPost}>
          <span>좋아요</span>
        </button>
      )}
    </div>
  );
}
