const express = require("express");

const getApp = () => {
  const app = express();

  app.use(express.static("public"));
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
};

module.exports = getApp;
