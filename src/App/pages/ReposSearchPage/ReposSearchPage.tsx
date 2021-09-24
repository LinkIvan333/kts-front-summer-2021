import ReposSearchPageStyle from "./ReposSearchPage.module.scss";
import Input from "@components/Input";
import Button from "@components/Button";
import SearchIcon from "@components/SearchIcon";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import Loader from "@components/Loader";
import ErrorThrower from "@components/ErrorThrower"
import React from "react";
import { MAIN_CONST, ROUTES } from "@config/config";
import { Link, Route } from "react-router-dom";
import RepoTile from "@components/RepoTile";
import { observer } from "mobx-react";
import ReposListStore from "@store/ReposListStore";
import { RepoItemModel } from "@models/gitHub";
import { useLocalStore } from "@utils/useLocalStore/useLocalStore";
import { Meta } from "@utils/meta";

const ReposSearchPage = () => {

  const ReposListStoreLocal = useLocalStore(() => new ReposListStore());
  const [value, setValue] = React.useState("");
  const [visible, setVisible] = React.useState(false);

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
        await ReposListStoreLocal.getOrganizationReposList({
          organizationName: value
        });
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
        <Button onClick={handleClick} disabled={ReposListStoreLocal.meta} type={"submit"}><SearchIcon /></Button>
      </div>
      {ReposListStoreLocal.meta === Meta.error && <ErrorThrower />}
      {ReposListStoreLocal.meta === Meta.loading && <Loader />}
      {ReposListStoreLocal.meta !== (Meta.loading || Meta.error) &&
      <>
        {ReposListStoreLocal.list.map((element) => {
          return (
            <Link to={ROUTES.repos.create(element.id)} key={element.id}>
              <RepoTile item={element} _onClick={handleCardClick} />
            </Link>
          );
        })}</>}
      <Route path={ROUTES.repos.create(":id")} component={RepoBranchesDrawerShower} />
    </div>
  );
};

export default observer(ReposSearchPage);