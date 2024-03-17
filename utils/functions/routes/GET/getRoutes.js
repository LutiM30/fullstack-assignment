const { get } = require("../../../consts/routes");
const userLoggedIn = require("../../userLoggedIn");

const createGetRoutes = (app, route, render) =>
  app.get(route, (req, response) =>
    response.render(render, {
      query: req.query,
      currentPage: route,
      loggedIn: userLoggedIn(req),
    })
  );

const getRoutes = (app) => {
  return Object.keys(get).forEach((route) =>
    createGetRoutes(app, route, get[route])
  );
};

module.exports = getRoutes;
