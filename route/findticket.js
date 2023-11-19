const { Ticket } = require("../db/sequelize");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/dashboard/clients", (req, res) => {
    Ticket.findAll({ order: ["created"] })
      .then((ticketData) => {
        res.render("dashboard", { ticketData });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });
};
