const routes = require("../consts/routes");

const { get, getWithData, post } = routes;

const createGetRoutes = (app, route, render) =>
  app.get(route, (req, response) =>
    response.render(render, { query: req.query, currentPage: route })
  );

const createGetWithDataRoutes = (app, route, render) => app.get(route, render);

const createPostRoutes = (app, route, render) => app.post(route, render);

const getRoutes = (app) => {
  return Object.keys(get).forEach((route) =>
    createGetRoutes(app, route, get[route])
  );
};
const getWithDataRoutes = (app) =>
  Object.keys(getWithData).forEach((route) =>
    createGetWithDataRoutes(app, route, getWithData[route])
  );

const postRoutes = (app) =>
  Object.keys(post).forEach((route) =>
    createPostRoutes(app, route, post[route])
  );

const getAllRoutes = (app) => {
  getRoutes(app);
  postRoutes(app);
  getWithDataRoutes(app);
};

module.exports = getAllRoutes;
