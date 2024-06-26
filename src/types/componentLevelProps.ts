import React from "react";
import { IconBaseProps, IconType } from "react-icons";

/**
 * All the component level props types are found here Accept product, board and task related props ;
 * @note : If you need thte props related to the product, board and task pages and components you can visit the (Product.ts)
 */

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: IconType;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  placeholder?: string;
  onChange? : (e: React.ChangeEvent<HTMLInputElement>) => void;
  value? :string;
}


export interface UpdateCompProps {
  hideUpdateComp: (e:React.MouseEvent<HTMLDivElement>) => void;
  onChangeEventForUpdateTheProductName: (e:React.ChangeEvent<HTMLInputElement>) => void;
  productName: string;
  updateClick: (e:React.MouseEvent<HTMLButtonElement>)=> void;


}