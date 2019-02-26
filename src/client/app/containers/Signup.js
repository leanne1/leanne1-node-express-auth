import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import axios from "axios";
import get from "lodash.get";
import pick from "lodash.pick";
import { Formik, Form } from "formik";
import { AppContext } from "../store/Provider";
import { logError } from "../util";
import ErrorMessage from "../components/ErrorMessage";

const submitSignup = async (storeData, history, values, { setSubmitting }) => {
  try {
    await axios.post("/api/signup", pick(values, ["username", "password"]));
    setSubmitting(false);
    history.push("/login");
  } catch (e) {
    logError('Signup', e);
    setSubmitting(false);
    storeData("signup", {
      error: "There was an error signing up. Please try again"
    });
  }
};

const validate = ({ username, password, password2 }) => {
  const errors = {};
  if (password !== password2) {
    errors.password2 = "Passwords do not match. Please try again";
  }
  if (!username) {
    errors.username = "Username is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  if (!password2) {
    errors.password2 = "Please re-enter your password";
  }
  return errors;
};

const Signup = ({ history }) => (
  <div className="content">
    <AppContext.Consumer>
      {({ signup, storeData }) => {
        const signupError = get(signup, "error");
        return (
          <Fragment>
            {signupError && (
              <div className="alert alert-danger" role="alert">
                {signupError}
              </div>
            )}
            <section className="card login">
              <Formik
                initialValues={{ username: "", password: "", password2: "" }}
                validate={validate}
                validateOnChange={false}
                onSubmit={(values, formApi) => {
                  submitSignup(storeData, history, values, formApi);
                }}
              >
                {({ values, errors, touched, handleChange, isSubmitting }) => (
                  <Form>
                    <div className="card-body">
                      <h2 className="card-title">Sign up</h2>
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

                      <div className="form-group">
                        <label htmlFor="password2">Re-enter password</label>
                        <input
                          type="password"
                          name="password2"
                          className="form-control"
                          id="password2"
                          placeholder="Password"
                          value={values.password2}
                          onChange={handleChange}
                        />
                      </div>
                      <ErrorMessage
                        field="password2"
                        errors={errors}
                        touched={touched}
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                      >
                        Signup
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </section>
          </Fragment>
        );
      }}
    </AppContext.Consumer>
  </div>
);

Signup.propTypes = {
  history: PropTypes.shape().isRequired
};

export default withRouter(Signup);
