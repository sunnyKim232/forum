import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(request, response) {
  if (request.method == "POST") {
    if (
      request.body.email == "" ||
      request.body.name == "" ||
      request.body.password == ""
    ) {
      return response
        .status(500)
        .json("이름, 이메일, 패스워드는 기본 입력값입니다.");
    }
    // 같은 이메일이 있는지 조회
    let db = (await connectDB).db("forum");
    let findEmail = (await db
      .collection("user_cred")
      .findOne({ email: request.body.email }))
      ? true
      : false;

    if (findEmail != false) {
      return response.status(500).json("이미 존재하는 이메일입니다.");
    }

    let hash = await bcrypt.hash(request.body.password, 10);
    request.body.password = hash;

    await db
      .collection("user_cred")
      .insertOne({ ...request.body, role: "user" });
    return response.status(200).json("가입성공");
  }
}
