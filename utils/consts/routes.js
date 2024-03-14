const userController = require("../../controller/userController");

const routes = {
  get: {
    "/": "index",
    "/g": "g",
    "/g2": "g2",
    "/dashboard": "dashboard",
    "/login": "login",
  },

  getWithData: {
    "/g/get-user": userController?.getOne,
  },

  post: {
    "/g2/new-user": userController?.createOne,
    "/g/update-user": userController?.updateOne,
  },
};

module.exports = routes;
