import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import get from "lodash.get";
import { withRouter } from "react-router";
import { logError } from "../util";
import { AppContext } from "../store/Provider";

const VerifyAuthenticatedContainer = props => {
  return (
    <AppContext.Consumer>
      {({ storeData }) => {
        return (
          <VerifyAuthenticated storeData={storeData} {...props}>
            {isAuthVerifyLoading => {
              return isAuthVerifyLoading ? (
                <div className="app-loading-container">
                  <i className="fas fa-circle-notch fa-spin fa-5x" />
                </div>
              ) : (
                props.children
              );
            }}
          </VerifyAuthenticated>
        );
      }}
    </AppContext.Consumer>
  );
};

VerifyAuthenticatedContainer.propTypes = {
  children: PropTypes.node
};

class VerifyAuthenticated extends Component {
  static propTypes = {
    children: PropTypes.func,
    storeData: PropTypes.func,
    history: PropTypes.shape()
  };

  constructor() {
    super();
    this.verifyUserAuthenticated = this.verifyUserAuthenticated.bind(this);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    this.verifyUserAuthenticated();
  }

  async verifyUserAuthenticated() {
    const { storeData, history } = this.props;
    try {
      this.setState({ isLoading: true });
      const { data } = await axios.get("/api/auth/me");
      const username = get(data, "username");
      if (username) {
        storeData("auth", {
          isLoggedIn: true,
          error: null
        });
        history.push("/");
        this.setState({ isLoading: false });
      }
    } catch (e) {
      this.setState({ isLoading: false });
      logError('VerifyAuth', e);
    }
  }

  render() {
    const { children } = this.props;
    const { isLoading } = this.state;
    return children(isLoading);
  }
}

export default withRouter(VerifyAuthenticatedContainer);
