"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { GoX } from "react-icons/go";

export default function ImageUpload({ userId }) {
  const imgRef = useRef();
  const router = useRouter();

  const [imageName, setImageName] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  async function handleInputFiles(e) {
    const files = e.target.files;
    const newFiles = [...files].filter((file) => {
      if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
        setMessage("1MB 보다 큰 파일을 업로드 할 수 없습니다.");
        return file;
      }
    });

    setFiles((prev) => [...newFiles, ...prev]);
  }

  async function handleUpload() {
    const body = new FormData();
    // body.append("image", file);
    body.append("title", JSON.stringify(title));

    try {
      await fetch("/api/photos/upload", {
        method: "POST",
        body: body,
      }).then((res) => {
        router.push("/photos");
      });
    } catch (e) {
      console.log(e);
    }
  }

  function closeFn() {
    setPreviewImg("");
    setImageName("");
    // setFile(null);
  }

  useEffect(() => {
    if (!imgRef.current) return;
    function dragoverFn(e) {
      e.preventDefault();
      this.style.backgroundColor = "#dee2e6";
      this.style.border = "1px dotted #228be6";
    }

    function dragleaveFn(e) {
      e.preventDefault();
      this.style.backgroundColor = "";
      this.style.border = "";
    }

    function dropFn(e) {
      console.log("drop");
      e.preventDefault();

      this.style.backgroundColor = "";
      this.style.border = "";
      setPreviewImg(URL.createObjectURL(e.dataTransfer.files[0]));
      // setFile(e.dataTransfer.files[0]);
    }

    imgRef.current.addEventListener("dragover", dragoverFn);
    imgRef.current.addEventListener("dragleave", dragleaveFn);
    imgRef.current.addEventListener("drop", dropFn);
  }, [previewImg]);

  return (
    <>
      <div className="p-20" style={{ width: "50rem" }}>
        <h4>사진 업로드 페이지 입니다.</h4>

        <div>
          {files.map((file, index) => {
            let imageUrl = URL.createObjectURL(file);
            return (
              <>
                <Image src={imageUrl} alt="image" width={200} height={200} />
                <GoX onClick={closeFn} />
              </>
            );
          })}
        </div>
        {message ?? <p>{message}</p>}
        <div
          ref={imgRef}
          style={{ border: "1px dotted black", height: "300px" }}
        >
          <label htmlFor="fileUpload">
            <p>클릭하거나 드래그하여 업로드</p>
          </label>
          <input
            id="fileUpload"
            type="file"
            name="image"
            placeholder="이미지"
            accept="image/*"
            multiple
            style={{ display: "none", width: "100%" }}
            onChange={(e) => {
              handleInputFiles(e);
            }}
          />
        </div>

        <button onClick={handleUpload}>제출</button>
      </div>
    </>
  );
}
