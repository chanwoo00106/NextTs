import { GetServerSideProps, NextPage } from "next";
import { api } from "../lib/api";
import { FileType } from "../types/FileType";
import Error from "../components/Error";
import Header from "../components/Header";
import { Box } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.query);
  try {
    const { data } = await api.get(
      `files?page=${ctx.query.page ? ctx.query.page : 1}`
    );
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    return { props: {} };
  }
};

interface FilesProps {
  data?: FileType[];
}

const Files: NextPage<FilesProps> = ({ data }) => {
  if (!data) return <Error />;
  return (
    <>
      <Header />
      <Box mt="4rem"></Box>
    </>
  );
};

export default Files;
