import React from "react";

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  className?: string;
  text?: string;
  type?: "button" | "submit" | "reset";
  disabled: boolean;
}

export interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
}
