const { userDummyData } = require("../consts");

module.exports = (user) => {
  const userData = { ...userDummyData };
  const carData = { ...userDummyData.car_details };

  delete userData.car_details;
  delete userData.license_number;

  const mainDataTruthy = Object.keys(userData)
    .map((key) => String(userData[key]) === String(user[key]))
    ?.every((key) => key);

  const carDataTruthy = Object.keys(carData)
    .map((key) => String(carData[key]) === String(user["car_details"][key]))
    ?.every((key) => key);

  return mainDataTruthy === carDataTruthy;
};
