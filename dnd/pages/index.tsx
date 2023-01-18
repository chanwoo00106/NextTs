import { Container } from "@chakra-ui/react";
import Column from "components/Column";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Container display="flex" gap={5} maxW="container.lg" px={4} py={10}>
        <Column type="todoSort" />
        <Column type="doneSort" />
      </Container>
    </>
  );
}
