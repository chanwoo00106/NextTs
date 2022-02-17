import { createContext, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";

interface ContextI {
  socket: Socket;
  username?: string;
  setUsername: Function;
  roomId?: string;
  rooms: object;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<ContextI>({
  socket,
  setUsername: () => false,
  rooms: {},
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [rooms, setRooms] = useState([]);

  return (
    <SocketContext.Provider
      value={{ socket, username, setUsername, roomId, rooms }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
