import { postCommentOrder, postLikeOrder } from "@/app/actions/postActions";
import PostTable from ".//common/PostTable";

export default async function Home() {
  const commentOrderPost = await postCommentOrder();
  const likeOrderPost = await postLikeOrder();
  return (
    <div className="list-bg">
      <PostTable header="댓글이 많은 게시글" list={commentOrderPost} />
      <PostTable header="좋아요가 많은 게시글" list={likeOrderPost} />
    </div>
  );
}
