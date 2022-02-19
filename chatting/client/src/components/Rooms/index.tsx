/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { joined_room, leave_room } from "../../modules/myRoom";

import * as S from "./styles";
import produce from "immer";

interface RoomsProps {
  socket: Socket;
}

interface RoomsI {
  rooms: { key: string; name: string }[];
}

export default function Rooms({ socket }: RoomsProps) {
  const [rooms, setRooms] = useState<{ key: string; name: string }[]>([]);
  const [roomName, setRoomName] = useState<string>("");
  const { nickname } = useSelector((state: RootState) => ({
    nickname: state.myRoom.nickname,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("GET_ROOMS");
  }, []);

  useEffect(() => {
    socket.on("GET_ROOMS", ({ rooms }: RoomsI) => {
      setRooms(rooms);
    });

    socket.on("NEW_ROOM", ({ key, name }: { key: string; name: string }) => {
      setRooms([...rooms, { key, name }]);
    });

    socket.on("JOINED_ROOM", ({ key, name }: { key: string; name: string }) => {
      dispatch(joined_room({ key, name }));
    });

    socket.on("DELETE_ROOM", ({ key }) => {
      setRooms(
        produce(rooms, (draft) => {
          draft = draft.filter((i) => i.key !== key);
        })
      );
    });
  }, [socket]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setRoomName(e.target.value);

  const joinRoom = (key: string, name: string) => {
    if (!nickname) alert("nickname을 입력해주세요");
    else socket.emit("JOINED_ROOM", { key, name, nickname });
  };

  const deleteRoom = (key: string) => {
    const password = prompt("방의 비밀번호를 입력해주세요");
    socket.emit("DELETE_ROOM", { key, password });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nickname) alert("nickname을 입력해주세요");
    else {
      const password = prompt("방의 비밀번호를 입력해주세요");
      if (!password) return;
      socket.emit("CREATE_ROOM", { roomName, password });
      setRoomName("");
    }
  };

  return (
    <S.RoomsWrapper>
      <S.List>
        {rooms.map(({ key, name }) => (
          <S.Room key={key}>
            <div onClick={() => joinRoom(key, name)}>{name}</div>
            <S.DeleteRoom onClick={() => deleteRoom(key)}>
              방 지우기
            </S.DeleteRoom>
          </S.Room>
        ))}
      </S.List>
      <S.SendForm onSubmit={onSubmit}>
        <S.Input
          placeholder="방 이름 입력"
          value={roomName}
          onChange={onChange}
          maxLength={10}
          minLength={1}
          type="text"
        />
        <S.Button type="submit" disabled={!roomName.trim()}>
          CREATE
        </S.Button>
      </S.SendForm>
    </S.RoomsWrapper>
  );
}
