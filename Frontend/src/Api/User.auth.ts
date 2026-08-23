import axios from "axios";
import { BASE_URL } from "./BASE_URL";

interface AuthData {
  email?: string;
  username:string;
  password: string;
}

export const loginUser = async (data: AuthData) => {
  const url = BASE_URL + "/api/auth/login";

  const response = await axios.post(url, data, {
    withCredentials: true,
  });

  return response.data;
};

export const registerUser = async (data: AuthData) => {
  const url = BASE_URL + "/api/auth/register";
  const response = await axios.post(url, data, {
    withCredentials: true,
  });

  return response.data;
};
