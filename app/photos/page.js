import PhotoItem from "./PhotoItem";
import { getAllPhotos } from "@/actions/uploadActions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function List() {
  // const db = (await connectDB).db("forum");
  // let result = await db.collection("photos").find().toArray();

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
            <>
              <PhotoItem
                url={photo.secure_url}
                role={session.user.role}
                publicId={photo.public_id}
              />
            </>
          );
        })
      ) : (
        <p>등록된 사진이 없습니다.</p>
      )}
    </div>
  );
}
