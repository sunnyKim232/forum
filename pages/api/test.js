import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method === "POST") {
    console.log(request.body);
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").insertOne(request.body);

    return result.status(200).redirect("/list");
  }
  console.log("test!!!", request.query);
}
