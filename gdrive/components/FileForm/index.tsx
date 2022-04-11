import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function FileForm() {
  const FileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>();
  const toast = useToast();
  const onSubmit = async (data: any) => {
    if (FileRef.current?.files?.length === 0 || !FileRef.current?.files) {
      toast({
        title: "파일을 추가해주세요",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    // TODO 파일 업로드 api 요청
  };
  const { register, handleSubmit } = useForm();
  const background = useColorModeValue("gray.300", "gray.700");
  const btnColor = useColorModeValue("blue.300", "blue.700");

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Flex direction="column" p={12} rounded={6} background={background}>
        <FormControl
          as="form"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="2rem"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("file")}
            type="file"
            ref={FileRef}
            style={{ display: "none" }}
            onChange={() => {
              if (FileRef.current?.files)
                setFileName(FileRef.current?.files[0].name);
            }}
          />
          <Flex width="100%" justifyContent="space-around" alignItems="center">
            {fileName && <Box>{fileName}</Box>}
            <Button
              size="lg"
              onClick={() => FileRef.current?.click()}
              color="white"
              background={btnColor}
            >
              파일 선택
            </Button>
          </Flex>

          <Input
            {...register("name")}
            placeholder="파일 이름 입력 (선택)"
            width="25rem"
          />
          <Button width="10rem" type="submit">
            업로드
          </Button>
        </FormControl>
      </Flex>
    </Flex>
  );
}
