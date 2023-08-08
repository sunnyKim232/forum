import { connectDB } from "@/util/database";
import PhotoItem from "./PhotoItem";

export const revalidate = 20;

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  return (
    <div className="list-bg">
      {result.map((item) => {
        return (
          <PhotoItem
          // contentId={item._id.toString()}
          // title={item.title}
          // content={item.content}
          />
        );
      })}
    </div>
  );
}
