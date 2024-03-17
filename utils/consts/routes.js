const userController = require("../../controller/userController");

const routes = {
  get: {
    "/": "index",
    "/logout": "index",
  },

  getProtectedPages: {
    "/g": "g",
    "/g2": "g2",
    "/dashboard": "dashboard",
  },

  getWithDataProtectedPages: {
    "/g/get-user": userController?.getOne,
  },

  getWithDataAlreadyLoggedInPages: {
    "/login": userController?.loginPage,
  },

  post: {
    "/g2/new-user": (req, res) =>
      userController?.createOne(req, res, "/login?signin=1"),
    "/g/update-user": userController?.updateOne,
    "/user/signin": userController?.signin,
  },
};

module.exports = routes;
