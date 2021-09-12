import ButtonStyle from "./Button.module.scss";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  type?: "reset" | "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, type }) => {
  return (
    <button
      type={type}
      className={ButtonStyle.searchButton}
      onClick={onClick}
      disabled={disabled}
    >{children}</button>
  );
};

export default Button;