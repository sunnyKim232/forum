"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

const ButtonSubmit = ({ value, ...props }) => {
  const { pending } = useFormStatus();
  return (
    <button disable={pending} {...props} className="outlined">
      <span>{pending ? "loading.." : value}</span>
    </button>
  );
};

export default ButtonSubmit;
