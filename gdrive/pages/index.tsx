import type { NextPage } from "next";
import FileForm from "../components/FileForm";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <FileForm />
    </>
  );
};

export default Home;
