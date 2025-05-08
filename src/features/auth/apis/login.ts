import axios from "axios";

import { LoginFormValues } from "../schema/login.schema";
import { LoginResponseData } from "../types/auth.type";

import { ApiResponse } from "@/types/apiResponse";


const API_URL = import.meta.env.VITE_BASE_URL;

export const login = async (data: LoginFormValues): Promise<LoginResponseData> => {
  const response = await axios.post<ApiResponse<LoginResponseData>>(`${API_URL}/auth/login`, data);
  return response.data.data;
};
