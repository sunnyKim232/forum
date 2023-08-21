"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { GoX } from "react-icons/go";
import ButtonSubmit from "./ButtonSubmit";
import { uploadPhoto } from "@/actions/uploadActions";

export default function ImageUpload({ userId }) {
  const formRef = useRef();
  const router = useRouter();

  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  async function handleInputFiles(e) {
    const files = e.target.files;
    const newFiles = [...files].filter((file) => {
      if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
        return file;
      } else {
        setMessage("1MB 보다 큰 파일을 업로드 할 수 없습니다.");
      }
    });

    setFiles((prev) => [...newFiles, ...prev]);
    formRef.current.reset();
  }

  async function handleUpload() {
    // 기존 프로젝트 내 폴더로 업로드 하는 api

    if (!files.length) return alert("파일을 선택해주세요");
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await uploadPhoto(formData);
  }

  function closeFn(index) {
    const newFiles = files.filter((_, i) => i != index);
    setFiles(newFiles);
  }

  // useEffect(() => {
  //   if (!imgRef.current) return;
  //   function dragoverFn(e) {
  //     e.preventDefault();
  //     this.style.backgroundColor = "#dee2e6";
  //     this.style.border = "1px dotted #228be6";
  //   }

  //   function dragleaveFn(e) {
  //     e.preventDefault();
  //     this.style.backgroundColor = "";
  //     this.style.border = "";
  //   }

  //   function dropFn(e) {
  //     console.log("drop");
  //     e.preventDefault();

  //     this.style.backgroundColor = "";
  //     this.style.border = "";
  //   }

  //   imgRef.current.addEventListener("dragover", dragoverFn);
  //   imgRef.current.addEventListener("dragleave", dragleaveFn);
  //   imgRef.current.addEventListener("drop", dropFn);
  // }, [previewImg]);

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
                <GoX onClick={() => closeFn(index)} />
              </>
            );
          })}
        </div>
        <p>{message}</p>
        <form ref={formRef} action={handleUpload}>
          <div style={{ border: "1px dotted black", height: "300px" }}>
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

          <ButtonSubmit value="upload" />
        </form>
      </div>
    </>
  );
}
