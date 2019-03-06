import jwt from "jsonwebtoken";
import get from "lodash.get";

export const authenticate = (req, res, next) => {
  const { headers } = req;
  const hasAuthToken =
    get(headers, "authorization", "").split(" ")[0] === "Bearer";
  const authToken = hasAuthToken ? headers.authorization.split(" ")[1] : null;

  if (!authToken)
    return res.status(401).send("Access denied. No access token provided");

  try {
    const token = jwt.verify(authToken, process.env.JWT_SIGNING_SECRET);
    req.user = get(token, "sub");

    next();
  } catch (err) {
    return res.status(401).send("Access denied. Invalid access token");
  }
};
