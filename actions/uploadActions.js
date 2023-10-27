"use server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import Photo from "@/models/photoModel";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET,
});

async function savePhotosToLocal(formData) {
  const files = formData.getAll("files");
  const multipleBuffersPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = file.type.split("/")[1];

      const tempDir = os.tmpdir();
      const uploadDir = path.join(tempDir, `/${name}.${ext}`);

      fs.writeFile(uploadDir, buffer);

      return { filepath: uploadDir, filename: file.name };
    })
  );
  return Promise.all(multipleBuffersPromise);
}

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

async function uploadPhotosToCloudinary(newFiles) {
  const multiplePhotosPromise = newFiles.map((file) =>
    cloudinary.v2.uploader.upload(file.filepath, { folder: "nextjs_upload" })
  );

  return await Promise.all(multiplePhotosPromise);
}

export async function uploadPhoto(formData) {
  let session = await getServerSession(authOptions);
  try {
    if (session) {
      // local 파일 저장
      const newFiles = await savePhotosToLocal(formData);

      // claudinary 에 파일 저장
      const photos = await uploadPhotosToCloudinary(newFiles);
      // 업로드 후  temp 폴더에 있는 사진 삭제해줌 (?)
      newFiles.map((file) => fs.link(file.filepath));

      // // db 저장

      const newPhotos = photos.map((photo) => {
        const newPhoto = new Photo({
          public_id: photo.public_id,
          secure_url: photo.secure_url,
          author: session.user.email,
          createdDate: new Date().toISOString(),
          width: photo.width,
          height: photo.height,
        });
        return newPhoto;
      });

      const db = (await connectDB).db("forum");
      await db.collection("photos").insertMany(newPhotos);

      await delay(1000);
    }
  } catch (e) {
    return { errMsg: e.message };
  }
}

export async function revalidate(path) {
  revalidatePath(path);
}

export async function getNextId(id) {
  const db = (await connectDB).db("forum");
  const allPhotos = await db.collection("photos").find().toArray();

  const findCurrentDocument = allPhotos.forEach((photo, index) => {
    return photo._id.toString() == photo ? 1 : 0;
  });

  // const db = (await connectDB).db("forum");

  // const nextDocument = db
  //   .collection("photos")
  //   .find({ _id: new ObjectId() })
  //   .sort({ _id: 1 })
  //   .limit(2)
  //   .toArray();

  // return nextDocument;
  console.log(findCurrentDocument);
  // return findCurrentDocument;
}
