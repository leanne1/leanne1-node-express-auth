import auth from "./auth";
import signup from "./signup";
import content from "./content";

export const useApi = app => {
  app.use("/api/auth", auth);
  app.use("/api/signup", signup);
  app.use("/api/content", content);
};
