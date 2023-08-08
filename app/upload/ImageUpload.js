"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ImageUpload() {
  const imgRef = useRef();

  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  function uploadToClient(e) {}

  function handleUpload() {}

  const previewFn = (file) => {
    const target = file.files[0];
    console.log(target.type.split("/")[0]);

    if (
      target.name.split(".")[1].toLowerCase() !== "jpg" &&
      target.name.split(".")[1].toLowerCase() !== "png" &&
      target.name.split(".")[1].toLowerCase() !== "jpeg" &&
      target.name.split(".")[1].toLowerCase() !== "mp4"
    ) {
      file.value = "";
      setPreviewImg("");
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file.files[0]);
    fileReader.onloadend = () => {
      const previewImgUrl = fileReader.result;
      setPreviewImg(previewImgUrl);
    };
  };

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
      previewFn(e.dataTransfer);
    }

    imgRef.current.addEventListener("dragover", dragoverFn);
    imgRef.current.addEventListener("dragleave", dragleaveFn);
    imgRef.current.addEventListener("drop", dropFn);
  }, [image]);

  return (
    <div className="p-20">
      <h4>사진 업로드 페이지 입니다.</h4>
      {previewImg ? (
        <img src={previewImg} alt="preview" width="300px" />
      ) : (
        <></>
      )}

      <form>
        <input name="title" placeholder="제목"></input>
        <div ref={imgRef}>
          <label>
            <p>클릭하거나 드래그하여 업로드</p>
          </label>
          <input
            type="file"
            name="image"
            placeholder="이미지"
            style={{ display: "none", width: "100%" }}
            onChange={(e) => {
              previewFn(e.target);
              setImage(e.target.files[0]);
            }}
          />
        </div>

        <button onClick={handleUpload}>제출</button>
      </form>
    </div>
  );
}
