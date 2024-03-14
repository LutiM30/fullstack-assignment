const userModel = require("../models/userModel");
const { mongo } = require("../utils/consts");

const renderPageWithData = (res, page, data) => res?.render(page, { data });

// CREATE NEW BLOG
const newUser = async (req, res) => {
  const newUserData = new userModel({
    fname: req.body.fname,
    lname: req.body.lname,
    license_number: req.body.license_number,
    age: req.body.age,
    car_details: {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      plateno: req.body.plateno,
    },
  });

  try {
    await newUserData?.save();

    res.redirect("/");
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

// One Single Blog
const getUserByLicenseNumber = async (req, res) => {
  const license_number = req.query.licenseNumber;

  try {
    // Query MongoDB based on plateno
    const user = await userModel?.findOne({ license_number })?.lean();
    res.render("g", { user, currentPage: "/g/get-user" });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Error fetching user data.");
  }
};

// GET ALL BLOGS
const getUsers = async (res, page = "index") =>
  await userModel
    ?.find()
    ?.lean()
    ?.then((blogData) => renderPageWithData(res, page, blogData));

const userController = {
  getAll: getUsers,
  getOne: getUserByLicenseNumber,
  createOne: newUser,
  updateOne: updateUser,
};

module.exports = userController;
