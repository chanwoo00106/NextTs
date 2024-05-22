import { verify, sign } from "jsonwebtoken";
import { Token } from "@/constants/Token";
import { z } from "zod";
import { cookies } from "next/headers";

const invalidResponse = Response.json(
  { error: "Invalid token" },
  { status: 401 },
);

export const GET = () => {
  try {
    const cookieManager = cookies();

    const accessToken = cookieManager.get(Token.AccessToken)?.value;
    const result = verify(accessToken || "", process.env.SECRET_KEY || "");

    if (!result) return invalidResponse;

    return Response.json({ message: "success" }, { status: 200 });
  } catch (e) {
    return invalidResponse;
  }
};

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const POST = async (req: Request) => {
  const { success, data } = bodySchema.safeParse(await req.json());
  if (!success)
    return Response.json({ message: "Bad Request" }, { status: 400 });

  const token = sign(data, process.env.SECRET_KEY || "", { expiresIn: "1d" });
  const cookieManager = cookies();
  cookieManager.set(Token.AccessToken, token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
  });

  return Response.json({ message: "success" });
};
