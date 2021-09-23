import RepoBranchesDrawerStyle from "./RepoBranchesDrawer.module.scss";
import "@config/config";
import React from "react";
import RepoBranchesStore from "@store/RepoBranchesStore/RepoBranchesStore";
import { Drawer } from "antd";
import { MAIN_CONST } from "@config/config";
import { useParams } from "react-router-dom";
import { useLocalStore } from "@utils/useLocalStore/useLocalStore";
import { observer } from "mobx-react";

type RepoBranchesDrawerProps = {
  onClose: () => void;
  visible: boolean;
}

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ onClose, visible }) => {
  const { id } = useParams<{ id: string }>();
  const RepoBranchesStoreLocal = useLocalStore(() => new RepoBranchesStore());

  React.useEffect(() => {
    const getBranches = async () => {
      try {
        if (id !== undefined) {
          await RepoBranchesStoreLocal.getOrganizationRepoBranches({
            id: id
          });
        }
      } catch (err) {

      }
    };

    getBranches();
  }, [id, RepoBranchesStoreLocal]);

    return (
      <Drawer
        title={`${MAIN_CONST.SIDE_NAME_REPO} `}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {
          RepoBranchesStoreLocal.branches.map((element) => {
            return (
              <p key={element.uuid} className={RepoBranchesDrawerStyle.sp}>• {element.name}</p>
            );
          })
        }
      </Drawer>);
};

export default observer(RepoBranchesDrawer);