"use client";

import { signIn, signOut } from "next-auth/react";

export default function LoginBtn() {
  return (
    <button
      className="outlined"
      onClick={() => {
        signIn();
      }}
    >
      <span>login</span>
    </button>
  );
}
