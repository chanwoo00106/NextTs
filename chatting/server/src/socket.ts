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
  JOINED_ROOM: "JOINED_ROOM",
  LEAVE_ROOM: "LEAVE_ROOM",
};

interface RoomType {
  key: string;
  name: string;
}

const rooms: RoomType[] = [];

function socket({ io }: { io: Server }) {
  logger.info(`Sockets enabled`);

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);

    socket.on(EVENTS.GET_ROOMS, () => {
      socket.emit(EVENTS.GET_ROOMS, { rooms });
    });

    socket.on(EVENTS.CREATE_ROOM, ({ roomName }) => {
      const key = nanoid();
      rooms.push({ key, name: roomName });
      socket.emit(EVENTS.NEW_ROOM, { key, name: roomName });
      socket.broadcast.emit(EVENTS.NEW_ROOM, { key, name: roomName });
      socket.join(key);
      socket.emit(EVENTS.JOINED_ROOM, { key, name: roomName });
    });

    socket.on(EVENTS.JOINED_ROOM, ({ key, name }: RoomType) => {
      console.log("join" + key);
      socket.join(key);
      socket.emit(EVENTS.JOINED_ROOM, { key, name });
    });

    socket.on(EVENTS.LEAVE_ROOM, (key: string) => {
      console.log("leave" + key);
      socket.leave(key);
    });

    socket.on(EVENTS.SEND_MESSAGE, ({ message, key }) => {
      socket.broadcast.to(key).emit(EVENTS.GET_MESSAGE, { message });
    });

    socket.on(EVENTS.disconnect, () => {
      console.log("disconnect");
    });
  });
}

export default socket;
