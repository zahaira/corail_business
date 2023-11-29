const { Ticket } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/dashboard/clients", auth, (req, res) => {
    Ticket.findAll({ order: ["created"] })
      .then((ticketData) => {
        res.render("dashboard", { ticketData });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });
};
