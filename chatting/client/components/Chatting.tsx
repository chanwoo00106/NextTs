/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { RootState } from "../modules";

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
    <div>
      <div>
        {messages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={onChange} />
        <button type="submit">SEND</button>
      </form>
    </div>
  );
}
