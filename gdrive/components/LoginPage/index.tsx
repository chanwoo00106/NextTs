import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface LoginPageProps {
  type: "SignIn" | "SignUp";
}

export default function LoginPage({ type }: LoginPageProps) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    if (data.password === data.pw) console.log("first");
  };
  const background = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Flex
        as="form"
        direction="column"
        background={background}
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
            mb={3}
            placeholder="비밀번호 확인"
          />
        )}
        <Text fontSize="sm" textAlign="right" mb={6}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() =>
              router.push(
                `/auth/${
                  type === "SignIn"
                    ? "SignUp".toLowerCase()
                    : "SignIn".toLowerCase()
                }`
              )
            }
          >
            {type === "SignIn" ? "SignUp" : "SignIn"}
          </span>
        </Text>
        <Button type="submit" colorScheme="teal">
          {type}
        </Button>
      </Flex>
    </Flex>
  );
}
