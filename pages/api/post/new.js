import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);
  if (request.method === "POST") {
    if (request.body.title == "" || request.body.content == "") {
      return response.status(500).json("제목과 내용을 확인해주세영");
    }
    try {
      if (session) {
        const db = (await connectDB).db("forum");
        await db
          .collection("post")
          .insertOne({ ...request.body, author: session.user.email });

        return response.redirect(302, "/list");
      }
    } catch (e) {
      return response.status(500).json(e);
    }
  }
}
