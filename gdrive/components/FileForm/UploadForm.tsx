import {
  Button,
  Flex,
  FormControl,
  Input,
  useColorModeValue,
  useToast,
  Box,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../lib/api";
import { errorToast } from "../../lib/errorToast";

export default function UploadForm() {
  const { register, handleSubmit } = useForm();
  const btnColor = useColorModeValue("blue.300", "blue.700");
  const FileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>();
  const toast = useToast();

  const onSubmit = async (data: any) => {
    if (FileRef.current?.files?.length === 0 || !FileRef.current?.files) {
      toast(errorToast("파일을 추가해주세요"));
      return;
    }

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("file", FileRef.current.files[0]);

    try {
      await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
    } catch (e: any) {
      console.log(e.response);
    }
  };

  return (
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
  );
}