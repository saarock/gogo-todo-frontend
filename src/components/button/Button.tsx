import React from "react";
import { ButtonProps } from "../../types";

const Button: React.FC<ButtonProps> = ({
  className = "gogo__primary__button",
  text = "primary button",
  type = "button",
  ...props
}) => {
  return <button className={`${className}`} type={type} {...props}>{text}</button>;
};

export default Button;
