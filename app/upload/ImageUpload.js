"use client";

import React, { useEffect, useRef, useState } from "react";
import { GoX } from "react-icons/go";

export default function ImageUpload({ userId }) {
  const imgRef = useRef();

  const [imageName, setImageName] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  async function handleUpload() {
    const body = new FormData();
    body.append("image", file);
    body.append("title", JSON.stringify(title));

    try {
      await fetch("/api/photos/upload", {
        method: "POST",
        body: body,
      }).then((res) => {
        console.log(res);
      });
    } catch (e) {
      console.log(e);
    }
  }

  function closeFn() {
    setPreviewImg("");
    setImageName("");
    setFile(null);
  }

  useEffect(() => {
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
      setFile(e.dataTransfer.files[0]);
    }

    imgRef.current.addEventListener("dragover", dragoverFn);
    imgRef.current.addEventListener("dragleave", dragleaveFn);
    imgRef.current.addEventListener("drop", dropFn);
  }, [previewImg]);

  return (
    <div className="p-20" style={{ width: "50rem" }}>
      <h4>사진 업로드 페이지 입니다.</h4>
      <input
        name="title"
        placeholder="제목"
        style={{ width: "100%" }}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      {previewImg ? (
        <>
          <img src={previewImg} alt="preview" width="300px" />
          <GoX onClick={closeFn} />
          <p>{imageName}</p>
        </>
      ) : (
        <>
          <div ref={imgRef} style={{ border: "1px dotted black" }}>
            <label htmlFor="fileUpload">
              <p>클릭하거나 드래그하여 업로드</p>
            </label>
            <input
              id="fileUpload"
              type="file"
              name="image"
              placeholder="이미지"
              style={{ display: "none", width: "100%" }}
              onChange={(e) => {
                const file = e.target.files[0];
                setPreviewImg(URL.createObjectURL(file));
                setFile(file);
              }}
            />
          </div>
        </>
      )}
      <button onClick={handleUpload}>제출</button>
    </div>
  );
}
