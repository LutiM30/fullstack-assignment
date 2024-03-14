const { default: mongoose } = require("mongoose");

const userDocument = require("./documents/userDocument");
const carDocument = require("./documents/carDocument");
const internalFields = require("./documents/internalFields");
const consts = require("../utils/consts");

const Schema = mongoose.Schema;
const Model = mongoose.model;

const getNewSchema = (document) => new Schema(document, internalFields);

const carSchema = getNewSchema(carDocument);
const userSchema = getNewSchema(userDocument(carSchema));

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(
    user.license_number,
    consts.howManyTimesEncrypt,
    (error, hash) => {
      user.license_number = hash;
      console.log({ user });
      next();
    }
  );
});

// export mongoose model
const userModel = Model("users", userSchema);

module.exports = userModel;
