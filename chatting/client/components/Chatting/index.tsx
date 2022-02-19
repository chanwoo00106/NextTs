/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { RootState } from "../../modules";

import * as S from "./styles";
import * as RoomS from "../Rooms/styles";

interface ChattingProps {
  socket: Socket;
}

export default function Chatting({ socket }: ChattingProps) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const { key } = useSelector((state: RootState) => ({
    key: state.myRoom.key,
  }));

  useMemo(() => {
    socket.on("GET_MESSAGE", ({ message }) => {
      setMessages((msg) => {
        return [...msg, message];
      });
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("SEND_MESSAGE", { message, key });
    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <RoomS.RoomsWrapper>
      <S.List>
        {messages.map((message, i) => (
          <S.Room key={i}>{message}</S.Room>
        ))}
      </S.List>
      <RoomS.SendForm onSubmit={sendMessage}>
        <RoomS.Input
          placeholder="메시지 입력"
          type="text"
          value={message}
          onChange={onChange}
        />
        <RoomS.Button disabled={!message.trim()} type="submit">
          SEND
        </RoomS.Button>
      </RoomS.SendForm>
    </RoomS.RoomsWrapper>
  );
}
