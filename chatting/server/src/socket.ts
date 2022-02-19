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
  JOINED_MESSAGE: "JOINED_MESSAGE",
  LEAVE_ROOM_MESSAGE: "LEAVE_ROOM_MESSAGE",
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

    socket.on(
      EVENTS.JOINED_ROOM,
      ({
        key,
        name,
        nickname,
      }: {
        key: string;
        name: string;
        nickname: string;
      }) => {
        socket.join(key);

        socket.emit(EVENTS.JOINED_ROOM, { key, name });

        socket.broadcast.to(key).emit(EVENTS.JOINED_MESSAGE, {
          message: `${nickname}님이 방에 참가했습니다`,
        });

        socket.emit(EVENTS.JOINED_MESSAGE, {
          message: `${nickname}님이 방에 참가했습니다`,
        });
      }
    );

    socket.on(EVENTS.SEND_MESSAGE, ({ message, key, nickname }) => {
      socket.broadcast.to(key).emit(EVENTS.GET_MESSAGE, { message, nickname });
    });

    socket.on(EVENTS.LEAVE_ROOM, ({ key, nickname }) => {
      socket.leave(key);
      console.log(key);
      socket.broadcast.to(key).emit(EVENTS.LEAVE_ROOM_MESSAGE, {
        message: `${nickname}님이 방을 나가셨습니다`,
      });
    });

    socket.on(EVENTS.disconnect, () => {
      logger.info(`User disconnect ${socket.id}`);
    });
  });
}

export default socket;
