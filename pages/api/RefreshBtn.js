"use client";

import { useRouter } from "next/navigation";
import { AiOutlineRedo } from "react-icons/ai";

export default function RefreshButton() {
  let router = useRouter();
  return (
    <span
      onClick={() => {
        router.refresh();
      }}
      style={{ padding: "5px 10px 0 10px" }}
    >
      <AiOutlineRedo />
    </span>
  );
}
