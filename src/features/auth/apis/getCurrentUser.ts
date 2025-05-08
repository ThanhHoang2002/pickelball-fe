import { CurrentUserResponse } from "../types/auth.type";

import axiosClient from "@/lib/axios-client";
import { ApiResponse } from "@/types/apiResponse";

export const getCurrentUser = async () => {
    const response = await axiosClient.get<ApiResponse<CurrentUserResponse>>('auth/account');
    return response.data.data.user;
}