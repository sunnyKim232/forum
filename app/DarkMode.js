"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DarkMode() {
  let router = useRouter();
  useEffect(() => {
    let cookie = ("; " + document.cookie).split(`; mode=`).pop().split(";")[0];
    if (cookie == "")
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
  }, []);

  let cookie = ("; " + document.cookie).split(`; mode=`).pop().split(";")[0];
  return (
    <>
      {cookie == "light" ? (
        <span
          onClick={() => {
            document.cookie = "mode=dark; max-age=" + 3600 * 24 * 400;
            router.refresh();
          }}
        >
          🌙
        </span>
      ) : (
        <span
          onClick={() => {
            document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
            router.refresh();
          }}
        >
          ☀️
        </span>
      )}
    </>
  );
}
