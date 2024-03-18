const consts = {
  mongo: {
    upsert: { upsert: true },
  },
  howManyTimesEncrypt: 5,

  fillUser: (reqBody) => {
    return {
      fname: reqBody.fname || consts.userDummyData.fname,
      lname: reqBody.lname || consts.userDummyData.lname,
      license_number:
        reqBody.license_number || consts.userDummyData.license_number,
      age: reqBody.age || consts.userDummyData.age,

      password: reqBody.password,
      username: reqBody.username,
      userType: reqBody.userType || consts.userTypes[0].value,

      car_details: {
        make: reqBody.make || consts.userDummyData.car_details.make,
        model: reqBody.model || consts.userDummyData.car_details.model,
        year: reqBody.year || consts.userDummyData.car_details.year,
        plateno: reqBody.plateno || consts.userDummyData.car_details.plateno,
      },
    };
  },

  userDummyData: {
    fname: "John",
    lname: "Doe",
    license_number:
      "$2b$05$.53T3H6uSgw0NOgGr21MTuFhQ9X9snf9wtEm6BYLx8GrJQkYmgVhe",
    age: 25,

    car_details: {
      make: "Maruti",
      model: "Omni",
      year: 2004,
      plateno: "MKDIR",
    },
  },

  userTypes: [
    { key: 1, name: "Driver", value: "driver" },
    { key: 1, name: "Examiner", value: "examiner" },
    { key: 1, name: "Admin", value: "admin" },
  ],
  userCookie: "licenceSiteUserAuth",
};

module.exports = consts;
