import { Box, Button, Center } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import type { NextPage } from "next";
import { useRef } from "react";

const Home: NextPage = () => {
  const FileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Box
        height="3rem"
        position="fixed"
        top={0}
        left={0}
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="0 3rem"
        gap="2rem"
      >
        <Box fontSize="2rem">GDRIVE</Box>
        <AiOutlineUser size="2rem" />
      </Box>
      <Center display="flex" alignItems="center" height="100vh">
        <input type="file" ref={FileRef} style={{ display: "none" }} />
        <Button
          size="lg"
          onClick={() => FileRef.current?.click()}
          colorScheme="blue"
        >
          업로드 하기
        </Button>
      </Center>
    </>
  );
};

export default Home;
