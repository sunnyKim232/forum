import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method === "POST") {
    if (request.body.userid == "" || request.body.userpw == "") {
      return response.status(500).json("아이디와 비밀번호는 필수값임니다");
    }
    try {
      const db = (await connectDB).db("forum");
      const members = await db.collection("member").find().toArray();

      await members.map(async ({ userid }) => {
        if (userid == request.body.userid) {
          return response.status(500).json("이미 존재하는 아이디입니다!!");
        } else {
          await db.collection("member").insertOne(request.body);
          return response.redirect(302, "/list");
        }
      });
    } catch (e) {
      return response.status(500).json(e);
    }
  }
}
