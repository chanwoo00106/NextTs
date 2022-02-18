/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { joined_room, leave_room } from "../modules/myRoom";

interface RoomsProps {
  socket: Socket;
}

interface RoomsI {
  rooms: { key: string; name: string }[];
}

export default function Rooms({ socket }: RoomsProps) {
  const [rooms, setRooms] = useState<{ key: string; name: string }[]>([]);
  const [roomName, setRoomName] = useState<string>("");
  const dispatch = useDispatch();
  const { myRoom } = useSelector((state: RootState) => ({
    myRoom: state.myRoom,
  }));

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
  }, [socket]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setRoomName(e.target.value);

  const joinRoom = (key: string, name: string) => {
    socket.emit("JOINED_ROOM", { key, name });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("CREATE_ROOM", { roomName });
    setRoomName("");
  };

  const leaveRoom = () => {
    dispatch(leave_room());
    socket.emit("LEAVE_ROOM", { key: myRoom.key });
  };

  return (
    <div>
      {myRoom.key ? (
        <>
          <h1>Room | {myRoom.name}</h1>
          <div>
            <button onClick={leaveRoom}>나가기</button>
          </div>
        </>
      ) : (
        <h1>Rooms</h1>
      )}
      {!myRoom.key && (
        <>
          {rooms.map(({ key, name }) => (
            <div
              key={key}
              style={{ cursor: "pointer" }}
              onClick={() => joinRoom(key, name)}
            >
              {name}
            </div>
          ))}
          <form onSubmit={onSubmit}>
            <input value={roomName} onChange={onChange} type="text" />
            <button type="submit">CREATE</button>
          </form>
        </>
      )}
    </div>
  );
}
