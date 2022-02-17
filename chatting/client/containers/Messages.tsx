import { useRef } from "react";
import produce from "immer";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

function MessagesContainer() {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef<HTMLTextAreaElement>(null);

  if (!roomId) return <div />;

  const onClick = () => {
    const message = newMessageRef.current?.value;

    if (!String(message).trim()) return;

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    if (!message) return;
    const date = new Date();

    setMessages(
      produce(messages, (draft) => {
        draft.push({
          username: "You",
          message: message,
          time: `${date.getHours()}:${date.getMinutes()}`,
        });
      })
    );
  };

  return (
    <div>
      {messages?.map(({ message }, index) => (
        <p key={index}>{message}</p>
      ))}
      <div>
        <textarea ref={newMessageRef} cols={30} rows={10}></textarea>
        <button onClick={onClick}>SEND</button>
      </div>
    </div>
  );
}

export default MessagesContainer;
