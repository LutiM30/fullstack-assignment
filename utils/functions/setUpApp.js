const express = require("express");
const session = require("express-session");

const cookieParser = require("cookie-parser");

const getApp = () => {
  const app = express();

  app.use(express.static("public"));
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      secret: "basic-app",
      resave: false,
      saveUninitialized: true,
    })
  );

  return app;
};

module.exports = getApp;
