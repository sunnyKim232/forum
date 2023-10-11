import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method === "GET") {
    const db = (await connectDB).db("forum");
    const result = await db
      .collection("post")
      .find()
      .sort({ _id: -1 })
      .toArray();

    return response.status(200).json(result);
  }
}
