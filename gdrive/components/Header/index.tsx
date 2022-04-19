import { Box, Flex, Input, Switch, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function MainPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const onSubmit = ({ search }: any) => router.push(`/file/${search}`);
  const { toggleColorMode } = useColorMode();

  return (
    <Box
      height="4rem"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="0 3rem"
      gap="2rem"
      background="gray.100"
    >
      <Link href="/">
        <a>
          <Box fontSize="2rem">GDRIVE</Box>
        </a>
      </Link>
      <Flex gap="1rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("search")} placeholder="파일 검색" />
        </form>
        <Switch colorScheme="gray.200" size="lg" onChange={toggleColorMode} />
        <Link href="/my">
          <a>
            <AiOutlineUser size="2rem" />
          </a>
        </Link>
      </Flex>
    </Box>
  );
}
