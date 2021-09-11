import "./RepoBranchesDrawer.css";
import "@config/config";
import React from "react";
import { RepoItem, BranchItem } from "@store/GitHubStore/types";
import GitHubStore from "@store/GitHubStore/GitHubStore";
import { Drawer } from "antd";
import { MAIN_CONST } from "@config/config";

const gitHubStore = new GitHubStore();

type RepoBranchesDrawerProps = {
  selectedRepo: RepoItem | null,
  onClose: () => void;
  visible: boolean;
}

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ selectedRepo, onClose, visible }) => {
  const [list, setList] = React.useState<[] | BranchItem[]>([]);

  React.useEffect(() => {
    const getBranches = async () => {
      try {
        if (selectedRepo != null) {
          await gitHubStore.getOrganizationRepoBranches({
            organizationName: selectedRepo.owner,
            repoName: selectedRepo.name
          }).then(result => {
            if (result.success) {
              setList(result.data);
            }
          });
        }
      } catch (err) {

      }
    };
  }, [selectedRepo]);

  if (selectedRepo != null) {
    return (
      <Drawer
        title={`${MAIN_CONST.SIDE_NAME_REPO} ${selectedRepo.name}`}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {list.map((element) => {
          return (
            <p key={element.uuid} className="sp">• {element.name}</p>
          );
        })}

      </Drawer>);
  }
  return null;
};

export default RepoBranchesDrawer;