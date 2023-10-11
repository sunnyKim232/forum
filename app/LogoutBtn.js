"use client";

import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <button
      className="outlined"
      onClick={() => {
        signOut();
      }}
    >
      <span>logout</span>
    </button>
  );
}
