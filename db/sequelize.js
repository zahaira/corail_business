const { Sequelize, DataTypes } = require("sequelize");

const TicketModel = require("../module/ticket");
const tickets = require("./tickets");

const sequelize = new Sequelize("corail", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Ticket = TicketModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    tickets.map((ticket) => {
      Ticket.create({
        price: ticket.price,
        name: ticket.name,
        email: ticket.email,
        numticket: ticket.numticket,
      }).then((ticket) => console.log(ticket.toJSON()));
    });

    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Ticket,
};
