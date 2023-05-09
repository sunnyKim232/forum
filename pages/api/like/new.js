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
    //만약 이미 누른 게시물이라면 중복으로 불가능하게 할것
    request.body = JSON.parse(request.body);
    const likeList = await db
      .collection("like")
      .find({ content: new ObjectId(request.body.contentId) })
      .toArray();

    let check = true;

    likeList.map((item) => {
      if (item.author.toString() == session.user._id) {
        check = false;
      }
    });

    if (check) {
      let result = {
        content: new ObjectId(request.body.contentId),
        author: new ObjectId(session.user._id),
      };

      await db.collection("like").insertOne(result);
      return response.status(200).json("좋아요 누름");
    } else {
      return response.status(500).json("이미 누른 게시글입니다.");
    }
  }
}
