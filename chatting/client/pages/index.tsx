import type { NextPage } from "next";
import io from "socket.io-client";
import { SOCKET_URL } from "../config/default";

const socket = io(SOCKET_URL);

const Home: NextPage = () => {
  return <div></div>;
};

export default Home;
