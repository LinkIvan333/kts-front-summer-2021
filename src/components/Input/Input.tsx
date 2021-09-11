import "./Input.css";
import React from "react";

type InputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ value, placeholder, onChange, type }) => {

  return (
    <input
      type={type}
      className="git-name"
      placeholder={placeholder}
      onChange={onChange}
      value={value} />
  );
};

export default React.memo(Input);