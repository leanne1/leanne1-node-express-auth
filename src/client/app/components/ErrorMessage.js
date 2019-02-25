import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ errors, touched, field }) => (
  <Fragment>
    {errors[field] && touched[field] ? (
      <div className="alert alert-danger" role="alert">
        {errors[field]}
      </div>
    ) : null}
  </Fragment>
);

const errorsShape = {
  username: PropTypes.string,
  password: PropTypes.string,
  password2: PropTypes.string
};

const touchedShape = {
  username: PropTypes.bool,
  password: PropTypes.bool,
  password2: PropTypes.bool
};

ErrorMessage.propTypes = {
  errors: PropTypes.shape(errorsShape),
  touched: PropTypes.shape(touchedShape),
  field: PropTypes.string
};

export default ErrorMessage;
