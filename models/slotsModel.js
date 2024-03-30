const { Schema, model } = require("mongoose");
const slotModel = require("./documents/slotDocument");
const internalFields = require("./documents/internalFields");

const getNewSchema = (document) => new Schema(document, internalFields);
const Model = model;

const appointmentsSchema = getNewSchema(slotModel, { typeKey: "$type" });

appointmentsSchema.index(
  { appointmentDate: 1, startsAt: 1, endsAt: 1 },
  { unique: true }
);

module.exports = Model("slots", appointmentsSchema);
