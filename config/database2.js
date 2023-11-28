require("dotenv").config();
// database2.js
module.exports = {
  development: {
    username: process.env.DB_USER2,
    password: process.env.DB_PASSWORD2,
    database: process.env.DB_NAME2,
    host: process.env.DB_HOST2,
    dialect: "mariadb",
  },
  // Add other environments if needed (e.g., production, test)
};
