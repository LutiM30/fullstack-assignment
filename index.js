// Dependencies
// Packages
require("ejs");

// Internal
const DBConnection = require("./utils/functions/DBConnection");
const getAllRoutes = require("./utils/functions/getRoutes");
const getApp = require("./utils/functions/setUpApp");

// Application
DBConnection();
const app = getApp();

// get routes:
getAllRoutes(app);

// Server Running on this port.
const listener = app.listen(3011, () =>
  console.log(`APP is running on ${listener.address().port}!`)
);
