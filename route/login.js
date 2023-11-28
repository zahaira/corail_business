const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          res.render("login", {
            errorMessage: "User does't exist!",
          });
        }

        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              res.render("login", {
                errorMessage: "password is incorrect. Please try again.",
              });
            }
            //jwt
            const token = jwt.sign({ userId: user.id }, privateKey, {
              expiresIn: "24h",
            });
            res.json({ token: token });
          });
      })
      .catch((error) => {
        res.render("login", {
          errorMessage: "User can't connect try later",
        });
      });
  });
};
