import type { NextPage } from "next";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import Chatting from "../components/Chatting";
import Rooms from "../components/Rooms";
import { SOCKET_URL } from "../config/default";
import { RootState } from "../modules";

const socket = io(SOCKET_URL);

const Home: NextPage = () => {
  const { key } = useSelector((state: RootState) => ({
    key: state.myRoom.key,
  }));

  return (
    <div>
      <Rooms socket={socket} />
      {key && <Chatting socket={socket} />}
    </div>
  );
};

export default Home;
