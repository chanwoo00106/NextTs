import { createContext, useContext } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "../config/default";

const socket = io(SOCKET_URL);

const SocketContext = createContext({});

function SocketsProvider(props: any) {
  return <SocketContext.Provider value={{ socket }} {...props} />;
}

export const useSockets = (): any => useContext(SocketContext);

export default SocketsProvider;
