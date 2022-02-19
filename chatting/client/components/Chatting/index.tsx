/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { RootState } from "../../modules";

import * as S from "./styles";
import * as RoomS from "../Rooms/styles";

interface ChattingProps {
  socket: Socket;
}

interface MessagesI {
  message: string;
  nickname?: string;
  textAlign: "left" | "right" | "center";
}

export default function Chatting({ socket }: ChattingProps) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessagesI[]>([]);
  const { key, nickname } = useSelector((state: RootState) => ({
    key: state.myRoom.key,
    nickname: state.myRoom.nickname,
  }));

  useEffect(() => {
    setTimeout(() => {
      const scroll = document.querySelector("ul.messages");
      scroll?.scrollIntoView({ behavior: "smooth" });
      scroll!.scrollTop = scroll!.scrollHeight;
    }, 10);
  }, [messages]);

  useMemo(() => {
    socket.on("GET_MESSAGE", ({ message, nickname }) => {
      setMessages((msg) => {
        return [...msg, { message, nickname, textAlign: "right" }];
      });
    });

    socket.on("JOINED_MESSAGE", ({ message }) => {
      setMessages((msg) => {
        return [...msg, { message, textAlign: "center" }];
      });
    });

    socket.on("LEAVE_ROOM_MESSAGE", ({ message }) => {
      setMessages((msg) => {
        return [...msg, { message, textAlign: "center" }];
      });
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("SEND_MESSAGE", { message, key, nickname });
    setMessages([...messages, { message, nickname: "Me", textAlign: "left" }]);
    setMessage("");
  };

  return (
    <RoomS.RoomsWrapper>
      <S.List className="messages">
        {messages.map(({ message, nickname, textAlign }, i) => (
          <S.Room style={{ textAlign }} key={i}>
            <S.Nickname>{nickname}</S.Nickname>
            {nickname ? (
              <S.Message
                style={{
                  background: textAlign === "left" ? "#2ed573" : "#1e90ff",
                }}
              >
                {message}
              </S.Message>
            ) : (
              <S.Message style={{ color: "#000" }}>{message}</S.Message>
            )}
          </S.Room>
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
