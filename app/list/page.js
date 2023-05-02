import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  return (
    <div className="list-bg">
      {result.map((item) => {
        return (
          <ListItem
            contentId={item._id.toString()}
            title={item.title}
            content={item.content}
          />
        );
      })}
    </div>
  );
}
