import PhotoItem from "./PhotoItem";
import { getAllPhotos } from "@/actions/uploadActions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";

export default async function List() {
  let session = await getServerSession(authOptions);

  const photos = await getAllPhotos();

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

      {photos.length >= 1 ? (
        photos.map((photo) => {
          return (
            <div key={photo.public_id}>
              <PhotoItem
                id={photo._id.toString()}
                url={photo.secure_url}
                role={session?.user.role}
                publicId={photo.public_id}
              />
            </div>
          );
        })
      ) : (
        <p>등록된 사진이 없습니다.</p>
      )}
    </div>
  );
}
