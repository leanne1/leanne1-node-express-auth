import React, { Fragment } from "react";
import axios from "axios";
import get from "lodash.get";
import { AppContext } from "../store/Provider";

const fetchProtectedData = async storeData => {
  try {
    const { data } = await axios.get("/api/content/protected");
    storeData("content", {
      data,
      error: null
    });
  } catch (e) {
    const statusCode = get(e, "response.status");
    const error =
      statusCode === 401
        ? "You must be logged in to access this data"
        : "There was an error fetching data";
    storeData("content", {
      data: null,
      error
    });
  }
};

const Home = () => (
  <div className="content">
    <AppContext.Consumer>
      {({ content, storeData }) => {
        const imageSrc = get(content, "data.img");
        const fetchError = get(content, "error");

        return (
          <Fragment>
            <h1>Home</h1>
            <p>You have successfully logged in</p>
            <button
              type="button"
              className="btn btn-primary mb-4"
              onClick={() => {
                fetchProtectedData(storeData);
              }}
            >
              Fetch protected data
            </button>
            {imageSrc && (
              <img
                className="protected-image"
                src={imageSrc}
                alt="Protected data"
              />
            )}
            {fetchError && (
              <div className="alert alert-danger" role="alert">
                {fetchError}
              </div>
            )}
          </Fragment>
        );
      }}
    </AppContext.Consumer>
  </div>
);

export default Home;
