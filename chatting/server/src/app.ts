import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";
import log from "../utils/logger";
import { version } from "../package.json";

import socket from "./socket";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

server.listen(port, () => {
  log.info(`🏃 Server version ${version} is listening 🏃`);
  log.info(`http://${host}:${port}`);
  socket({ io });
});
