import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "../error";
import { fetchPost } from "../actions/postActions";

const NoSSRPost = dynamic(() => import("./InfiniteScrollPost"), { ssr: false });

export default async function List() {
  let session = await getServerSession(authOptions);
  const result = await fetchPost({ page: 1 });
  return (
    <div className="list-bg">
      <Suspense fallback={<Loading />}>
        <NoSSRPost initialPost={result} session={session}></NoSSRPost>
      </Suspense>
    </div>
  );
}
