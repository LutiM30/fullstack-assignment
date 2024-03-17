const getProtectedRoutes = require("./GET/getProtectedRoutes");
const getRoutes = require("./GET/getRoutes");
const getWithProtectedDataRoutes = require("./GET/getWithData/getProtectedWithDataRoutes");
const getWithAlreadyLoggedInProtectedDataRoutes = require("./GET/getWithData/getWithAlreadyLoggedInProtectedDataRoutes");
const postRoutes = require("./POST/postRoutes");

const getAllRoutes = (app) => {
  getRoutes(app);
  getProtectedRoutes(app);

  postRoutes(app);

  getWithProtectedDataRoutes(app);
  getWithAlreadyLoggedInProtectedDataRoutes(app);
};

module.exports = getAllRoutes;
