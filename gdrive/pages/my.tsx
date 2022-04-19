import { Container, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { api } from "../lib/api";
import checkUser from "../lib/checkUser";
import Header from "../components/Header";
import { File, UserFiles } from "../types/UserFiles";
import { GetServerSideProps } from "next";

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
  console.log(files);
  return (
    <>
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
          {files?.map((file) => (
            <Link
              href={file.url}
              key={file.id}
              background="#fff"
              p="2rem"
              rounded="1rem"
            >
              {file.mimetype.includes("image") ||
              file.mimetype.includes("video") ? (
                <>
                  {file.mimetype.includes("image") && (
                    <Image src={file.url} alt={file.name} />
                  )}
                  {file.mimetype.includes("video") && (
                    <video controls>
                      <source
                        src="/media/cc0-videos/flower.webm"
                        type="video/webm"
                      />

                      <source src={file.url} type="video/mp4" />
                    </video>
                  )}
                </>
              ) : (
                <Image src="/file.png" alt="file" />
              )}

              <Text textAlign="center" mt={3}>
                {file.name}
              </Text>
            </Link>
          ))}
        </Flex>
      </Container>
    </>
  );
};

export default My;
