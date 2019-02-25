import React from "react";
import { Router, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { AppProvider } from "../store/Provider";
import Header from "./Header";
import Routes from "../routes";

const history = createBrowserHistory();

const App = () => {
  return (
    <AppProvider>
      <Router history={history}>
        <div className="app">
          <Header />
          <main className="app-main">
            <Switch>
              <Routes />
            </Switch>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
