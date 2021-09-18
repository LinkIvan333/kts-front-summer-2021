import React from "react";
import RepoTile from "@components/RepoTile";
import { RepoItem } from "@store/GitHubStore/types";
import { ROUTES } from "@config/config";
import { Link } from "react-router-dom";
import { useReposContext } from "@pages/ReposSearchPage/ReposSearchPage"

type RepoTileDrawerProps = {
  onClick: (element: RepoItem) => void;
}

const RepoTileDrawer: React.FC<RepoTileDrawerProps> = ({onClick}) => {
  const ReposContext = useReposContext();
  return(
    <>
    {ReposContext.list.map((element) => {
        return (
          <Link to={ROUTES.repos.create(element.id)} key={element.id}>
            <RepoTile item={element} _onClick={onClick} />
          </Link>
        );
      })}
  </>
  )
}
export default RepoTileDrawer