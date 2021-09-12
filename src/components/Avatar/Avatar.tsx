import AvatarStyle from "./Avatar.module.scss";
import React from "react";

type AvatarProps = {
  src?: string;
  letter?: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, letter, alt }) => {
  if (!src) {
    return (
      <span className={`${AvatarStyle.companyAvatar} ${AvatarStyle.firstCompanyLetter}`}>{letter}</span>
    );
  }
  return (
    <img className={AvatarStyle.companyAvatar} src={src} alt={alt} />
  );
};

export default React.memo(Avatar);