"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

export default function DarkMode({ current }) {
  let router = useRouter();
  useEffect(() => {
    let cookie = ("; " + document.cookie).split(`; mode=`).pop().split(";")[0];
    if (cookie == "")
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
  }, []);

  return (
    <div style={{ padding: "5px 0px 0px 10px" }}>
      {current == "light" ? (
        <span
          onClick={() => {
            document.cookie = "mode=dark; max-age=" + 3600 * 24 * 400;
            router.refresh();
          }}
        >
          <BsFillMoonFill />
        </span>
      ) : (
        <span
          onClick={() => {
            document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
            router.refresh();
          }}
        >
          <BsFillSunFill />
        </span>
      )}
    </div>
  );
}
