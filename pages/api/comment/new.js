import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method == "POST") {
    if (request.body == "") {
      return response.status(500).json("댓글을 달아주셈");
    }

    let session = await getServerSession(request, response, authOptions);
    if (session == null) {
      return response.status(500).json("로그인해주세요");
    }
    request.body = JSON.parse(request.body);
    let result = {
      comment: request.body.comment,
      parent: new ObjectId(request.body.contentId),
      author: session.user.email,
      name: session.user.name,
    };
    let db = (await connectDB).db("forum");
    await db.collection("comment").insertOne(result);
    return response.status(200).json("댓글성공");
  }
}
