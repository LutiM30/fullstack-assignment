const { connect, connection } = require("mongoose");

const DBConnection = () => {
  // Database Connection
  const mongoDBCs = "mongodb+srv://root:root@fullstack.hzq526l.mongodb.net/";
  try {
    connect(mongoDBCs);
    console.log("Connection to Database is Made!!!");
  } catch (error) {
    console.log("ERROR 504: Invalid Connection --- ", error);
  }
};

module.exports = DBConnection;
