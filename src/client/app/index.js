import "../styles/style.scss";
import "../styles/vendor/vendor.css";
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./containers/App";

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("root")
  );
};

render(App);

// All React modules in app tree accept HMR updates starting with root node
if (module.hot) {
  module.hot.accept("./containers/App.js", () => {
    const NextRoutes = require("./containers/App.js").default;
    render(NextRoutes);
  });
}
