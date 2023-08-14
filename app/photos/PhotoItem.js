"use client";

import Image from "next/image";
export default function PhotoItem({ url, title }) {
  return (
    <>
      <div className="list-item">
        <Image src={url} width="500" height="500" />
      </div>
    </>
  );
}
