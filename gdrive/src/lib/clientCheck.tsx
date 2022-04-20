import { api } from "./api";
import { AxiosResponse } from "axios";

type FetchType = () => Promise<AxiosResponse>;

export const clientCheck = async (fetch: FetchType) => {
  try {
    const { data } = await fetch();
    return data;
  } catch (e: any) {
    if (e.isAxiosError || e.response.data.status === 401) {
      await api.post("/auth/refresh", {}, { withCredentials: true });
      const { data } = await fetch();
      return data;
    } else {
      throw new Error();
    }
  }
};
