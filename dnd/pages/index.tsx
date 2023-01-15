import { Container, SimpleGrid } from "@chakra-ui/react";
import Column from "../components/Column";
import Header from "../components/Header";
import { ColumnType } from "../utils/enums";

export default function Home() {
  return (
    <>
      <Header />
      <Container maxW="container.lg" px={4} py={10}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 4 }}>
          <Column column={ColumnType.TO_DO} />
          <Column column={ColumnType.IN_PROGRESS} />
          <Column column={ColumnType.BLOCKED} />
          <Column column={ColumnType.COMPLETED} />
        </SimpleGrid>
      </Container>
    </>
  );
}
