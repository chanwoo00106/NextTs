import type { GetServerSideProps, NextPage } from "next";
import FileForm from "../components/FileForm";
import Header from "../components/Header";
import { api } from "../lib/api";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let accessToken = ctx.req.cookies["accessToken"];
  let refreshToken = ctx.req.cookies["refreshToken"];

  try {
    if (!accessToken) {
      const { data } = await api.post(
        "/auth/refresh",
        {},
        {
          headers: {
            cookie: refreshToken ? refreshToken : "",
          },
          withCredentials: true,
        }
      );

      ctx.res.setHeader("set-cookie", [
        `accessToken=${data.accessToken}; HttpOnly; Expires=${new Date(
          data.AtExpiredAt
        ).toUTCString()};`,
        `refreshToken=${data.refreshToken}; HttpOnly; Expires=${new Date(
          data.RtExpiredAt
        ).toUTCString()};`,
      ]);

      return {
        props: {
          isLogined: true,
        },
      };
    }
    await api.get("/auth/check", {
      headers: {
        cookie: accessToken ? accessToken : "",
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
