import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import get from "lodash.get";
import axios from "axios";
import { AppContext } from "../store/Provider";

const logout = async (storeData, resetData, history) => {
  try {
    await axios.get("/api/auth/logout");
    storeData("auth", {
      isLoggedIn: false,
      error: null
    });
    // Clear client store
    resetData("content", "signup");
    history.push("/login");
  } catch (e) {
    console.log("Logout:", get(e, "response.data")); // eslint-disable-line no-console
  }
};

const Header = ({ history }) => (
  <div>
    <AppContext.Consumer>
      {({ auth, storeData, resetData }) => {
        const isLoggedIn = get(auth, "isLoggedIn");
        const lockIcon = isLoggedIn ? "lock-open" : "lock";
        return (
          <header className="app-header">
            Node Authentication Application
            <nav>
              <ul className="app-nav">
                <li>
                  <Link to="/">
                    <i className={`fas fa-${lockIcon} mr-2`} />
                    Home
                  </Link>
                </li>
                {!isLoggedIn && (
                  <Fragment>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/signup">Sign up</Link>
                    </li>
                  </Fragment>
                )}
                {isLoggedIn && (
                  <Fragment>
                    <li>
                      <button
                        className="btn btn-link"
                        type="button"
                        onClick={() => {
                          logout(storeData, resetData, history);
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </Fragment>
                )}
              </ul>
            </nav>
          </header>
        );
      }}
    </AppContext.Consumer>
  </div>
);

Header.propTypes = {
  history: PropTypes.shape().isRequired
};

export default withRouter(Header);
