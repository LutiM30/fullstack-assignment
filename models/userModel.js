const { default: mongoose } = require("mongoose");

const userDocument = require("./documents/userDocument");
const carDocument = require("./documents/carDocument");
const internalFields = require("./documents/internalFields");

const Schema = mongoose.Schema;
const Model = mongoose.model;

const getNewSchema = (document) => new Schema(document, internalFields);

const carSchema = getNewSchema(carDocument);
const userSchema = getNewSchema(userDocument(carSchema));

// export mongoose model
const userModel = Model("users", userSchema);

module.exports = userModel;
