import { useState } from "react";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface inputT {
  username: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [input, setInput] = useState<inputT>({ username: "", password: "" });
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const result = await signIn("credentials", { ...input });
    console.log(result);
  };
  const { data: session } = useSession();
  if (session?.user?.name) router.push("/");

  const onChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={input.username}
          name="username"
          onChange={onChange}
          placeholder="아이디"
        />
        <input
          type="password"
          value={input.password}
          name="password"
          onChange={onChange}
          placeholder="비밀번호"
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
