import ReposSearchPage from "@pages/ReposSearchPage";
import "@styles/index.css";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
        <Route path="/repos" component={ReposSearchPage} />
        <Redirect to="/repos" />
    </BrowserRouter>
  );
};

export default App;
