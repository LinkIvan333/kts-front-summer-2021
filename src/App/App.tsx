import ReposSearchPage from "./pages/ReposSearchPage";
import "styles/index.css";
import { ROUTES } from "config/config";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import React from "react";

const App = () => {
  return (
    <BrowserRouter>
      <Route path={ROUTES.repos.mask} component={ReposSearchPage} />
      <Redirect to={ROUTES.repos.mask} />
    </BrowserRouter>
  );
};

export default App;
