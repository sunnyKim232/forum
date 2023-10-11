import { getAllPhotos, getNextId, getPhoto } from "@/actions/uploadActions";
import PhotoDetail from "./PhotoDetail";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Link from "next/link";

export default async function main(props) {
  const photo = await getPhoto(props.params.id);

  // const prevId=

  const nextId = await getNextId(props.params.id);

  console.log(nextId);

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
        }}
      >
        {/* <Link href={`/photos/${prevId}`}>
        <AiOutlineLeft size={50} />
      </Link> */}

        <PhotoDetail url={photo.secure_url} />
        {/* <Link href={`/photos/${nextId._id.toString()}`}> */}
        {/* <AiOutlineRight size={50} /> */}
        {/* </Link> */}
      </div>
    </>
  );
}
