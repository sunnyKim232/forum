import { getPhoto } from "@/actions/photoActions";
import PhotoDetail from "./PhotoDetail";

export default async function main(props) {
  const photo = await getPhoto(props.params.id);

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
        }}
      >
        <PhotoDetail url={photo.secure_url} />
      </div>
    </>
  );
}
