import "./Button.css";
import "@styles/index.css";
import "@styles/variables.css";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  if (!disabled) {
    return (
      <button
        type="submit"
        className="search-button"
        onClick={onClick}
      >{children}</button>
    );
  }
  return (
    <button
      type="submit"
      className="search-button"
      disabled={true}
    >{children}</button>
  );
};

export default Button;