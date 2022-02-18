import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import logger from "../utils/logger";

const EVENTS = {
  connection: "connection",
  disconnect: "disconnect",
  SEND_MESSAGE: "SEND_MESSAGE",
  GET_MESSAGE: "GET_MESSAGE",
};

const rooms: Record<string, { name: string }> = {};

function socket({ io }: { io: Server }) {
  logger.info(`Sockets enabled`);

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);

    socket.on(EVENTS.SEND_MESSAGE, ({ username, message }) => {
      console.log(username, message);
      socket.broadcast.emit(EVENTS.GET_MESSAGE, { username, message });
    });

    socket.on(EVENTS.disconnect, () => {
      console.log("disconnect");
    });
  });
}

export default socket;
