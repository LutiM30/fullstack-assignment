const userDocument = (carSchema) => {
  return {
    fname: { type: String },
    lname: { type: String },
    license_number: { type: String },
    age: { type: Number },
    car_details: carSchema,
  };
};

module.exports = userDocument;
