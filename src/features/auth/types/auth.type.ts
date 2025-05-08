export type AuthMode = "login" | "register";

export interface Role {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface CurrentUserResponse {
  user: User
} 

export interface User {
  id: number;
  name: string;
  email: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  address: string;
  avatar: string | null;
  role: Role;
}

export interface LoginResponseData {
  user: User;
  access_token: string;
}
