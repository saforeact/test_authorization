const userRoutes = require("./users_routes");
module.exports = function (app, db) {
  userRoutes(app, db);
};
