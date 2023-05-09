import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Write() {
  let session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div>
        <p>로그인 해주세요.</p>
        <Link href="/" className="logo">
          메인페이지로 이동
        </Link>
      </div>
    );
  }
  return (
    <div className="p-20">
      <h4>글 작성 페이지입니다</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="제목"></input>
        <input name="content" placeholder="내용"></input>
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
