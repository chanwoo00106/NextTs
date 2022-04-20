import { Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "../Header";

export default function Error() {
  const router = useRouter();

  return (
    <>
      <Header />
      <Flex
        width="100%"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <Heading mb={10}>404 Not Found</Heading>

        <Button background="gray.300" p={5} onClick={() => router.push("/")}>
          홈으로
        </Button>
      </Flex>
    </>
  );
}
