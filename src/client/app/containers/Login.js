import React from "react";
import PropTypes from "prop-types";
import get from "lodash.get";
import { withRouter } from "react-router";
import axios from "axios";
import { Formik, Form } from "formik";
import { AppContext } from "../store/Provider";
import ErrorMessage from "../components/ErrorMessage";

const submitLogin = async (storeData, history, values, { setSubmitting }) => {
  try {
    await axios.post("/api/auth/login", values);
    setSubmitting(false);
    storeData("auth", {
      isLoggedIn: true,
      error: null
    });
    history.push("/");
  } catch (e) {
    console.log("Login:", get(e, "response.data")); // eslint-disable-line no-console
    setSubmitting(false);
    storeData("auth", {
      error: "There was an error logging in. Please try again"
    });
  }
};

const validate = ({ username, password }) => {
  const errors = {};
  if (!username) {
    errors.username = "Username is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  return errors;
};

const Login = ({ history }) => (
  <div className="content">
    <AppContext.Consumer>
      {({ storeData }) => {
        return (
          <section className="card login">
            <Formik
              initialValues={{ username: "", password: "" }}
              validate={validate}
              validateOnChange={false}
              onSubmit={(values, formApi) => {
                submitLogin(storeData, history, values, formApi);
              }}
            >
              {({ values, errors, touched, handleChange, isSubmitting }) => (
                <Form>
                  <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="email"
                        name="username"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                      />
                    </div>
                    <ErrorMessage
                      field="username"
                      errors={errors}
                      touched={touched}
                    />

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </div>
                    <ErrorMessage
                      field="password"
                      errors={errors}
                      touched={touched}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      Login
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </section>
        );
      }}
    </AppContext.Consumer>
  </div>
);

Login.propTypes = {
  history: PropTypes.shape().isRequired
};

export default withRouter(Login);
