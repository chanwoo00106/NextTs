import { Flex, Heading, Image, Link } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { api } from "../../lib/api";
import { File } from "../../types/UserFiles";
import Header from "../../components/Header";
import Error from "../../components/Error";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const fileName = ctx.query.fileName;
    if (!fileName || Array.isArray(fileName))
      return { props: { error: true, data: null } };

    const { data }: { data: File } = await api.get(
      `/file/${encodeURI(fileName)}`
    );

    return {
      props: {
        error: false,
        data,
      },
    };
  } catch (e) {
    return {
      props: {
        error: true,
        data: null,
      },
    };
  }
};

type FileProps =
  | {
      error: true;
      data: null;
    }
  | {
      error: false;
      data: File;
    };

export default function FileView({ data, error }: FileProps) {
  if (error) return <Error />;

  return (
    <>
      <Header />
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        width="100%"
        height="100vh"
      >
        {data.mimetype.includes("image") || data.mimetype.includes("video") ? (
          <>
            {data.mimetype.includes("image") && (
              <Image src={data.url} alt={data.name} maxW={500} maxH={500} />
            )}

            {data.mimetype.includes("video") && (
              <video controls style={{ maxWidth: "500px", maxHeight: "500px" }}>
                <source src={data.url} type={data.mimetype} />
              </video>
            )}
          </>
        ) : (
          <Image src="/file.png" alt="file" maxH={300} maxW={300} />
        )}
        <Link mt={5} href={data.url}>
          <Heading>{data.name}</Heading>
        </Link>
      </Flex>
    </>
  );
}
