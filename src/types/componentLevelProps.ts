import React from "react";

/**
 * All the component level props types are found here Accept product, board and task related props ;
 * @note : If you need thte props related to the product, board and task pages and components you can visit the (Product.ts)
 */

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  className?: string;
  text?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  onChange? : (e: React.ChangeEvent<HTMLInputElement>) => void;
  value? :string;
}


export interface UpdateCompProps {
  hideUpdateComp: (e:React.MouseEvent<HTMLDivElement>) => void;
}