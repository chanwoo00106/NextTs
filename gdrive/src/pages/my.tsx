import { useEffect, useState } from "react";
import { Container, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { api } from "../lib/api";
import checkUser from "../lib/checkUser";
import Header from "../components/Header";
import { File, UserFiles } from "../types/UserFiles";
import { GetServerSideProps } from "next";
import { errorToast } from "../lib/errorToast";
import { clientCheck } from "../lib/clientCheck";
import SEO from "../components/SEO";
import { successToast } from "../lib/successToast";
import ViewFile from "../components/ViewFile";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import Loading from "../components/Loading";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const [_, accessToken] = await checkUser(ctx);

    const { data }: { data: UserFiles } = await api.get("/my?pages=1", {
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
  const [page, setPage] = useState<number>(1);
  const [result, setResult] = useState<boolean>(true);
  const [ref, inView] = useInView();
  const toast = useToast();
  const router = useRouter();
  const [Files, setFiles] = useState<File[]>(files);

  const onRemove = async (fileName: string) => {
    try {
      await clientCheck(
        async () =>
          await api.delete(`/file/${fileName}`, { withCredentials: true })
      );
      toast(successToast("삭제 성공"));
      setFiles(Files.filter((i) => i.name !== fileName));
    } catch (e) {
      toast(errorToast("삭제 실패"));
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      toast(successToast("로그아웃 성공"));
      router.push("/");
    } catch (e) {
      toast(errorToast("로그아웃 실패"));
    }
  };

  useEffect(() => {
    if (inView) {
      (async () => {
        const { data } = await api.get(`/files?page=${page + 1}`);
        if (!data[0]) setResult(false);
        setFiles([...Files, ...data]);
        setPage(page + 1);
      })();
    }
  }, [inView]);

  return (
    <>
      <SEO title={`gdrive | ${id}`} img="" />
      <Header />
      <Container mt="6rem" mb="4rem">
        <Heading
          mb={6}
          display="flex"
          justifyContent="space-between"
          alignItems="end"
        >
          <p>{id}의 파일들</p>
          <Text
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
            fontSize="1rem"
            onClick={logout}
          >
            로그아웃
          </Text>
        </Heading>
        <Flex
          alignItems="center"
          width="100%"
          flexWrap="wrap"
          gap="2rem"
          justifyContent="center"
        >
          {Files?.map((file) => (
            <ViewFile onRemove={onRemove} file={file} key={file.id} />
          ))}
          {!files[0] && <Heading>파일이 없음</Heading>}
          {result && <Loading ref={ref} />}
        </Flex>
      </Container>
    </>
  );
};

export default My;
