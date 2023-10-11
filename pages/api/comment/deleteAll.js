import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method == "POST") {
    let session = await getServerSession(request, response, authOptions);
    if (!session) {
      return response.status(500).json("로그인해주세요");
    }
    let db = (await connectDB).db("forum");
    request.body = JSON.parse(request.body);
    await db
      .collection("comment")
      .deleteMany({ content: new ObjectId(request.body.contentId) })
      .toArray();

    return response.status(200).json("해당 게시글 좋아요 삭제");
  } else {
    return response.status(500).json("삭제 실패");
  }
}
