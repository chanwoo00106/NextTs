import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import Chatting from "../components/Chatting";
import Rooms from "../components/Rooms";
import { SOCKET_URL } from "../config/default";
import { RootState } from "../modules";

const socket = io(SOCKET_URL);

const Home: NextPage = () => {
  const { key, name } = useSelector((state: RootState) => ({
    key: state.myRoom.key,
    name: state.myRoom.name,
  }));

  return (
    <HomeWrapper>
      <Title>{!key ? "Room List" : `${name} Room`}</Title>
      <Rooms socket={socket} />
      {key && <Chatting socket={socket} />}
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
`;

const Title = styled.div`
  width: 600px;
  background: #000;
  padding: 0 2rem;
  color: #fff;
  font-size: 3rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export default Home;
