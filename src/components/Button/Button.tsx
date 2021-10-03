import ButtonStyle from "./Button.module.scss";
import React from "react";
import { Meta } from "utils/meta";

type ButtonProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  disabled?: Meta;
  type?: "reset" | "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, type }) => {
  return (
    <button
      type={type}
      className={ButtonStyle.searchButton}
      onClick={onClick}
      disabled={disabled === Meta.loading}
    >{children}</button>
  );
};

export default Button;