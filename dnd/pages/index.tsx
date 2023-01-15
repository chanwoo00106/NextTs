import { Container } from "@chakra-ui/react";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Container maxW="container.lg" px={4} py={10}></Container>
    </>
  );
}
