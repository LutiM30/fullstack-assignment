const redirectIfAuthenticated = require("../../../../../middleware/redirectIfAuthenticatedMiddleWare");
const {
  getWithDataAlreadyLoggedInPages,
} = require("../../../../consts/routes");

const createGetAlreadyLoggedInWithDataRoutes = (app, route, render) => {
  app.get(route, redirectIfAuthenticated, render);
};

const getWithAlreadyLoggedInProtectedDataRoutes = (app) =>
  Object.keys(getWithDataAlreadyLoggedInPages).forEach((route) => {
    createGetAlreadyLoggedInWithDataRoutes(
      app,
      route,
      getWithDataAlreadyLoggedInPages[route]
    );
  });

module.exports = getWithAlreadyLoggedInProtectedDataRoutes;
