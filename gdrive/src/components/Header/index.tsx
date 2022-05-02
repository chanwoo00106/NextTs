import {
  Box,
  Flex,
  Input,
  Switch,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ImFilesEmpty } from "react-icons/im";

export default function MainPage() {
  const background = useColorModeValue("gray.100", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { toggleColorMode } = useColorMode();

  const onSubmit = ({ search }: any) => {
    router.push(`/file/${search}`);
    onClose();
  };

  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <>
      <Box
        zIndex={20}
        height="4rem"
        position="fixed"
        top={0}
        left={0}
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px="2rem"
        gap="2rem"
        background={background}
      >
        <Link href="/">
          <a>
            <Box fontSize="2rem">GDRIVE</Box>
          </a>
        </Link>

        <Flex
          gap="2rem"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("search")} placeholder="파일 검색" />
          </form>
          <Switch
            display="flex"
            alignItems="center"
            colorScheme="gray.200"
            size="lg"
            onChange={toggleColorMode}
          />
          <Link href="/files">
            <a>
              <ImFilesEmpty size="1.5rem" />
            </a>
          </Link>
          <Link href="/my">
            <a>
              <AiOutlineUser size="2rem" />
            </a>
          </Link>
        </Flex>

        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <HamburgerIcon fontSize="2rem" cursor="pointer" />
        </Box>
      </Box>
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100vh"
        zIndex={2}
        background="blackAlpha.300"
        display={isOpen ? "block" : "none"}
        onClick={() => handleToggle()}
      />
      <Box
        background={background}
        position="fixed"
        top="4rem"
        display={isOpen ? "block" : "none"}
        w="100%"
        zIndex="20"
      >
        <Box py="1rem" px="2rem">
          <Link href="/my">
            <a onClick={() => onClose()}>My Page</a>
          </Link>
        </Box>
        <Box py="1rem" px="2rem">
          <Switch colorScheme="gray.200" size="lg" onChange={toggleColorMode} />
        </Box>
        <Box py="1rem" px="2rem">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("search")} placeholder="파일 검색" />
          </form>
        </Box>
      </Box>
    </>
  );
}
