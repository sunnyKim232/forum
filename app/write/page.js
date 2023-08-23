import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Write() {
  let session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="list-bg">
        <p>로그인 해주세요.</p>
        <Link href="/" className="logo">
          메인페이지로 이동
        </Link>
      </div>
    );
  }
  return (
    <div className="list-bg">
      <h4>글 작성 페이지입니다</h4>
      <div style={{ width: "50%" }}>
        <form action="/api/post/new" method="POST">
          <input
            name="title"
            placeholder="제목"
            style={{ width: "100%" }}
          ></input>
          <input
            name="content"
            placeholder="내용"
            style={{ width: "100%", height: "100px" }}
          ></input>
          <button type="submit">제출</button>
        </form>
      </div>
    </div>
  );
}
