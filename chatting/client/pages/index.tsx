import type { NextPage } from "next";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import Chatting from "../components/Chatting";
import Rooms from "../components/Rooms";
import { SOCKET_URL } from "../config/default";
import { RootState } from "../modules";

const socket = io(SOCKET_URL);

const Home: NextPage = () => {
  const { myRoom } = useSelector((state: RootState) => ({
    myRoom: state.myRoom,
  }));
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
      {myRoom.key && <Chatting socket={socket} />}
    </div>
  );
};

export default Home;
