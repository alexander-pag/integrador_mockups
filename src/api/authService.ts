import axios from "axios";
import { LoginData } from "../types/auth";

export const authLogin = async (loginData: LoginData) => {
  const response = await axios.post("/login", loginData);
  return response.data;
};

export const authRegister = async (registerData: any) => {
  const response = await axios.post("/register", registerData);
  return response.data;
};
