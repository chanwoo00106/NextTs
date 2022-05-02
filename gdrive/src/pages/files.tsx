import { GetServerSideProps, NextPage } from "next";
import { api } from "../lib/api";
import Error from "../components/Error";
import Header from "../components/Header";
import { Flex } from "@chakra-ui/react";
import { File } from "../types/UserFiles";
import ViewFile from "../components/ViewFile";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.query);
  try {
    const { data } = await api.get(
      `files?page=${ctx.query.page ? ctx.query.page : 1}`
    );
    return {
      props: {
        files: data,
      },
    };
  } catch (e) {
    return { props: {} };
  }
};

interface FilesProps {
  files?: File[];
}

const Files: NextPage<FilesProps> = ({ files }) => {
  if (!files) return <Error />;

  return (
    <>
      <Header />
      <Flex
        alignItems="center"
        direction="column"
        mt="6rem"
        gap="2rem"
        width="100%"
      >
        {files.map((file) => (
          <ViewFile file={file} key={file.id} />
        ))}
      </Flex>
    </>
  );
};

export default Files;
