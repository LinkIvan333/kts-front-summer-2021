import StarIcon from "@components/StarIcon";
import Avatar from "@components/Avatar";
import { RepoItem } from "@store/GitHubStore/types";
import "./RepoTile.css";

type RepoTileProps = {
  item: RepoItem;
  onClick: (e: React.MouseEvent) => void;
}

const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
  return (
    <div className="box" onClick={onClick}>
      <Avatar src={item.avatarUrl} letter={item.name.charAt(0).toUpperCase()} />
      <div className="git-card">
        <span className="git-name-card">{item.name}</span>
        <span className="git-company-card">{item.owner}</span>
        <StarIcon />
        <span className="git-views-card">{item.stars}</span>
        <span className="git-date-card">{item.updated}</span>
      </div>
    </div>
  );
};

export default RepoTile;