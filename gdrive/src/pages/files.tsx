import { GetServerSideProps, NextPage } from "next";
import { api } from "../lib/api";
import Error from "../components/Error";
import Header from "../components/Header";
import { Flex, Heading } from "@chakra-ui/react";
import { File } from "../types/UserFiles";
import ViewFile from "../components/ViewFile";
import SEO from "../components/SEO";
import Loading from "../components/Loading";

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
  console.log(files[0]);

  return (
    <>
      <SEO
        title="GDRIVE | files"
        img={files[0]?.url}
        description="GDRIVE 실시간 업로드된 파일"
      />
      <Header />
      <Flex
        alignItems="center"
        direction="column"
        pt="6rem"
        gap="2rem"
        width="100%"
        px={5}
        mb={5}
      >
        {files?.map((file) => (
          <ViewFile file={file} key={file.id} />
        ))}
        {!files[0] && <Heading>파일이 없음</Heading>}
        <Loading />
      </Flex>
    </>
  );
};

export default Files;
