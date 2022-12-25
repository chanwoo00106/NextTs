import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3000/hello", (_req, res, ctx) => {
    return res(
      ctx.json({
        ok: true,
        msg: "Hello",
      })
    );
  }),
];
