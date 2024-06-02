import React, { forwardRef } from "react";
import { InputProps } from "../../types";

const Input: React.FC<InputProps> = forwardRef(
  (
    {
      className = "gogo__primary__button",
      type = "text",
      placeholder = "text...",
      ...props
    },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`${className}`}
        {...props}
        ref={ref}
      />
    );
  }
);

export default Input;
