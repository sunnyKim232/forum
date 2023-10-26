"use server";

import { getPhotos } from "@/lib/mongo/photo";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export async function fetchPhoto(page) {
  const { photo } = await getPhotos({ page: page });
  return photo;
}

export async function deletePhoto(public_id) {
  try {
    const db = (await connectDB).db("forum");
    await db.collection("photos").deleteOne({ _id: new ObjectId(public_id) });

    await cloudinary.v2.uploader.destroy(public_id);

    return { msg: "success!" };
  } catch (e) {
    return { errMsg: e.message };
  }
}

export async function getPhoto(id) {
  try {
    // cloudinary 에서 찾아서 보여주는건 로딩 시간이 오래걸림
    // const { resources } = await cloudinary.v2.search
    //   .expression("folder:nextjs_upload/*")
    //   .sort_by("created_at", "desc")
    //   .max_results(500)
    //   .execute();

    const db = (await connectDB).db("forum");
    const photo = await db
      .collection("photos")
      .findOne({ _id: new ObjectId(id) });

    return photo;
  } catch (e) {
    return { errMsg: e.message };
  }
}
