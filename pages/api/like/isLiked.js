import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  if (request.method === "GET") {
    try {
      let session = await getServerSession(request, response, authOptions);
      const db = (await connectDB).db("forum");
      const result = await db.collection("like").findOne({
        content: new ObjectId(request.query.id),
        author: new ObjectId(session.user._id),
      });
      return response.status(200).json(result ? true : false);
    } catch (e) {
      return response.status(500).json(e);
    }
  }
}
