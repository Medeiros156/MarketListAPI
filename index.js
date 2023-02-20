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
  allowedHeaders: "authorization",
  maxAge: 86400,
  preflightContinue: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

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

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Invalid token" });
  }
});
app.use("/ping", pingRoutes);
app.get("/", cors(corsOptions), (req, res) =>
  res.send("Welcome to MarketList API!")
);
app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist.")
);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

setInterval(() => {
  ping();
}, 300000);
