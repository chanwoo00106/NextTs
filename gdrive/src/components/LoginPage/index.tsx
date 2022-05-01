import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "../../lib/api";
import { errorToast } from "../../lib/errorToast";
import { successToast } from "../../lib/successToast";

interface LoginPageProps {
  type: "SignIn" | "SignUp";
}

export default function LoginPage({ type }: LoginPageProps) {
  const toast = useToast();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const background = useColorModeValue("gray.200", "gray.700");

  const onSubmit = async (data: any) => {
    if (!data.id) {
      toast(errorToast("아이디를 작성해주세요"));
      return;
    } else if (!data.password) {
      toast(errorToast("비밀번호를 작성해주세요"));
      return;
    } else if (data.password !== data.pw && type === "SignUp") {
      toast(errorToast("비밀번호가 맞지 않습니다"));
      return;
    }
    try {
      await api.post(
        `/auth/${type.toLowerCase()}`,
        {
          ...data,
        },
        { withCredentials: true }
      );
      toast(successToast("성공!"));
      if (type === "SignUp") router.push("/auth/signin");
      else router.push("/");
    } catch (e: any) {
      toast(errorToast("로그인에 실패했습니다"));
    }
  };

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
          <>
            <Input
              {...register("pw")}
              type="password"
              mb={3}
              placeholder="비밀번호 확인"
            />
            <Input
              {...register("wifiPw")}
              type="password"
              mb={3}
              placeholder="와이파이 비밀번호"
            />
          </>
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
