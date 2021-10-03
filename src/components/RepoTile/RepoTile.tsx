import StarIcon from "components/StarIcon";
import Avatar from "components/Avatar";
import { RepoItemModel } from "models/gitHub"
import RepoTileStyle from "./RepoTile.module.scss";
import React from "react";

type RepoTileProps = {
  item: RepoItemModel;
  _onClick: (id: number) => void;
}

const RepoTile: React.FC<RepoTileProps> = ({ item, _onClick }) => {
  const onClick = (e: React.MouseEvent) => {
    _onClick(item.id);
  }
  return (
    <div className={RepoTileStyle.box} onClick={onClick}>
      <Avatar src={item.owner.avatarUrl} letter={item.name.charAt(0).toUpperCase()} />
      <div className={RepoTileStyle.gitCard}>
        <span className={RepoTileStyle.gitNameCard}>{item.name}</span>
        <span className={RepoTileStyle.gitCompanyCard}>{item.owner.login}</span>
        <StarIcon />
        <span className={RepoTileStyle.gitViewsCard}>{item.stars}</span>
        <span className={RepoTileStyle.gitDateCard}>{item.updated}</span>
      </div>
    </div>
  );
};

export default React.memo(RepoTile);