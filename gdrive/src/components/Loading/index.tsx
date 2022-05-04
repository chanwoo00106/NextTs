import { Box, useColorModeValue } from "@chakra-ui/react";
import { forwardRef } from "react";

const Loading = forwardRef<HTMLDivElement, {}>(({}, ref) => {
  const backColor = useColorModeValue("white", "blackAlpha.400");

  return (
    <Box
      ref={ref}
      background={backColor}
      p="2rem"
      rounded="1rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxW="30rem"
      w="100%"
      h="30rem"
    >
      <Box
        maxW="28rem"
        maxH="28rem"
        background="#eee"
        rounded={10}
        w="100%"
        h="100%"
      />
      <Box w="70%" h="1.2rem" background="#eee" mt={4} rounded={100} />
    </Box>
  );
});
Loading.displayName = "Loading";
export default Loading;
