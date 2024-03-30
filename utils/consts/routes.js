const {
  renderPage,
  createSlots,
  getSlots,
  createAppointment,
} = require("../../controller/appointmentsController");
const userController = require("../../controller/userController");

const routes = {
  get: {
    "/": "index",
  },

  getProtectedPages: {
    "/g": "g",
    "/dashboard": "dashboard",
  },

  getWithDataProtectedPages: {
    "/g/get-user": userController?.getOne,
    "/logout": userController?.signout,
    "/appointments": renderPage,
    "/g2": getSlots,
  },

  getWithDataAlreadyLoggedInPages: {
    "/login": userController?.loginPage,
  },

  post: {
    "/g2/new-user": (req, res) =>
      userController?.createOne(req, res, "/login?signin=1"),
    "/g/update-user": userController?.updateOne,
    "/user/signin": userController?.signin,
    "/appointment/new-slot": createSlots,
    "/appointments/book": createAppointment,
  },
};

module.exports = routes;
