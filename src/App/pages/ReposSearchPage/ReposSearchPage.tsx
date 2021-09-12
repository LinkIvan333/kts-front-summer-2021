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
import { Link, Route } from "react-router-dom";


const gitHubStore = new GitHubStore();

const ReposContext = React.createContext({
  list: [] as RepoItem[], isLoading: false, load: (e: boolean) => {
  }
});
const Provider = ReposContext.Provider;

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

  return (
    <Provider value={{list, isLoading, load}}>
      <div className="grid">
        <div className="search-line">
          <Input placeholder={MAIN_CONST.PLACEHOLDER} onChange={handleKeyboard} value={value} />
          <Button onClick={handleClick} disabled={isLoading} type={"submit"}><SearchIcon /></Button>
        </div>
        {list.map((element) => {
          const handleCardClick = () => {
            setSelectedRepo(element);
            showDrawer();
          };
          return (
            <Link to={`/repos/${element.id}`} key={element.id}>
              <RepoTile item={element} onClick={handleCardClick} />
            </Link>
          );
        })}
        <Route path="/repos/:id" component={RepoBranchesDrawerShower} />
      </div>
    </Provider>
  );
};

export default ReposSearchPage;