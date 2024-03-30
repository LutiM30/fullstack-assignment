const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userDocument = require("./documents/userDocument");
const carDocument = require("./documents/carDocument");
const internalFields = require("./documents/internalFields");
const consts = require("../utils/consts");

const Schema = mongoose.Schema;
const Model = mongoose.model;

const getNewSchema = (document) => new Schema(document, internalFields);

const carSchema = getNewSchema(carDocument);
const userSchema = getNewSchema(userDocument(carSchema), { typeKey: "$type" });

userSchema.pre("save", function (next) {
  const user = this;
  const encrypt = (key, next = () => {}) =>
    bcrypt.hash(user[key], consts.howManyTimesEncrypt, (error, hash) => {
      user[key] = hash;
      next();
    });
  encrypt("license_number");
  encrypt("password", next);
});

userSchema.pre("updateOne", function (next) {
  const user = this;
  const encrypt = (key, next = () => {}) =>
    bcrypt.hash(user[key], consts.howManyTimesEncrypt, (error, hash) => {
      user[key] = hash;
      next();
    });
  encrypt("license_number", next);
});

userSchema.pre("find", function (next) {
  const user = this;
  const encrypt = (key, next = () => {}) =>
    bcrypt.hash(user[key], consts.howManyTimesEncrypt, (error, hash) => {
      user[key] = hash;
      next();
    });
  if (user?.license_number) {
    encrypt("license_number");
  }
  encrypt("password", next);
});

const userModel = Model("users", userSchema);

module.exports = userModel;
