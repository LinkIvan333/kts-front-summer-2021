import RepoBranchesDrawerStyle from "./RepoBranchesDrawer.module.scss";
import "config/config";
import React from "react";
import RepoBranchesStore from "store/RepoBranchesStore/RepoBranchesStore";
import { Drawer } from "antd";
import { MAIN_CONST } from "config/config";
import { useParams } from "react-router-dom";
import { useLocalStore } from "utils/useLocalStore/useLocalStore";
import { observer } from "mobx-react";

type RepoBranchesDrawerProps = {
  onClose: () => void;
}

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ onClose }) => {
  const { id } = useParams<{ id: string }>();
  const repoBranchesStoreLocal = useLocalStore(() => new RepoBranchesStore());

  React.useEffect(() => {
    const getBranches = async () => {
      try {
        if (id !== undefined) {
          await repoBranchesStoreLocal.getOrganizationRepoBranches({
            id: id
          });
        }
      } catch (err) {

      }
    };
    
    getBranches();
  }, [id, repoBranchesStoreLocal]);
  
    return (
      <Drawer
        title={`${MAIN_CONST.SIDE_NAME_REPO} `}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={true}
      >
        {
          repoBranchesStoreLocal.branches.map((element) => {
            return (
              <p key={element.uuid} className={RepoBranchesDrawerStyle.sp}>• {element.name}</p>
            );
          })
        }
      </Drawer>);
};

export default observer(RepoBranchesDrawer);