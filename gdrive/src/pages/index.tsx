import type { GetServerSideProps, NextPage } from "next";
import FileForm from "../components/FileForm";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { api } from "../lib/api";
import checkUser from "../lib/checkUser";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const [isrefresh, accessToken] = await checkUser(ctx);

    if (isrefresh) return { props: { isLogined: true } };

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
    return { props: { isLogined: false } };
  }
};

interface HomeProps {
  isLogined: boolean;
}

const Home: NextPage<HomeProps> = ({ isLogined }) => {
  return (
    <>
      <SEO title="gdrive" />
      <Header />
      <FileForm isLogined={isLogined} />
    </>
  );
};

export default Home;
