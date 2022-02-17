import type { NextPage } from "next";
import { useSockets } from "../context/socket.context";

const Home: NextPage = () => {
  const { socket } = useSockets();

  return (
    <div>
      <h1>{socket.id}</h1>
    </div>
  );
};

export default Home;
