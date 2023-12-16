import router from "./routes.js";

const routes = (app) => {
  app.use("/api/v1", router);
};

export default routes;