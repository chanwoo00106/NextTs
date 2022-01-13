import { useState } from "react";
import styled from "@emotion/styled";
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
    <LoginWrapper>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
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
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;

    h1 {
      text-align: center;
    }

    input {
      margin-bottom: 20px;
      border: none;
      outline: none;
      background-color: #d9d9d9;
      height: 40px;
      padding: 10px;
      border-radius: 10px;
    }

    button {
      outline: none;
      border: none;
      border-radius: 10px;
      width: 50%;
      margin: 0 auto;
      padding: 10px;
      background: #e9e9e9;
    }
  }
`;
