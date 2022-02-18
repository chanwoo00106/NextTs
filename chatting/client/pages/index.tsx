import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "../config/default";

const socket = io(SOCKET_URL);

const Home: NextPage = () => {
  const [message, setMessage] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("SEND_MESSAGE", { username: "chanwoo", message });
    setMessage("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={message}
          onChange={onChange}
          type="text"
          placeholder="type message"
        />
        <button type="submit">SEND</button>
      </form>
    </div>
  );
};

export default Home;
