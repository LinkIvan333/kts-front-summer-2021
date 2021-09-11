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
    list: [] as RepoItem[],
  });
  const [selectedRepo, setSelectedRepo] = React.useState<null | RepoItem>(null);
  const [visible, setVisible] = React.useState(false);

  const showDrawer = React.useCallback(() => {
    setVisible(true);
  }, []);

  const onClose = React.useCallback(() => {
    setVisible(false);
    setSelectedRepo(null);
  }, []);

  const handleKeyboard = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const updateLocalState = (newArgs: {value?: string, isLoading?: boolean, list?: RepoItem[]}) => {
      setLocalState({...localState, ...newArgs});
    }
    updateLocalState({ value: (e.target).value});
  },[localState]);

  const handleClick = React.useCallback(() => {
    const updateLocalState = (newArgs: {value?: string, isLoading?: boolean, list?: RepoItem[]}) => {
      setLocalState({...localState, ...newArgs});
    }
    updateLocalState({isLoading: true});
    gitHubStore.getOrganizationReposList({
      organizationName: localState.value
    }).then(result => {
      if (result.success) {
        updateLocalState({isLoading: false, list: result.data });
      } else {
        updateLocalState({isLoading: false });
      }
    });
  }, [localState]);

  return (
    <div className="grid">
      <div className="search-line">
        <Input placeholder={MAIN_CONST.PLACEHOLDER} onChange={handleKeyboard} value={localState.value} />
        <Button onClick={handleClick} disabled={localState.isLoading} type={"submit"}><SearchIcon /></Button>
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