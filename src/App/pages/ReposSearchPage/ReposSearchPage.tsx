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
import ReposListStore from "@store/ReposListStore";
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

  const [visible, setVisible] = React.useState(false);
  const ReposListStoreLocal = useLocalStore(() => new ReposListStore());

  const showDrawer = React.useCallback(() => {
    setVisible(true);
  }, []);

  const onClose = React.useCallback(() => {
    setVisible(false);
  }, []);

  const handleKeyboard = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((e.target).value);
  }, []);

  const handleClick = React.useCallback(() => {
    const getRepos = async () => {
      try {
        load(true);
        await ReposListStoreLocal.getOrganizationReposList({
          organizationName: value
        });
        load(false);
      } catch (err) {

      }
    };

    getRepos();
  }, [value, ReposListStoreLocal]);

  const RepoBranchesDrawerShower = () => {
    return (
      <RepoBranchesDrawer onClose={onClose} visible={visible} />
    );
  };

  const handleCardClick = React.useCallback((element: RepoItemModel) => {
    showDrawer();
  }, [showDrawer]);

  return (

    <div className={ReposSearchPageStyle.grid}>
      <div className={ReposSearchPageStyle.searchLine}>
        <Input placeholder={MAIN_CONST.PLACEHOLDER} onChange={handleKeyboard} value={value} />
        <Button onClick={handleClick} disabled={isLoading} type={"submit"}><SearchIcon /></Button>
      </div>
      {ReposListStoreLocal.list.map((element) => {
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