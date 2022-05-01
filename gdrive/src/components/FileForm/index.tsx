import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import UploadForm from "./UploadForm";

interface FileFromProps {
  isLogined: boolean;
}

export default function FileForm({ isLogined }: FileFromProps) {
  const background = useColorModeValue("gray.300", "gray.700");
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/signin");
  };

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Flex
        direction="column"
        p={12}
        rounded={6}
        background={background}
        w="80%"
        maxW="30rem"
      >
        {isLogined ? (
          <UploadForm />
        ) : (
          <Button onClick={onClick} background="blue.200">
            로그인 하기
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
