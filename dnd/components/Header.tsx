import { Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Heading
      fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
      fontWeight="bold"
      textAlign="center"
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
      mt={4}
    >
      Welcome to DnD Kanban
    </Heading>
  );
};

export default Header;
