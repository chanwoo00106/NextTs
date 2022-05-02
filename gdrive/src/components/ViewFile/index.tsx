import {
  Box,
  Text,
  Link,
  Image,
  Flex,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { File } from "../../types/UserFiles";

interface ViewFileProps {
  file: File;
  onRemove?: (name: string) => void;
}

const ViewFile: NextPage<ViewFileProps> = ({ file, onRemove }) => {
  const backColor = useColorModeValue("white", "blackAlpha.400");

  return (
    <Box key={file.id} background={backColor} p="2rem" rounded="1rem">
      {file.mimetype.includes("image") || file.mimetype.includes("video") ? (
        <>
          {file.mimetype.includes("image") && (
            <Image maxW="30rem" src={file.url} alt={file.name} />
          )}
          {file.mimetype.includes("video") && (
            <video controls>
              <source src={file.url} type={file.mimetype} />
            </video>
          )}
        </>
      ) : (
        <Image src="/file.png" alt="file" />
      )}

      <Link href={file.url}>
        <Text fontSize="1.2rem" textAlign="center" mt={3}>
          {file.name}
        </Text>
      </Link>
      {onRemove === undefined ? (
        <></>
      ) : (
        <Flex justifyContent="center" mt={5}>
          <Button onClick={() => onRemove(file.name)}>파일 제거</Button>
        </Flex>
      )}
    </Box>
  );
};

export default ViewFile;
