import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import Chatting from "../components/Chatting";
import Rooms from "../components/Rooms";
import { SOCKET_URL } from "../config/default";
import { RootState } from "../modules";

import { GrNext } from "react-icons/gr";
import { leave_room } from "../modules/myRoom";

const socket = io(SOCKET_URL);

const Home: NextPage = () => {
  const { key, name } = useSelector((state: RootState) => ({
    key: state.myRoom.key,
    name: state.myRoom.name,
  }));
  const dispatch = useDispatch();

  const leaveRoom = () => {
    socket.emit("LEAVE_ROOM", { key });
    dispatch(leave_room());
  };

  return (
    <HomeWrapper>
      <Title align={key}>
        {key && <GrNext onClick={leaveRoom} size="2rem" />}
        <div>{!key ? "Room List" : `${name} Room`}</div>
      </Title>
      {!key && <Rooms socket={socket} />}
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
  padding: 0.5rem 1rem;
  color: #fff;
  font-size: 2.5rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: ${(props: { align: string }) =>
    props.align ? "space-between" : "left"};

  svg {
    transform: rotate(180deg);
    cursor: pointer;

    polyline {
      stroke: #fff;
    }
  }
`;

export default Home;
