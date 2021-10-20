import ReposSearchPageStyle from "./ReposSearchPage.module.scss";
import Input from "components/Input";
import Button from "components/Button";
import SearchIcon from "components/SearchIcon";
import RepoBranchesDrawer from "components/RepoBranchesDrawer";
import Loader from "components/Loader";
import ErrorThrower from "components/ErrorThrower";
import React from "react";
import { MAIN_CONST, ROUTES } from "config/config";
import { Link, Route, useHistory } from "react-router-dom";
import RepoTile from "components/RepoTile";
import { observer } from "mobx-react";
import ReposListStore from "store/ReposListStore";
import { useLocalStore } from "utils/useLocalStore/useLocalStore";
import { Meta } from "utils/meta";
import { withRouter } from "react-router";
import { RepoItemModel } from "models/gitHub";

// const ReposContext = React.createContext({
//   element: {} as RepoItemModel
// });
//
// const Provider = ReposContext.Provider;
// export const useReposContext = () => React.useContext(ReposContext);

const ReposSearchPage = () => {

  const reposListStoreLocal = useLocalStore(() => new ReposListStore());
  const [value, setValue] = React.useState("");
  let history = useHistory();


  const onClose = () => {
    history.push(ROUTES.repos.mask);
  };

  const handleKeyboard = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((e.target).value);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = React.useCallback(() => {
    const getRepos = async () => {
      try {
        await reposListStoreLocal.getOrganizationReposList({
          organizationName: value
        });
      } catch (err) {

      }
    };

    getRepos();
  }, [value, reposListStoreLocal]);

  const RepoBranchesDrawerShower = () => {
    return (
      <RepoBranchesDrawer onClose={onClose} />
    );
  };

  const handleCardClick = (id: number) => {
    history.push(ROUTES.repos.create(":id"));
  };

  return (
    <>
      <div className={ReposSearchPageStyle.searchLine}>
        <Input placeholder={MAIN_CONST.PLACEHOLDER} onChange={handleKeyboard} value={value} onKeyDown={handleKeyDown} />
        <Button onClick={handleClick} disabled={reposListStoreLocal.meta} type={"submit"}><SearchIcon /></Button>
      </div>
      <div className={ReposSearchPageStyle.grid}>
        {reposListStoreLocal.meta === Meta.error && <ErrorThrower />}
        {reposListStoreLocal.meta === Meta.loading && <Loader />}
        {reposListStoreLocal.meta !== (Meta.loading || Meta.error) &&
        <>
          {reposListStoreLocal.list.map((element) => {
            return (
              <Link to={ROUTES.repos.create(element.id)} key={element.id}>
                <RepoTile item={element} _onClick={handleCardClick} />
              </Link>
            );
          })}</>}
        <Route path={ROUTES.repos.create(":id")} component={RepoBranchesDrawerShower} />
      </div>
    </>
  );
};

export default withRouter(observer(ReposSearchPage));