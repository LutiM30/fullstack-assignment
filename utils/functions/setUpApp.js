const express = require("express");
const cookieParser = require("cookie-parser");

const getApp = () => {
  const app = express();

  app.use(express.static("public"));
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  return app;
};

module.exports = getApp;
