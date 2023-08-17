"use client";

import Image from "next/image";
import Link from "next/link";
export default function PhotoItem({ url, title, id }) {
  return (
    <>
      <Link href={`/photos/${id}`} style={{ textDecoration: "none" }}>
        <div
          className="list-item"
          style={{ width: "510px", display: "flex", justifyContent: "center" }}
        >
          <Image src={url} width="500" height="500" />
        </div>
      </Link>
    </>
  );
}
