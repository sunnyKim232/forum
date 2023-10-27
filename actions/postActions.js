"use server";

import { connectDB } from "@/util/database";
import { getPost } from "@/lib/mongo/post";

export async function fetchPost({ page }) {
  const { post } = await getPost({ page: page });
  return post;
}

export async function postCurrentOrder() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  result.sort((a, b) => a._id.getTimestamp() - b._id.getTimestamp());
  return response.status(200).json(result);
}

export async function postCommentOrder() {
  const db = (await connectDB).db("forum");
  let post = await db.collection("post").find().toArray();
  let comments = await db.collection("comment").find().toArray();

  const result = post.map((item) => {
    let count = 0;
    comments.map((comment) => {
      if (comment.parent.toString() == item._id.toString()) {
        count++;
      }
    });

    const newItem = { ...item, count: count };
    return newItem;
  });

  return result.sort((a, b) => b.count - a.count).slice(0, 3);
}

export async function postLikeOrder() {
  const db = (await connectDB).db("forum");
  let post = await db.collection("post").find().toArray();
  let likes = await db.collection("like").find().toArray();

  const result = post.map((item) => {
    let count = 0;
    likes.map((like) => {
      if (like.content.toString() == item._id.toString()) {
        count++;
      }
    });

    const newItem = { ...item, like: count };
    return newItem;
  });

  return result.sort((a, b) => b.like - a.like).slice(0, 3);
}
