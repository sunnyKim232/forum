import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  return (
    <div>
      <h4>수정페이지</h4>
      <form action="/api/post/edit" method="POST">
        <input
          name="title"
          placeholder="제목"
          defaultValue={result.title}
        ></input>
        <input
          name="content"
          placeholder="내용"
          defaultValue={result.content}
        ></input>
        <input
          name="contentId"
          value={result._id.toString()}
          style={{ display: "none" }}
          readOnly
        ></input>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
