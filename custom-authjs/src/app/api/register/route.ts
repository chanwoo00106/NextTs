import db from "@/lib/db";
import registerSchema from "@/schema/registerSchema";

export const POST = async (req: Request) => {
  try {
    const { success, data } = registerSchema.safeParse(await req.json());
    if (!success)
      return Response.json({ message: "Bad Request" }, { status: 400 });

    const isUserExist = await db.user.findUnique({
      where: { email: data.email },
    });

    if (isUserExist)
      return Response.json({ message: "User already exist" }, { status: 409 });

    await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return Response.json({ message: "User created" }, { status: 201 });
  } catch (e) {
    console.error(e);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
