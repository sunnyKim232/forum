"use client";
import Link from "next/link";
import DetailLink from "./DetailLink";
import DeleteBtn from "./DeleteBtn";

export default function ListItem({
  contentId,
  title,
  content,
  author,
  session,
}) {
  return (
    <>
      <div className="list-item" key={contentId}>
        <Link href={`/detail/${contentId}`} style={{ textDecoration: "none" }}>
          <h4>{title}</h4>
        </Link>
        <Link href={`/edit/${contentId}`}>✏️</Link>
        {(author != null && session != null && author == session.user.email) ||
          (session?.user?.role == "admin" && (
            <span
              onClick={(e) => {
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
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(() => {
                      e.target.parentElement.style.display = "none";
                    }, 1000);
                  })
                  .catch((error) => {
                    //인터넷문제 등으로 실패시 실행할코드
                    console.log(error);
                  });
              }}
            >
              🗑
            </span>
          ))}
        <p>{content}</p>
        <DetailLink />
      </div>
    </>
  );
}
