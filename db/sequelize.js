const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const bcrypt = require("bcrypt");

const TicketModel = require("../module/ticket");
const UserModel = require("../module/user");
const tickets = require("./tickets");

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mariadb",
//     dialectOptions: {
//       timezone: "Etc/GMT-2",
//     },
//     logging: false,
//   }
// );

// Configuration des bases de données
const database1Config = require("../config/database1");
const database2Config = require("../config/database2");

// Initialisation des instances Sequelize
const sequelize1 = new Sequelize(database1Config.development);
const sequelize2 = new Sequelize(database2Config.development);

const Ticket = TicketModel(sequelize1, DataTypes);
const User = UserModel(sequelize2, DataTypes);

const initDb = () => {
  return Promise.all([
    sequelize1.sync({ force: true }).then(() => {
      console.log("La base de donnée 1 a bien été initialisée !");
    }),
    sequelize2.sync({ force: true }).then(() => {
      bcrypt.hash("1111", 10).then((hash) => {
        User.create({
          firstname: "Bilal",
          username: "Bilal",
          lastname: "Wardi",
          phone: "06 22 33 45 66",
          email: "bilal@gmail.com",
          password: hash,
        });
      });
      console.log("La base de donnée 2 a bien été initialisée !");
    }),
  ]);
};

module.exports = {
  initDb,
  Ticket,
  User,
};
