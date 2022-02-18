import type { NextPage } from "next";
// import { ChangeEvent, FormEvent, useState } from "react";
import io from "socket.io-client";
import Rooms from "../components/Rooms";
import { SOCKET_URL } from "../config/default";

const socket = io(SOCKET_URL);

const Home: NextPage = () => {
  // const [messages, setMessages] = useState<MessageI[]>([]);
  // const [message, setMessage] = useState<string>("");

  // socket.on("GET_MESSAGE", ({ username, message }) => {
  //   setMessages([
  //     ...messages,
  //     {
  //       username,
  //       message,
  //     },
  //   ]);
  // });

  // const onChange = (e: ChangeEvent<HTMLInputElement>) =>
  //   setMessage(e.target.value);

  // const onSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   socket.emit("SEND_MESSAGE", { username: "chanwoo", message });
  //   setMessage("");
  //   setMessages([
  //     ...messages,
  //     {
  //       username: "chanwoo",
  //       message,
  //     },
  //   ]);
  // };

  return (
    <div>
      <Rooms socket={socket} />
    </div>
  );
};

export default Home;
