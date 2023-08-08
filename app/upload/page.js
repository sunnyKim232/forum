import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ImageUpload from "./ImageUpload";

export default async function Upload() {
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
  return <ImageUpload />;
}
