import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method === "POST") {
    if (request.body.title == "" || request.body.content == "") {
      return response.status(500).json("제목과 내용을 확인해주세영");
    }
    try {
      const db = (await connectDB).db("forum");
      await db.collection("post").insertOne(request.body);

      return response.redirect(302, "/list");
    } catch (e) {
      return response.status(500).json(e);
    }
  }
}
