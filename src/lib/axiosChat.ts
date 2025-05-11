import axios from 'axios';

import {toast} from "@/hooks/use-toast"

const axiosChat = axios.create({
  baseURL: import.meta.env.VITE_CHAT_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

// Middleware đơn giản để xử lý lỗi
axiosChat.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi chung
    toast({
      title: "Lỗi",
      description: "Đã xảy ra lỗi, vui lòng thử lại",
      variant: "destructive",
    });
    
    return Promise.reject(error);
  },
);

export default axiosChat;
