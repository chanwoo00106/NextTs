import styles from "../styles/Home.module.css";

import type { NextPage } from "next";
import { useSockets } from "../context/socket.context";

import RoomsContainer from "../containers/Rooms";
import MessagesContainer from "../containers/Messages";
import { useRef, FormEvent } from "react";

const Home: NextPage = () => {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSetUsername = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = usernameRef.current?.value;

    if (!value) return;

    setUsername(value);

    localStorage.setItem("username", value);
  };

  return (
    <div>
      {!username && (
        <form className={styles.usernameWrapper} onSubmit={handleSetUsername}>
          <div className={styles.usernameInner}>
            <input type="text" placeholder="Username" ref={usernameRef} />
            <button type="submit">START</button>
          </div>
        </form>
      )}
      {username && (
        <div className={styles.continer}>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
  );
};

export default Home;
