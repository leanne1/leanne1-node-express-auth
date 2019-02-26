import get from "lodash.get";

export const logError = e => console.log("App:", get(e, "response.data") || e); // eslint-disable-line no-console
