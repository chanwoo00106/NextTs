import { GetServerSidePropsContext } from "next";
import { api } from "./api";

const checkUser = async (ctx: GetServerSidePropsContext): Promise<string> => {
  let accessToken: string = ctx.req.cookies["accessToken"];
  let refreshToken: string = ctx.req.cookies["refreshToken"];

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

      if (!data.accessToken) throw new Error("Not found cookie");

      ctx.res.setHeader("set-cookie", [
        `accessToken=${data.accessToken}; HttpOnly; Expires=${new Date(
          data.AtExpiredAt
        ).toUTCString()};`,
        `refreshToken=${data.refreshToken}; HttpOnly; Expires=${new Date(
          data.RtExpiredAt
        ).toUTCString()};`,
      ]);

      return data.accessToken;
    } else if (!refreshToken) {
      throw new Error();
    }
    return accessToken;
  } catch (e: any) {
    throw new Error(e);
  }
};

export default checkUser;
