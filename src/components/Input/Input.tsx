import InputStyle from "./Input.module.scss";
import React from "react";

type InputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  value: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ value, placeholder, onChange, onKeyDown, type }) => {

  return (
    <input
      type={type}
      className={InputStyle.gitName}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value} />
  );
};

export default React.memo(Input);