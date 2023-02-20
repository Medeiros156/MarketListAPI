import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

import marketListRoutes from "./routes/marketList.js";
import pingRoutes from "./routes/ping.js";
import cors from "cors";
import { ping } from "./controllers/ping.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const SECRET = process.env.SECRET;
const SECRET_KEY = process.env.SECRET_KEY;

var corsOptions = {
  origin: true,
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: "*",
  maxAge: 86400,
  preflightContinue: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/", cors(corsOptions), (req, res) =>
  res.send("Welcome to MarketList API!")
);
app.post("/login", cors(corsOptions), (req, res) => {
  const { key } = req.body;

  if (key == SECRET_KEY) {
    const token = jwt.sign({ key }, SECRET);

    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid Key" });
  }
});
app.use(
  "/market",
  cors(corsOptions),
  (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.user = decoded;

      next();
    });
  },
  marketListRoutes
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Invalid token" });
  }
}, cors(corsOptions));
app.use("/ping", cors(corsOptions), pingRoutes);
app.all("*", cors(corsOptions), (req, res) =>
  res.status(404).send("You've tried reaching a route that doesn't exist.")
);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

setInterval(() => {
  ping();
}, 300000);
