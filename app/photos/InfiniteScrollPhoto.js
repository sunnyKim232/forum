"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PhotoItem from "./PhotoItem";
import { fetchPhoto } from "../../actions/photoActions";

const InfiniteScrollPhoto = ({ initialPhoto, session }) => {
  const [photos, setPhotos] = useState(initialPhoto);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  async function loadMorePhotos() {
    const next = page + 1;
    const photo = await fetchPhoto(next);
    if (photo?.length) {
      setPage(next);
      setPhotos((prev) => [...(prev?.length ? prev : []), ...photo]);
    }
  }
  useEffect(() => {
    if (inView) {
      loadMorePhotos();
    }
  }, [inView]);
  return (
    <>
      {photos.length >= 1 ? (
        photos.map((photo) => {
          return (
            <div key={photo.public_id}>
              <PhotoItem
                id={photo._id.toString()}
                url={photo.secure_url}
                role={session?.user.role}
                publicId={photo.public_id}
              />
            </div>
          );
        })
      ) : (
        <p>등록된 사진이 없습니다.</p>
      )}
      <div ref={ref}></div>
    </>
  );
};

export default InfiniteScrollPhoto;
