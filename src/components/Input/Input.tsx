import "./Input.css";
import "@styles/index.css";
import "@styles/variables.css";
import React from "react";

type InputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
}

const Input: React.FC<InputProps> = ({ value, placeholder, onChange }) => {

  return (
    <input
      type="text"
      className="git-name"
      placeholder={placeholder}
      onChange={onChange}
      value={value} />
  );
};

export default React.memo(Input);