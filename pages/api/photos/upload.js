import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formidable from "formidable";
import fs from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = async (req, saveLocally, session) => {
  let fileName = "";
  const options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "public/images");
    options.filename = (name, ext, path, form) => {
      fileName = Date.now().toString() + "_" + path.originalFilename;
      return fileName;
    };
  }

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
      const db = (await connectDB).db("forum");
      await db.collection("photos").insertOne({
        imageName: fileName,
        author: session.user.email,
        title: JSON.parse(fields.title[0]),
      });
    });
  });
};

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);
  if (request.method === "GET") {
    const db = (await connectDB).db("forum");
    const result = await db.collection("photos").find().toArray();

    return response.status(200).json(result);
  }
  if (request.method === "POST") {
    console.log("request: ", request.title);
    try {
      if (session) {
        await fs.readdir(path.join(process.cwd() + "/public", "/images"));
      }
    } catch (e) {
      await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
      response.status(200).json("성공");
    }
    await readFile(request, true, session);
    return response;
  }
}
