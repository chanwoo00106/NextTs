import { Input } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface SearchFormProps {
  func?: () => void;
}

const SearchForm: NextPage<SearchFormProps> = ({ func }) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = ({ search }: any) => {
    router.push(`file/${search}`);
    if (func) func();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("search")} placeholder="파일 검색" />
    </form>
  );
};

export default SearchForm;
