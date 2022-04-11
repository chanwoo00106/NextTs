import axios from "axios";
import { ServerUrl } from "../config/config";

export const api = axios.create({
  baseURL: ServerUrl,
});
