import { GetServerSideProps, NextPage } from "next";
import { api } from "../lib/api";
import Header from "../components/Header";
import { Flex, Heading } from "@chakra-ui/react";
import { File } from "../types/UserFiles";
import ViewFile from "../components/ViewFile";
import SEO from "../components/SEO";
import Loading from "../components/Loading";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Error from "../components/Error";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data } = await api.get(
      `files?page=${ctx.query.page ? ctx.query.page : 1}`
    );
    return {
      props: {
        Files: data,
      },
    };
  } catch (e) {
    return { props: { isError: true } };
  }
};

interface FilesProps {
  Files: File[];
  isError?: boolean;
}

const Files: NextPage<FilesProps> = ({ Files, isError }) => {
  const [files, setFiles] = useState<File[]>(Files);
  const [page, setPage] = useState<number>(1);
  const [result, setResult] = useState<boolean>(true);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      (async () => {
        const { data } = await api.get(`/files?page=${page + 1}`);
        if (!data[0]) setResult(false);
        setFiles([...files, ...data]);
        setPage(page + 1);
      })();
    }
  }, [inView]);

  if (isError) return <Error />;

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
        {files?.map((file: File) => (
          <ViewFile file={file} key={file.id} />
        ))}
        {!files[0] && <Heading>파일이 없음</Heading>}
        {result && <Loading ref={ref} />}
      </Flex>
    </>
  );
};

export default Files;
