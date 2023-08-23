"use client";

import { deletePhoto, revalidate } from "@/actions/uploadActions";
import Image from "next/image";
import { useTransition } from "react";

export default function PhotoItem({ url, role, publicId }) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete(e) {
    await deletePhoto(publicId)
      .then((r) => {
        if (r.status == 200) {
          return r.json();
        } else {
          //서버가 에러코드전송시 실행할코드
        }
      })
      .then(() => {
        e.target.parentElement.parentElement.style.opacity = 0;
        setTimeout(() => {
          e.target.parentElement.parentElement.style.display = "none";
        }, 1000);

        revalidate("/photos");
      })
      .catch((error) => {
        //인터넷문제 등으로 실패시 실행할코드
        console.log(error);
      });
  }
  return (
    <>
      {/* <Link href={`/photos/${id}`} style={{ textDecoration: "none" }}> */}
      <div
        className="list-item"
        style={{ width: "510px", display: "flex", justifyContent: "center" }}
      >
        <div>
          <Image src={url} width="500" height="500" />
          {role == "admin" && (
            <span onClick={(e) => handleDelete(e)}>
              {isPending ? "Loading" : "🗑"}
            </span>
          )}
        </div>
      </div>
      {/* </Link> */}
    </>
  );
}
