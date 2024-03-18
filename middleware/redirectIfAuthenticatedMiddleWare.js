module.exports = (req, res, next) => {
  if (req.cookies.userLogin) {
    // User is logged in, redirect to home page
    return res.redirect("/");
  } else {
    // User is not logged in, proceed to the login page
    next();
  }
};
