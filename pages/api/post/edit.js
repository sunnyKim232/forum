import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  console.log(request.body);
  if (request.method === "POST") {
    if (request.body.title == "" || request.body.content == "") {
      return response.status(500).json("제목과 내용을 확인해주세영");
    }
    try {
      const db = (await connectDB).db("forum");
      await db
        .collection("post")
        .updateOne(
          { _id: new ObjectId(request.body.contentId) },
          { $set: { title: request.body.title, content: request.body.content } }
        );
      return response.redirect(302, "/list");
    } catch (e) {
      return response.status(500).json(e);
    }
  }
}
