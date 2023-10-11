import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";
import Like from "./Like";
import { notFound } from "next/navigation";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  if (result === null) {
    return notFound();
  }

  return (
    <div className="list-bg">
      <div style={{ backgroundColor: "black", color: "white", padding: "2px" }}>
        <h4>{result.title}</h4>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span>
          {new ObjectId(props.params.id).getTimestamp().toLocaleDateString()}
          {new ObjectId(props.params.id).getTimestamp().toLocaleTimeString()}
        </span>
        <span>{result.author}</span>
      </div>

      <hr />
      <p>{result.content}</p>
      <br />

      <Like contentId={props.params.id} />
      <Comment id={props.params.id} />
    </div>
  );
}
