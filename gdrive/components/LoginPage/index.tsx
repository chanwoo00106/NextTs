import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface LoginPageProps {
  type: "SignIn" | "SignUp";
}

export default function LoginPage({ type }: LoginPageProps) {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    if (data.password === data.pw) console.log("first");
  };

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Flex
        as="form"
        direction="column"
        background="gray.300"
        p="25"
        rounded={6}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading mb={6} textAlign="center">
          {type}
        </Heading>
        <Input {...register("id")} mb={3} placeholder="아이디" />
        <Input
          {...register("password")}
          mb={3}
          placeholder="비밀번호"
          type="password"
        />
        {type === "SignUp" && (
          <Input
            {...register("pw")}
            type="password"
            mb={6}
            placeholder="비밀번호 확인"
          />
        )}
        <Button type="submit" colorScheme="teal">
          {type}
        </Button>
      </Flex>
    </Flex>
  );
}
