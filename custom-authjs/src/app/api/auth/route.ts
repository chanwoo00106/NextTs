import { verify, sign } from "jsonwebtoken";
import { Token } from "@/constants/Token";
import { cookies } from "next/headers";
import authSchema from "@/schema/authSchema";
import db from "@/lib/db";

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

export const POST = async (req: Request) => {
  const { success, data } = authSchema.safeParse(await req.json());
  if (!success)
    return Response.json({ message: "Bad Request" }, { status: 400 });

  const user = await db.user.findUnique({
    where: { email: data.email },
  });

  if (!user)
    return Response.json({ message: "User not found" }, { status: 404 });

  const tokenData = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = sign(tokenData, process.env.SECRET_KEY || "", {
    expiresIn: "1d",
  });
  const cookieManager = cookies();
  cookieManager.set(Token.AccessToken, token, {
    sameSite: "strict",
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
  });

  return Response.json({ message: "success" });
};
