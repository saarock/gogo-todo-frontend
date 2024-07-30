import React from "react";
import { ButtonProps } from "../../types";
import "./button.css"
const Button: React.FC<ButtonProps> = ({
  className = "gogo__primary__button",
  text = "primary button",
  type = "button",
  icon,
  ...props
}) => {

  return <button className={`${className} gogo__normal__button__css`} type={type} {...props}>{text}{icon}</button>;
};

export default Button;
