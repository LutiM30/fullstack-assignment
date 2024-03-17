const userDocument = (carSchema) => {
  return {
    fname: { type: String },
    lname: { type: String },
    password: { type: String },
    license_number: { type: String },

    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      index: true,
    },

    userType: { type: String },
    age: { type: Number },
    car_details: carSchema,
  };
};

module.exports = userDocument;
