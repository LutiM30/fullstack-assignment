const authMiddleware = require("../../../../controller/authMiddleware");
const { getProtectedPages } = require("../../../consts/routes");
const userLoggedIn = require("../../userLoggedIn");

const createGetProtectedRoutes = (app, route, render) =>
  app.get(route, authMiddleware, (req, response) =>
    response.render(render, {
      query: req.query,
      currentPage: route,
      loggedIn: userLoggedIn(req),
    })
  );

const getProtectedRoutes = (app) =>
  Object.keys(getProtectedPages).forEach((route) => {
    return createGetProtectedRoutes(app, route, getProtectedPages[route]);
  });

module.exports = getProtectedRoutes;
