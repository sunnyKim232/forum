import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method === "GET") {
    try {
      const db = (await connectDB).db("forum");
      await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(request.query.contentId) });

      await db
        .collection("like")
        .deleteMany({ content: new ObjectId(request.query.contentId) });
      await db
        .collection("comment")
        .deleteMany({ parent: new ObjectId(request.query.contentId) });

      return response.status(200).json("delete ok");
    } catch (e) {
      return response.status(500).json(e);
    }
  }
}
