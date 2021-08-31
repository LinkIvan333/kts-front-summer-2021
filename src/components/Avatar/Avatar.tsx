import "./Avatar.css";
import "@styles/index.css";
import "@styles/variables.css";
import React from "react";

type AvatarProps = {
  src?: string;
  letter?: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, letter, alt }) => {
  if (src == null) {
    return (
      <span className="first-company-letter">{letter}</span>
    );
  }
  return (
    <img className="company-avatar" src={src} alt={alt} />
  );
};

export default React.memo(Avatar);