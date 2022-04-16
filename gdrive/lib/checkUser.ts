import { GetServerSidePropsContext } from "next";
import {} from "next-redux-wrapper";
import { set_cookie } from "../modules/cookie";
import { api } from "./api";

const checkUser = async (
  ctx: GetServerSidePropsContext,
  store: any,
  { cookie, expiredAt }: { cookie: string; expiredAt: string }
): Promise<[boolean, string]> => {
  const refreshToken: string = ctx.req.cookies["refreshToken"];
  let accessToken = "";

  try {
    if (!expiredAt || new Date(expiredAt) <= new Date()) {
      const { data } = await api.post(
        "/auth/refresh",
        {},
        {
          headers: {
            cookie: `refreshToken=${refreshToken};`,
          },
          withCredentials: true,
        }
      );

      if (!data.accessToken) throw new Error("Not found cookie");

      store.dispatch(
        set_cookie(data.accessToken, new Date(data.AtExpiredAt).toString())
      );

      ctx.res.setHeader(
        "set-cookie",
        `refreshToken=${data.refreshToken}; HttpOnly; Expires=${new Date(
          data.RtExpiredAt
        ).toUTCString()};`
      );

      return [true, accessToken];
    } else if (!refreshToken) throw new Error();
    return [false, cookie];
  } catch (e: any) {
    throw new Error(e);
  }
};

export default checkUser;
