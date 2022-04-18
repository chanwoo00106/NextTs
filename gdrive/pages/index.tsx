import type { GetServerSideProps, NextPage } from "next";
import FileForm from "../components/FileForm";
import Header from "../components/Header";
import { api } from "../lib/api";
import checkUser from "../lib/checkUser";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const [_, accessToken] = await checkUser(ctx);

    await api.get("/auth/check", {
      headers: { cookie: `accessToken=${accessToken};` },
      withCredentials: true,
    });

    return {
      props: {
        isLogined: true,
      },
    };
  } catch (e: any) {
    if (e.isAxiosError) {
      console.log(e.response.data);
    } else console.log(e);

    return { props: { isLogined: false } };
  }
};

interface HomeProps {
  isLogined: boolean;
}

const Home: NextPage<HomeProps> = ({ isLogined }) => {
  return (
    <>
      <Header />
      <FileForm isLogined={isLogined} />
    </>
  );
};

export default Home;
