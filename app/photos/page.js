import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { fetchPhoto } from "../../actions/photoActions";
import dynamic from "next/dynamic";

const NoSSRPhoto = dynamic(() => import("./InfiniteScrollPhoto"), {
  ssr: false,
});

export default async function List() {
  let session = await getServerSession(authOptions);

  const photos = await fetchPhoto();

  return (
    <div
      className="list-bg"
      style={{ width: "100%", display: "flex", flexWrap: "wrap" }}
    >
      {/* {result.reverse().length >= 1 ? (
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
      )} */}
      <NoSSRPhoto initialPhoto={photos} session={session} />
    </div>
  );
}
