import { Box } from "@chakra-ui/react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";

export default function MainPage() {
  return (
    <Box
      height="3rem"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="0 3rem"
      gap="2rem"
    >
      <Box fontSize="2rem">GDRIVE</Box>
      <AiOutlineUser size="2rem" />
    </Box>
  );
}
