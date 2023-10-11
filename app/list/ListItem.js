"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ListItem({
  contentId,
  title,
  content,
  author,
  session,
}) {
  const [commentLength, setCommentLength] = useState(0);
  const getLikeCount = () => {
    fetch("/api/comment/list?id=" + contentId)
      .then((r) => {
        if (r.status == 200) {
          return r.json();
        } else {
          //서버가 에러코드전송시 실행할코드
        }
      })
      .then((r) => {
        setCommentLength(r.length);
      })
      .catch((error) => {
        //인터넷문제 등으로 실패시 실행할코드
        return 0;
      });
  };
  function handleDelete(e) {
    // fetch("/api/post/delete", {
    //   method: "POST",
    //   body: JSON.stringify({ contentId: contentId }),
    // })
    //   .then((r) => {
    //     if (r.status == 200) {
    //       return r.json();
    //     } else {
    //       //서버가 에러코드전송시 실행할코드
    //     }
    //   })
    //   .then(() => {
    //     e.target.parentElement.style.opacity = 0;
    //     setTimeout(() => {
    //       e.target.parentElement.style.display = "none";
    //     }, 1000);
    //   })
    //   .catch((error) => {
    //     //인터넷문제 등으로 실패시 실행할코드
    //     console.log(error);
    //   });
    fetch("/api/delete/" + contentId)
      .then((r) => {
        if (r.status == 200) {
          return r.json();
        } else {
          //서버가 에러코드전송시 실행할코드
        }
      })
      .then(() => {
        e.target.parentElement.parentElement.parentElement.style.opacity = 0;
        setTimeout(() => {
          e.target.parentElement.parentElement.parentElement.style.display =
            "none";
        }, 1000);
      })
      .catch((error) => {
        //인터넷문제 등으로 실패시 실행할코드
        console.log(error);
      });
  }

  useEffect(() => {
    getLikeCount();
  }, []);
  return (
    <>
      <div className="list-item" key={contentId}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Link
            href={`/detail/${contentId}`}
            style={{ textDecoration: "none" }}
          >
            <h4>
              {title} ({commentLength})
            </h4>
          </Link>
          <div>
            {(author != null &&
              session != null &&
              author == session?.user.email) ||
            session?.user?.role == "admin" ? (
              <button className="outlined">
                <Link href={`/edit/${contentId}`}>
                  <span>✏️ 수정</span>
                </Link>
              </button>
            ) : (
              <></>
            )}

            {(author != null &&
              session != null &&
              author == session?.user.email) ||
            session?.user?.role == "admin" ? (
              <button className="outlined" onClick={(e) => handleDelete(e)}>
                <span>🗑 삭제</span>
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>

        <p>{content}</p>
      </div>
    </>
  );
}
