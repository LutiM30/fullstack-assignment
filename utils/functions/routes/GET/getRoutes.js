const userModel = require("../../../../models/userModel");
const { get } = require("../../../consts/routes");
const userLoggedIn = require("../../userLoggedIn");

const createGetRoutes = async (app, route, render) => {
  app.get(route, async (req, response) => {
    const user = await userModel.findById(req.cookies.userLogin)?.lean();
    response.render(render, {
      query: req.query,
      currentPage: route,
      loggedIn: userLoggedIn(req),
      user,
    });
  });
};

const getRoutes = (app) => {
  return Object.keys(get).forEach((route) =>
    createGetRoutes(app, route, get[route])
  );
};

module.exports = getRoutes;
