import axios from "axios";

import { RegisterFormValues } from "../schema/register.schema";
import { User } from "../types/auth.type";

import { ApiResponse } from "@/types/apiResponse";

const API_URL = import.meta.env.VITE_BASE_URL;
export const register = async (data: RegisterFormValues)=> {
  const response = await axios.post<ApiResponse<User>>(`${API_URL}/auth/register`, data);
  return response.data;
};
