import axios from 'axios';

import {toast} from "@/hooks/use-toast"

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});
// Middleware for response
axiosPublic.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi, vui lòng thử lại",
        variant: "destructive",
      });
    throw error;
  },
);

export default axiosPublic;
