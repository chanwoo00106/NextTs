import { createContext, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/events";

interface ContextI {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages: Array<{
    message: string;
    username: string;
    time: string;
  }>;
  setMessages: Function;
  roomId?: string;
  rooms: object;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<ContextI>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: [],
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState<Array<object>>([]);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);
    setMessages([]);
  });

  socket.on(
    EVENTS.SERVER.ROOM_MESSAGE,
    ({
      message,
      username,
      time,
    }: {
      message: string;
      username: string;
      time: string;
    }) => {
      setMessages([...messages, { message, username, time }]);
    }
  );

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        roomId,
        rooms,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
