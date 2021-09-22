import ReposSearchPageStyle from "./ReposSearchPage.module.scss";
import Input from "@components/Input";
import Button from "@components/Button";
import SearchIcon from "@components/SearchIcon";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import React from "react";
import { MAIN_CONST, ROUTES } from "@config/config";
import { Link, Route } from "react-router-dom";
import RepoTile from "@components/RepoTile";
import { observer } from "mobx-react";
import GitHubStore from "@store/GitHubStore";
import { RepoItemModel } from "@models/gitHub";
import { useLocalStore } from "@utils/useLocalStore/useLocalStore";

const ReposContext = React.createContext({
  list: [] as RepoItemModel[], isLoading: false, load: (e: boolean) => {
  }
});

//const Provider = ReposContext.Provider;
export const useReposContext = () => React.useContext(ReposContext);

const ReposSearchPage = () => {

  const [value, setValue] = React.useState("");
  const [isLoading, load] = React.useState(false);

  const [selectedRepo, setSelectedRepo] = React.useState<null | RepoItemModel>(null);
  const [visible, setVisible] = React.useState(false);
  const ReposListStore = useLocalStore(() => new GitHubStore());

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
        await ReposListStore.getOrganizationReposList({
          organizationName: value
        });
        load(false);
      } catch (err) {

      }
    };

    getRepos();
  }, [value, ReposListStore]);

  const RepoBranchesDrawerShower = () => {
    return (
      <RepoBranchesDrawer selectedRepo={selectedRepo} onClose={onClose} visible={visible} />
    );
  };

  const handleCardClick = React.useCallback((element: RepoItemModel) => {
    setSelectedRepo(element);
    showDrawer();
  }, [showDrawer]);

  return (

    <div className={ReposSearchPageStyle.grid}>
      <div className={ReposSearchPageStyle.searchLine}>
        <Input placeholder={MAIN_CONST.PLACEHOLDER} onChange={handleKeyboard} value={value} />
        <Button onClick={handleClick} disabled={isLoading} type={"submit"}><SearchIcon /></Button>
      </div>
      {ReposListStore.list.map((element) => {
        return (
          <Link to={ROUTES.repos.create(element.id)} key={element.id}>
            <RepoTile item={element} _onClick={handleCardClick} />
          </Link>
        );
      })}
      <Route path={ROUTES.repos.create(":id")} component={RepoBranchesDrawerShower} />
    </div>

  );
};

export default observer(ReposSearchPage);