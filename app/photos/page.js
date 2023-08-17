import { connectDB } from "@/util/database";
import PhotoItem from "./PhotoItem";

export const revalidate = 20;

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("photos").find().toArray();
  return (
    <div
      className="list-bg"
      style={{ width: "100%", display: "flex", flexWrap: "wrap" }}
    >
      {result.reverse().length >= 1 ? (
        result.map((item) => {
          return (
            <PhotoItem
              url={"/images/" + item.imageName}
              title={item.title}
              id={item._id.toString()}
            />
          );
        })
      ) : (
        <p>등록된 사진이 없습니다.</p>
      )}
    </div>
  );
}
