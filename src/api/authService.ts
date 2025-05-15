import api from "./config";
import { LoginData } from "../interfaces/auth";

export const authLogin = async (loginData: LoginData) => {
  return await api.post("/auth/login", loginData);
};

export const authRegister = async (registerData: any) => {
  return await api.post("/register", registerData);
};
