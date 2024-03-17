const authMiddleware = require("../../../../../controller/authMiddleware");
const { getWithDataProtectedPages } = require("../../../../consts/routes");

const createGetProtectedWithDataRoutes = (app, route, render) =>
  app.get(route, authMiddleware, render);

const getWithProtectedDataRoutes = (app) =>
  Object.keys(getWithDataProtectedPages).forEach((route) =>
    createGetProtectedWithDataRoutes(
      app,
      route,
      getWithDataProtectedPages[route]
    )
  );

module.exports = getWithProtectedDataRoutes;
