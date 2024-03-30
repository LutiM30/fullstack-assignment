const appointmentsModel = require("../appointmentsModel");
const slotsModel = require("../slotsModel");
const userModel = require("../userModel");

const slotExistsValidator = async (value) => {
  const slot = await slotsModel.findById(value);
  return slot !== null;
};

const userExistsValidator = async (value) => {
  const user = await userModel.findById(value);
  return user !== null;
};

const requiredField = (data) => {
  return { ...data, required: true };
};

module.exports = {
  slotId: requiredField({
    type: String,
    validate: [
      {
        validator: slotExistsValidator,
        message: (props) => `Slot with ID ${props.value} does not exist`,
      },
    ],
  }),

  userId: requiredField({
    type: String,
    validate: {
      validator: userExistsValidator,
      message: (props) => `User with ID ${props.value} does not exist`,
    },
  }),
};
