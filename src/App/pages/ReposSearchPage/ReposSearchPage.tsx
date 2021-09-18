import ReposSearchPageStyle from "./ReposSearchPage.module.scss";
import Input from "@components/Input";
import Button from "@components/Button";
import SearchIcon from "@components/SearchIcon";
import RepoTileDrawer from "@pages/ReposSearchPage/components/RepoTileDrawer"
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import React from "react";
import GitHubStore from "@store/GitHubStore/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { MAIN_CONST, ROUTES } from "@config/config";
import { Route } from "react-router-dom";


const gitHubStore = new GitHubStore();

const ReposContext = React.createContext({
  list: [] as RepoItem[], isLoading: false, load: (e: boolean) => {
  }
});

const Provider = ReposContext.Provider;
export const useReposContext = () => React.useContext(ReposContext);

const ReposSearchPage = () => {

  const [value, setValue] = React.useState("");
  const [isLoading, load] = React.useState(false);
  const [list, setList] = React.useState<RepoItem[]>([]);
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
    setValue((e.target).value);
  }, []);

  const handleClick = React.useCallback(() => {
    const getRepos = async () => {
      try {
        load(true);
        await gitHubStore.getOrganizationReposList({
          organizationName: value
        }).then(result => {
          if (result.success) {
            load(false);
            setList(result.data)
          } else {
            load(false);
          }
        });
      } catch (err) {

      }
    };

    getRepos();
  }, [value]);

  const RepoBranchesDrawerShower = () => {
    return (
      <RepoBranchesDrawer selectedRepo={selectedRepo} onClose={onClose} visible={visible}/>
    )
  }

  const handleCardClick = (element: RepoItem) => {
    setSelectedRepo(element);
    showDrawer();
  };

  return (
    <Provider value={{list, isLoading, load}}>
      <div className={ReposSearchPageStyle.grid}>
        <div className={ReposSearchPageStyle.searchLine}>
          <Input placeholder={MAIN_CONST.PLACEHOLDER} onChange={handleKeyboard} value={value} />
          <Button onClick={handleClick} disabled={isLoading} type={"submit"}><SearchIcon /></Button>
        </div>
        <RepoTileDrawer onClick={handleCardClick} />
        <Route path={ROUTES.repos.create(":id")} component={RepoBranchesDrawerShower} />
      </div>
    </Provider>
  );
};

export default ReposSearchPage;