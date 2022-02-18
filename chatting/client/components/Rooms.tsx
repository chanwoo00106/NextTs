/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface RoomsProps {
  socket: Socket;
}

interface RoomsI {
  rooms: { key: string; name: string }[];
}

export default function Rooms({ socket }: RoomsProps) {
  const [rooms, setRooms] = useState<{ key: string; name: string }[]>([]);
  const [roomName, setRoomName] = useState<string>("");

  useEffect(() => {
    socket.emit("GET_ROOMS");
  }, []);

  socket.on("GET_ROOMS", ({ rooms }: RoomsI) => {
    setRooms(rooms);
    console.log(rooms);
  });

  socket.on("NEW_ROOM", ({ key, name }: { key: string; name: string }) => {
    setRooms([...rooms, { key, name }]);
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setRoomName(e.target.value);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(roomName);
    socket.emit("CREATE_ROOM", { roomName });
    setRoomName("");
  };

  return (
    <div>
      <h1>Rooms</h1>
      {rooms.map(({ key, name }) => (
        <div key={key}>{name}</div>
      ))}
      <form onSubmit={onSubmit}>
        <input value={roomName} onChange={onChange} type="text" />
        <button type="submit">CREATE</button>
      </form>
    </div>
  );
}
