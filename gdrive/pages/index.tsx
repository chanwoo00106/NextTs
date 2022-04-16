import type { NextPage } from "next";
import FileForm from "../components/FileForm";
import Header from "../components/Header";
import { api } from "../lib/api";
import wrapper from "../modules";
import { set_cookie } from "../modules/cookie";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { expiredAt } = store.getState().cookie;
    let refreshToken = ctx.req.cookies["refreshToken"];
    let accessToken = "";

    try {
      if (!refreshToken) throw new Error();
      else if (!expiredAt || new Date(expiredAt) <= new Date()) {
        const { data } = await api.post(
          "/auth/refresh",
          {},
          {
            headers: { cookie: `refreshToken=${refreshToken}` },
            withCredentials: true,
          }
        );

        accessToken = data.accessToken;

        store.dispatch(
          set_cookie(data.accessToken, new Date(data.AtExpiredAt).toString())
        );
        ctx.res.setHeader(
          "set-cookie",
          `refreshToken=${data.refreshToken}; HttpOnly; Expires=${new Date(
            data.RtExpiredAt
          ).toUTCString()};`
        );
      }

      await api.get("/auth/check", {
        headers: { cookie: `accessToken=${accessToken};` },
        withCredentials: true,
      });

      return {
        props: {
          isLogined: true,
        },
      };
    } catch (e: any) {
      if (e.isAxiosError) {
        console.log(e.response.data);
      } else console.log(e);

      return { props: { isLogined: false } };
    }
  }
);

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
