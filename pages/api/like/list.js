import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method === "GET") {
    try {
      const db = (await connectDB).db("forum");
      const result = await db
        .collection("like")
        .count({ content: new ObjectId(request.query.id) });
      return response.status(200).json(result);
    } catch (e) {
      return response.status(500).json(e);
    }
  }
}
