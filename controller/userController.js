const userModel = require("../models/userModel");
const { fillUser, userTypes, userCookie } = require("../utils/consts");
const bcrypt = require("bcrypt");
const userLoggedIn = require("../utils/functions/userLoggedIn");
const renderPageWithData = (res, page, data) => res?.render(page, { data });
const ObjectId = require("mongodb").ObjectId;

// CREATE NEW User
const newUser = async (req, res, redirectRoute = "/") => {
  const userData = { ...fillUser(req.body), cpassword: req.body.cpassword };

  if (userData?.password === userData?.cpassword) {
    delete userData.cpassword;
    const newUserData = new userModel(userData);

    try {
      await newUserData?.save();

      res.redirect(redirectRoute);
    } catch (error) {
      const errorMessage =
        error?.message ||
        "ERROR 401: Something went wrong while creating new Blog: " + error;

      console.log({ error: errorMessage });

      res?.status(401)?.send({
        message:
          error?.message ||
          "ERROR 401: Something went wrong while creating new Blog: " + error,
      });
    }
  } else {
    res.redirect("/login");
  }
};

const updateUser = async (req, res) => {
  const chngeUsrInfoByLicense = {
    license_number: req.query.licenseNumber,
  };

  const data = await userModel.findOne(chngeUsrInfoByLicense);
  await userModel.updateOne(chngeUsrInfoByLicense, {
    car_details: {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      plateno: req.body.plateno,
    },
  });

  try {
    await data?.save();

    res.redirect("/");
  } catch (error) {
    const errorMessage =
      error?.message ||
      "ERROR 500: Something went wrong while Updating the user: " + error;

    console.log({ error: errorMessage });

    res?.status(401)?.send({
      message:
        error?.message ||
        "ERROR 401: Something went wrong while creating new Blog: " + error,
    });
  }
};

// One Single User
const getUserByLicenseNumber = async (req, res) => {
  const license_number = req.query.licenseNumber;

  try {
    // Query MongoDB based on plateno
    const user = await userModel?.findOne({ license_number })?.lean();
    res.render("g", {
      user,
      currentPage: "/g/get-user",
      loggedIn: userLoggedIn(req),
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Error fetching user data.");
  }
};

// GET ALL Users
const getUsers = async (res, page = "index") =>
  await userModel
    ?.find()
    ?.lean()
    ?.then((blogData) => renderPageWithData(res, page, blogData));

const loginPageWithUserTypes = async (req, res) =>
  renderPageWithData(res, "login", {
    userTypes,
    user: req.cookies[userCookie] || "",
    loggedIn: userLoggedIn(req),
  });

const authenticateUser = async (req, res) => {
  const userData = { ...req.body };

  if (userData.username && userData.password) {
    const { username, password } = userData;

    const user = await userModel
      ?.findOne({ username }, { username: 1, _id: 1, password: 1 })
      .lean();

    bcrypt.compare(password, user.password, async (error, same) =>
      same ? await signinTheUser(user) : res.redirect("/login?signin=1")
    );
  }

  const signinTheUser = async (user) => {
    user = await userModel?.findOne({ _id: user._id }).exec();

    delete user.password;

    res.cookie("userLogin", user._id, {
      maxAge: 604800000,
    });
    req.session.userId = user._id;
    res.redirect("/");
  };
};

const userController = {
  getAll: getUsers,
  getOne: getUserByLicenseNumber,
  createOne: newUser,
  updateOne: updateUser,
  loginPage: loginPageWithUserTypes,
  signin: authenticateUser,
};

module.exports = userController;
