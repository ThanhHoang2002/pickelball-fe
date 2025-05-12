import { User } from '@/features/auth/types/auth.type';
import axiosClient from '@/lib/axios-client';
import { ApiResponse } from '@/types/apiResponse';

export interface UpdateProfileRequest {
  name: string;
  email: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  address: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const profileApi = {
  // Cập nhật thông tin người dùng
  updateProfile: async (data: UpdateProfileRequest, avatarFile?: File | null): Promise<User> => {
    const formData = new FormData();
    
    // Thêm thông tin người dùng vào formData
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('gender', data.gender);
    formData.append('address', data.address);
    
    // Thêm ảnh nếu có
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    
    const response = await axiosClient.put<ApiResponse<User>>('/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.data;
  },

  // Đổi mật khẩu
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await axiosClient.post<ApiResponse<null>>('/users/change-password', data);
  },

  // Upload avatar
  uploadAvatar: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axiosClient.post<ApiResponse<{url: string}>>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.data.url;
  }
}; 