import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import logger from "../utils/logger";

const EVENTS = {
  connection: "connection",
  disconnect: "disconnect",
  SEND_MESSAGE: "SEND_MESSAGE",
  GET_MESSAGE: "GET_MESSAGE",
  CREATE_ROOM: "CREATE_ROOM",
  GET_ROOMS: "GET_ROOMS",
  NEW_ROOM: "NEW_ROOM",
};

const rooms: { key: string; name: string }[] = [];

function socket({ io }: { io: Server }) {
  logger.info(`Sockets enabled`);

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);

    socket.on(EVENTS.GET_ROOMS, () => {
      socket.emit(EVENTS.GET_ROOMS, { rooms });
    });

    socket.on(EVENTS.CREATE_ROOM, ({ roomName }) => {
      const roomId = nanoid();
      rooms.push({ key: roomId, name: roomName });
      socket.emit(EVENTS.NEW_ROOM, { key: roomId, name: roomName });
      socket.join(roomId);
    });

    socket.on(EVENTS.SEND_MESSAGE, ({ username, message }) => {
      socket.broadcast.emit(EVENTS.GET_MESSAGE, { username, message });
    });

    socket.on(EVENTS.disconnect, () => {
      console.log("disconnect");
    });
  });
}

export default socket;
