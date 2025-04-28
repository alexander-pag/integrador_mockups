import axios from "axios";
import { LoginData } from "../types/auth";

export const authLogin = async (loginData: LoginData) => {
  const response = await axios.post("/login", loginData);
  return response.data;
};
