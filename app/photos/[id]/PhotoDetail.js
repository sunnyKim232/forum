"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const PhotoDetail = ({ url }) => {
  const myref = useRef(null);
  useEffect(() => {
    myref.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, []);
  return (
    <Image
      ref={myref}
      src={url}
      objectFit="contain"
      fill
      sizes="(max-height: 640px) 100vw,
      (max-height: 1280px) 50vw,
      (max-height: 1536px) 33vw,
      25vw"
    />
  );
};

export default PhotoDetail;
