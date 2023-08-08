"use client";

import Image from "next/image";
export default function PhotoItem() {
  const blobUrl =
    "/re_d657bd1b-704e-4678-b774-a78ff035ac7ckarsten-winegeart-NE0XGVKTmcA-unsplash.jpg";

  return (
    <>
      <div className="list-item">
        <Image src={blobUrl} width="500" height="500" />
      </div>
    </>
  );
}
