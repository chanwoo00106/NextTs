import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import styled from "@emotion/styled";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <MainStyle>
      <Head>
        <title>anyting</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h4 onClick={() => signOut()}>Log out</h4>

      <main>
        <h1>
          Welcome to{" "}
          <Link href="/login">
            <a>{session?.user?.name ? session.user.name : "login"}</a>
          </Link>
        </h1>
      </main>

      <TodoStyle>{}</TodoStyle>
    </MainStyle>
  );
};

export default Home;

const MainStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  text-align: center;

  h4 {
    position: absolute;
    top: 10px;
    right: 50px;
    margin: 0;
  }
`;

const TodoStyle = styled.ul`
  margin-top: 20px;
  padding: 10px 5px;
`;
