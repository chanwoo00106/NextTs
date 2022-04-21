import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { api } from "../lib/api";
import checkUser from "../lib/checkUser";
import Header from "../components/Header";
import { File, UserFiles } from "../types/UserFiles";
import { GetServerSideProps } from "next";
import { errorToast } from "../lib/errorToast";
import { useState } from "react";
import { clientCheck } from "../lib/clientCheck";
import SEO from "../components/SEO";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const [_, accessToken] = await checkUser(ctx);

    const { data }: { data: UserFiles } = await api.get("/my", {
      headers: { cookie: `accessToken=${accessToken};` },
      withCredentials: true,
    });

    return {
      props: {
        ...data,
      },
    };
  } catch (e) {
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    };
  }
};

interface MyProps {
  id: string;
  files: File[];
}

const My = ({ id, files }: MyProps) => {
  const toast = useToast();
  const backColor = useColorModeValue("white", "blackAlpha.400");
  const [Files, setFiles] = useState<File[]>(files);
  const onRemove = async (fileName: string) => {
    try {
      await clientCheck(
        async () =>
          await api.delete(`/file/${fileName}`, { withCredentials: true })
      );
      toast({
        isClosable: true,
        position: "top-right",
        status: "success",
        title: "삭제 성공",
        duration: 2000,
      });
      setFiles(Files.filter((i) => i.name !== fileName));
    } catch (e) {
      toast(errorToast("삭제 실패"));
    }
  };
  return (
    <>
      <SEO title={`gdrive | ${id}`} img="" />
      <Header />
      <Container mt="6rem" mb="4rem">
        <Heading mb={6}>{id}의 파일들</Heading>
        <Flex
          alignItems="center"
          width="100%"
          flexWrap="wrap"
          gap="2rem"
          justifyContent="center"
        >
          {Files?.map((file) => (
            <Box key={file.id} background={backColor} p="2rem" rounded="1rem">
              {file.mimetype.includes("image") ||
              file.mimetype.includes("video") ? (
                <>
                  {file.mimetype.includes("image") && (
                    <Image src={file.url} alt={file.name} />
                  )}
                  {file.mimetype.includes("video") && (
                    <video controls>
                      <source src={file.url} type={file.mimetype} />
                    </video>
                  )}
                </>
              ) : (
                <Image src="/file.png" alt="file" />
              )}

              <Link href={file.url}>
                <Text fontSize="1.2rem" textAlign="center" mt={3}>
                  {file.name}
                </Text>
              </Link>
              <Flex justifyContent="center" mt={5}>
                <Button onClick={() => onRemove(file.name)}>파일 제거</Button>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Container>
    </>
  );
};

export default My;
