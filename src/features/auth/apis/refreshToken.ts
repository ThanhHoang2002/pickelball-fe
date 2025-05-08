import { LoginResponseData } from "../types/auth.type";

import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";
export const refreshToken = async () => {
    const response = await axiosClient.get<ApiResponse<LoginResponseData>>('auth/refresh');
    return response.data.data.access_token;
}