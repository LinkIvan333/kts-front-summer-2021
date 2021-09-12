import StarIcon from "@components/StarIcon";
import Avatar from "@components/Avatar";
import { RepoItem } from "@store/GitHubStore/types";
import RepoTileStyle from "./RepoTile.module.scss";

type RepoTileProps = {
  item: RepoItem;
  onClick: (e: React.MouseEvent) => void;
}

const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
  return (
    <div className={RepoTileStyle.box} onClick={onClick}>
      <Avatar src={item.avatarUrl} letter={item.name.charAt(0).toUpperCase()} />
      <div className={RepoTileStyle.gitCard}>
        <span className={RepoTileStyle.gitNameCard}>{item.name}</span>
        <span className={RepoTileStyle.gitCompanyCard}>{item.owner}</span>
        <StarIcon />
        <span className={RepoTileStyle.gitViewsCard}>{item.stars}</span>
        <span className={RepoTileStyle.gitDateCard}>{item.updated}</span>
      </div>
    </div>
  );
};

export default RepoTile;