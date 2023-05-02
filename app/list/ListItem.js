"use client";

import Link from "next/link";
import DetailLink from "./DetailLink";

export default function ListItem({ contentId, title, content }) {
  return (
    <>
      <div className="list-item">
        <Link href={`/detail/${contentId}`} style={{ textDecoration: "none" }}>
          <h4>{title}</h4>
        </Link>
        <Link href={`/edit/${contentId}`}>✏️</Link>
        <span
          onClick={() => {
            fetch("/api/post/delete", {
              method: "POST",
              body: JSON.stringify({ contentId: contentId }),
            })
              .then((r) => {
                if (r.status == 200) {
                  return r.json();
                } else {
                  //서버가 에러코드전송시 실행할코드
                }
              })
              .then((result) => {
                //성공시 실행할코드
              })
              .catch((error) => {
                //인터넷문제 등으로 실패시 실행할코드
                console.log(error);
              });
          }}
        >
          🗑
        </span>
        <p>{content}</p>
        <DetailLink />
      </div>
    </>
  );
}
