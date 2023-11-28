require("dotenv").config();

// database1.js
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mariadb",
  },
  // Add other environments if needed (e.g., production, test)
};
