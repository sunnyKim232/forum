"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

const ButtonSubmit = ({ value, ...props }) => {
  const { pending } = useFormStatus();
  return (
    <button disable={pending} {...props}>
      {pending ? "loading.." : value}
    </button>
  );
};

export default ButtonSubmit;
