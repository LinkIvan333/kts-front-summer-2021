import "./ReposSearchPage.css";
import RepoTile from "@components/RepoTile";
import Input from "@components/Input";
import Button from "@components/Button";
import SearchIcon from "@components/SearchIcon";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import React from "react";
import GitHubStore from "@store/GitHubStore/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { MAIN_CONST } from "@config/config";


const gitHubStore = new GitHubStore();

const ReposSearchPage = () => {

  const [localState, setLocalState] = React.useState({
    value: "",
    isLoading: false,
    list: [] as RepoItem[]
  });
  const [selectedRepo, setSelectedRepo] = React.useState<null | RepoItem>(null);
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setSelectedRepo(null);
  };

  const handleKeyboard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalState({ value: (e.target).value, isLoading: false, list: [] });
  };

  const handleClick = () => {
    setLocalState({ value: localState.value, isLoading: true, list: localState.list });
    gitHubStore.getOrganizationReposList({
      organizationName: localState.value
    }).then(result => {
      if (result.success) {
        setLocalState({ value: localState.value, isLoading: false, list: result.data });
      } else {
        setLocalState({ value: localState.value, isLoading: false, list: localState.list });
      }
    });
  };

  return (
    <div className="grid">
      <div className="search-line">
        <Input placeholder={MAIN_CONST.PLACEHOLDER} onChange={handleKeyboard} value={localState.value} />
        <Button onClick={handleClick} disabled={localState.isLoading}><SearchIcon /></Button>
      </div>
      {localState.list.map((element) => {
        const handleCardClick = () => {
          setSelectedRepo(element);
          showDrawer();
        };
        return (
          <RepoTile key={element.id} item={element} onClick={handleCardClick} />
        );
      })}
      <RepoBranchesDrawer selectedRepo={selectedRepo} onClose={onClose} visible={visible} />
    </div>
  );
};

export default ReposSearchPage;