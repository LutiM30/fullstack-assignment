const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.cookies.userLogin);

    if (!user) {
      return res.redirect("/");
    }

    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.redirect("/");
  }
};
