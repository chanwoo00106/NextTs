import { Box, useColorMode } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { toggleColorMode } = useColorMode();
  return <Box height="100vh" onClick={toggleColorMode}></Box>;
};

export default Home;
