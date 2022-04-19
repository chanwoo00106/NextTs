import { Flex, Heading, Image } from "@chakra-ui/react";
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
      <Flex mt="6rem" justifyContent="center">
        {data.mimetype.includes("image") || data.mimetype.includes("video") ? (
          <>
            {data.mimetype.includes("image") && (
              <Image src={data.url} alt={data.name} />
            )}
            {data.mimetype.includes("video") && (
              <video controls>
                <source src="/media/cc0-videos/flower.webm" type="video/webm" />

                <source src={data.url} type="video/mp4" />
              </video>
            )}
          </>
        ) : (
          <Image src="/file.png" alt="file" />
        )}
        <Heading>{data.name}</Heading>
      </Flex>
    </>
  );
}
