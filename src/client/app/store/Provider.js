/* eslint-disable react/no-unused-state */
import React from "react";
import PropTypes from "prop-types";

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  state = {
    content: {
      data: null,
      error: null
    },
    auth: {
      isLoggedIn: false,
      error: null
    },
    signup: {
      data: null,
      error: null
    },
    storeData: (key, data) => {
      const currentData = this.state[key]; // eslint-disable-line react/destructuring-assignment
      this.setState({ [key]: Object.assign({}, currentData, data) });
    },
    resetData: key => {
      const keys = Array.isArray(key) ? key : [key];
      const nextState = keys.reduce((state, k) => {
        const nxtState = Object.assign({}, state);
        nxtState[k] = null;
        return nxtState;
      }, {});
      this.setState(nextState);
    }
  };

  render() {
    const { children } = this.props;
    return (
      <AppContext.Provider value={this.state}>{children}</AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.node
};
