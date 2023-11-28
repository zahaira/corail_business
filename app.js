const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
const qrcode = require("qrcode");
const sequelize = require("./db/sequelize");
const axios = require("axios"); // Import the axios library
require("dotenv").config();
const port = process.env.PORT || 3000;

const apiUrl = process.env.API_URL;

const app = express();
const server = createServer(app);
const io = new Server(server);

sequelize.initDb();

// Serve static files from the 'public' directory
app.use(express.static("public"));
app.use(bodyParser.json()); // Enable JSON body parsing
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.get("/", (req, res) => {
  res.render("activateCode", { errorMessage: null });
});

app.post("/api/activationCode", (req, res) => {
  if (req.body.activationCode == "1111") {
    res.redirect("/scan");
  } else {
    res.render("activateCode", {
      errorMessage: "Activation code is incorrect. Please try again.",
    });
  }
});
app.get("/scan", (req, res) => {
  res.render("scan", {
    src,
  });
});
app.get("/api/login", (req, res) => {
  res.render("login", { errorMessage: null });
});
// app.post("/api/login", (req, res) => {
//   if (req.body.login == "bilal" && req.body.password == "1234") {
//     res.redirect("/api/dashboard/clients");
//   } else {
//     res.render("login", {
//       errorMessage: "login or password are incorrect. Please try again.",
//     });
//   }
// });

require("./route/findticket")(app);
require("./route/createticket")(app);
require("./route/login")(app);

let src = "";

app.post("/api/data", async (req, res) => {
  const jsonData = req.body;
  try {
    const response = await axios.post(`${apiUrl}/api/tickets`, jsonData);
    const dataString = JSON.stringify(jsonData);
    qrcode.toDataURL(dataString, (err, srcg) => {
      if (err) {
        console.error("Error generating QR code:", err);
        res.status(500).json({ error: "Error generating QR code" });
      } else {
        const src = srcg;
        console.log(src);
        io.emit("srcChange", src);
        resetSrcValue();
        res.send("done");
      }
    });
  } catch (error) {
    console.error("Error posting data:", error.message);
    // res
    //   .status(500)
    //   .json({ error: "Error posting data", message: error.message });
  }
});

function resetSrcValue() {
  setInterval(() => {
    const newSrc = "";
    src = newSrc;
    io.emit("srcChange", newSrc);
    console.log("Changed src:", newSrc);
  }, 6000);
}

io.on("connection", (socket) => {
  // socket.on('src', (data)=>{
  //   src = data;
  //   io.emit('src', src);
  // })
});

//test de cookies
app.get("/api", (req, res) => {
  res.setHeader("set-cookie", "foo=bar");
  res.send("cookie is set");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
