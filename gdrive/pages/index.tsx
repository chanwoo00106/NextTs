import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import FileForm from "../components/FileForm";
import Header from "../components/Header";
import { api } from "../lib/api";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = ctx.req.cookies["accessToken"];
  try {
    const { data } = await api.get("/auth/check", {
      headers: {
        cookie: cookie ? cookie : "",
      },
    });

    return {
      props: {
        isLogined: true,
      },
    };
  } catch (e) {
    return {
      props: {
        isLogined: false,
      },
    };
  }
};

interface HomeProps {
  isLogined: boolean;
}

const Home: NextPage<HomeProps> = ({ isLogined }) => {
  return (
    <>
      <Header />
      <FileForm isLogined={isLogined} />
    </>
  );
};

export default Home;
