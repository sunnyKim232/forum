import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  const bodyValue = JSON.parse(request.body);
  if (request.method === "POST") {
    console.log(request.body);
    try {
      const db = (await connectDB).db("forum");
      await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(bodyValue.contentId) });
      return response.status(200).json("delete ok");
    } catch (e) {
      return response.status(500).json(e);
    }
  }
}
