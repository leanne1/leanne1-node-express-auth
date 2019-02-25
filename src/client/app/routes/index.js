import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import get from "lodash.get";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import { AppContext } from "../store/Provider";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <AppContext.Consumer>
        {({ auth }) => {
          const isLoggedIn = get(auth, "isLoggedIn");
          return isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          );
        }}
      </AppContext.Consumer>
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};

const Routes = () => (
  <Fragment>
    <PrivateRoute exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
  </Fragment>
);

export default Routes;
