import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import get from "lodash.get";
import { withRouter } from "react-router";
import { logError } from '../util';
import { AppContext } from "../store/Provider";

const VerifyAuthenticatedContainer = (props) => {
  return (
    <AppContext.Consumer>
      {({ storeData }) => {
        return (
          <VerifyAuthenticated
            storeData={storeData}
            {...props}
          >
            { isAuthVerifyLoading => {
              return (
                isAuthVerifyLoading
                ? (<div className="app-loading-container"><i className="fas fa-circle-notch fa-spin fa-5x"></i></div>)
                : props.children
              )
            }}
          </VerifyAuthenticated>
        );
      }}
    </AppContext.Consumer>
  )
};

class VerifyAuthenticated extends Component {
  static propTypes = {
    children: PropTypes.any,
    storeData: PropTypes.func,
  };

  constructor() {
    super();
    this.verifyUserAuthenticated = this.verifyUserAuthenticated.bind(this);
    this.state = {
      isLoading: false,
    };
  }

  async verifyUserAuthenticated () {
    const { storeData, history } = this.props;
    try {
      this.setState({ isLoading: true });
      const { data } = await axios.get("/api/auth/me");
      const username = get(data, 'username');
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
      logError(e);
    }
  }

  componentDidMount() {
    this.verifyUserAuthenticated();
  }

  render() {
    return this.props.children(this.state.isLoading);
  }
}

export default withRouter(VerifyAuthenticatedContainer);
