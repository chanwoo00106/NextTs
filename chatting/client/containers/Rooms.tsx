import { useRef, FormEvent } from "react";
import { useSockets } from "../context/socket.context";
import EVENTS from "../config/events";

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef<HTMLInputElement>(null);

  console.log(rooms);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get the room name
    const roomName = newRoomRef.current?.value || "";
    if (!String(roomName).trim()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input to empty string
    newRoomRef.current!.value = "";
  };

  console.log(rooms);

  return (
    <nav>
      <form onSubmit={onSubmit}>
        <input ref={newRoomRef} type="text" placeholder="Room name" />
        <button>CREATE ROOM</button>
      </form>

      {Object.keys(rooms).map((key) => {
        return <div key={key}>{rooms[key].name}</div>;
      })}
    </nav>
  );
}

export default RoomsContainer;
