const { post } = require("../../../consts/routes");

const createPostRoutes = (app, route, render) => app.post(route, render);
const postRoutes = (app) =>
  Object.keys(post).forEach((route) =>
    createPostRoutes(app, route, post[route])
  );

module.exports = postRoutes;
