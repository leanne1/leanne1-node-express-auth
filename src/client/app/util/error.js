import get from "lodash.get";

export const logError = (domain, e) =>
  console.log(`${domain}:`, get(e, "response.data") || e); // eslint-disable-line no-console
