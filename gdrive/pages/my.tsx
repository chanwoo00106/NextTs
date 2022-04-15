import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { api } from "../lib/api";
import checkUser from "../lib/checkUser";
import Header from "../components/Header";
import { Files, UserFiles } from "../types/UserFiles";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const [_, accessToken] = await checkUser(ctx);

    const { data }: { data: UserFiles } = await api.get("/my", {
      headers: { cookie: `accessToken=${accessToken};` },
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
  files: Files[];
}

const My = ({ id, files }: MyProps) => {
  return (
    <>
      <Header />
      <Container mt="6rem">
        <Heading>{id}의 파일들</Heading>
        <Flex justifyContent="center" alignItems="center">
          {files?.map((file) => (
            <Box key={file.id} background="#fff">
              <Text>{files[0].name}</Text>
            </Box>
          ))}
        </Flex>
      </Container>
    </>
  );
};

export default My;
