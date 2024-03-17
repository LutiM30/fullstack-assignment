const consts = {
  mongo: {
    upsert: { upsert: true },
  },
  howManyTimesEncrypt: 5,

  fillUser: (reqBody) => {
    return {
      fname: reqBody.fname || "John",
      lname: reqBody.lname || "Doe",
      license_number: reqBody.license_number || "202403LC",
      age: reqBody.age || 25,
      password: reqBody.password,
      username: reqBody.username,
      userType: reqBody.userType || consts.userTypes[0].value,
      car_details: {
        make: reqBody.make || "Maruti",
        model: reqBody.model || "Omni",
        year: reqBody.year || 2004,
        plateno: reqBody.plateno || "MKDIR",
      },
    };
  },

  userTypes: [
    { key: 1, name: "Driver", value: "driver" },
    { key: 1, name: "Examiner", value: "examiner" },
    { key: 1, name: "Admin", value: "admin" },
  ],
  userCookie: "licenceSiteUserAuth",
};

module.exports = consts;
