import Image from "next/image";

export default async function main() {
  return (
    <Image
      src="https://res.cloudinary.com/demo/image/upload/v1/samples/sample"
      alt="Cloudinary Image"
    />
  );
}
