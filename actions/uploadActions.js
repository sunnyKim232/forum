"use server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function savePhotosToLocal(formData) {
  const files = formData.getAll("files");
  const multipleBuffersPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = file.type.split("/")[1];

      //   const uploadDir = path.join(process.cwd(), "public", `/${name}.${ext}`);

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
  try {
    const newFiles = await savePhotosToLocal(formData);

    const photos = await uploadPhotosToCloudinary(newFiles);

    // 업로드 후  temp 폴더에 있는 사진 삭제해줌 (?)
    newFiles.map((file) => fs.link(file.filepath));

    await delay(1000);
    revalidatePath("/photos");
  } catch (e) {
    return { errMsg: e.message };
  }
}

export async function getAllPhotos() {
  try {
    const { resources } = await cloudinary.v2.search
      .expression("folder:nextjs_upload/*")
      .sort_by("created_at", "desc")
      .max_results(500)
      .execute();
    return resources;
  } catch (e) {
    return { errMsg: e.message };
  }
}

export async function deletePhoto(public_id) {
  try {
    await cloudinary.v2.uploader.destroy(public_id);

    return { msg: "success!" };
  } catch (e) {
    return { errMsg: e.message };
  }
}

export async function revalidate(path) {
  revalidatePath(path);
}
