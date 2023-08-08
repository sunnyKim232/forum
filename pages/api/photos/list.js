import { connectDB } from "@/util/database";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request, response) {
  if (request.method === "GET") {
    const db = (await connectDB).db("forum");
    const result = await db.collection("photos").find().toArray();

    return response.status(200).json(result);
  }
  if (request.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      await saveFile(files.file);
      return res.status(201).send("");
    });
    const saveFile = async (file) => {
      const data = fs.readFileSync(file.path);
      fs.writeFileSync(`./public/${file.name}`, data);
      await fs.unlinkSync(file.path);
      return;
    };
    // const db = (await connectDB).db("forum");
    // const result = await db.collection("photos").find().toArray();

    return response.status(200).json(result);
  }
}
