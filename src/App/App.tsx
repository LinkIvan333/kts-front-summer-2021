import ReposSearchPage from "@pages/ReposSearchPage";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import "@styles/index.css";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
        <Route path="/repos" component={ReposSearchPage} />
        <Route path="/repos/:id" component={RepoBranchesDrawer} />
        <Redirect to="/repos" />
    </BrowserRouter>
  );
};

export default App;
