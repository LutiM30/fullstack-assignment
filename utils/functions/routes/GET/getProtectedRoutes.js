const authMiddleware = require("../../../../middleware/authMiddleware");
const userModel = require("../../../../models/userModel");

const { getProtectedPages } = require("../../../consts/routes");
const isDummyUserData = require("../../isDummyUserData");
const userLoggedIn = require("../../userLoggedIn");

const createGetProtectedRoutes = (app, route, render) => {
  app.get(route, authMiddleware, async (req, response) => {
    const user = await userModel.findById(req.cookies.userLogin)?.lean();

    req.originalUrl === "/g" && isDummyUserData(user)
      ? response.redirect("/g2")
      : response.render(render, {
          query: req.query,
          currentPage: route,
          loggedIn: userLoggedIn(req),
          user,
        });
  });
};

const getProtectedRoutes = (app) =>
  Object.keys(getProtectedPages).forEach((route) => {
    return createGetProtectedRoutes(app, route, getProtectedPages[route]);
  });

module.exports = getProtectedRoutes;
