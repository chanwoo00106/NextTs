import { useMutation } from "@tanstack/react-query";

const LoginPage = () => {
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (form: FormData) => {
      "use server";
      const body = Object.fromEntries(form) as any;
      return (await fetch("/api/auth", { method: "POST", body })).json();
    },
  });

  return (
    <form action={mutate}>
      <input name="username" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
    </form>
  );
};

export default LoginPage;
