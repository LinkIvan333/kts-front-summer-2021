import RepoBranchesDrawerStyle from "./RepoBranchesDrawer.module.scss";
import "@config/config";
import React from "react";
import { RepoItem, BranchItem } from "@store/GitHubStore/types";
import GitHubStore from "@store/GitHubStore/GitHubStore";
import { Drawer } from "antd";
import { MAIN_CONST } from "@config/config";
import { useParams } from "react-router-dom";

const gitHubStore = new GitHubStore();

type RepoBranchesDrawerProps = {
  selectedRepo: RepoItem | null,
  onClose: () => void;
  visible: boolean;
}

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ selectedRepo, onClose, visible }) => {
  const [list, setList] = React.useState<BranchItem[]>([]);
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const getBranches = async () => {
      try {
        if (id !== undefined) {
          await gitHubStore.getOrganizationRepoBranches({
            id: id
          }).then(result => {
            if (result.success) {
              setList(result.data);
            }
          });
        }
      } catch (err) {

      }
    };
    
    setList([]);
    getBranches();
  }, [id]);
  
  if (selectedRepo != null) {
    return (
      <Drawer
        title={`${MAIN_CONST.SIDE_NAME_REPO} `}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {
          list.map((element) => {
            return (
              <p key={element.uuid} className={RepoBranchesDrawerStyle.sp}>• {element.name}</p>
            );
          })
        }
      </Drawer>);
  }
  return null;
};

export default RepoBranchesDrawer;