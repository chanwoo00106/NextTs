/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import Chatting from "../components/Chatting";
import Rooms from "../components/Rooms";
import { SOCKET_URL } from "../config/default";
import { RootState } from "../modules";
import { change_nickname, leave_room } from "../modules/myRoom";
import { ChangeEvent, useMemo } from "react";

import { GrNext } from "react-icons/gr";

const socket = io(SOCKET_URL);

const Home: NextPage = () => {
  const { key, name, nickname } = useSelector((state: RootState) => ({
    key: state.myRoom.key,
    name: state.myRoom.name,
    nickname: state.myRoom.nickname,
  }));
  const dispatch = useDispatch();

  const leaveRoom = () => {
    socket.emit("LEAVE_ROOM", { key, nickname });
    dispatch(leave_room());
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(change_nickname(e.target.value.trim()));

  return (
    <HomeWrapper>
      <Title>
        {key && <GrNext onClick={leaveRoom} size="2rem" />}
        {!key ? (
          <>
            <div>Room List</div>
            <Input
              type="text"
              placeholder="닉네임 입력"
              maxLength={10}
              minLength={1}
              value={nickname}
              onChange={onChange}
            />
          </>
        ) : (
          <div>{`${name} Room`}</div>
        )}
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
  justify-content: space-between;

  svg {
    transform: rotate(180deg);
    cursor: pointer;

    polyline {
      stroke: #fff;
    }
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1rem;
  padding: 5px 10px;
  border-radius: 10px;
`;

export default Home;
