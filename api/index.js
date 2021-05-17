const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const config = require("../config.js");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const imageUser = require("./components/images/network");
const message = require("./components/message/network");
const questions = require("./components/questions/network");
const matches = require("./components/matches/network");
const errors = require("../network/errors");
let port = process.env.PORT || 3000;

const app = express();
const server = require("http").Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
const socket = require("./socket");
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.set("origins", "*:*");

const swaggerDoc = require("./swagger.json");
//Routes
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/image", imageUser);
app.use("/api/questions", questions);
app.use("/api/message", message);
app.use("/api/matches", matches);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

socket.connect(server);

io.on("connection", function (socket) {
  console.log("nuevo cliente conectado");
  socket.emit("message", "Bienvenido");
});

// var _socket = io.connect("http://localhost:3000");

// var _socket = io.connect("http://localhost:3000", {
//   foceNew: true,
// });
// _socket.on("message", function (data) {
//   console.log(data);
// });
app.use(errors);

// app.listen(config.api.port, () => {
//   console.log("Api escuchando en el puerto", config.api.port);
// });
server.listen(port, () => {
  console.log("Api escuchando en el puerto", config.api.port);
});
