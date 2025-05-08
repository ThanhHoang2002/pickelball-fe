import { z } from "zod";

export const registerSchema = z.object({
    name: z.string()
      .min(1, { message: "Họ và tên là bắt buộc" }),
    email: z.string()
      .min(1, { message: "Email là bắt buộc" })
      .email({ message: "Email không hợp lệ" }),
    password: z.string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
    confirmPassword: z.string()
      .min(1, { message: "Xác nhận mật khẩu là bắt buộc" }),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
      errorMap: () => ({ message: "Giới tính không hợp lệ" })
    }),
    address: z.string()
      .min(1, { message: "Địa chỉ là bắt buộc" }),
    terms: z.boolean()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"]
  }).refine((data) => data.terms === true, {
    message: "Bạn phải đồng ý với điều khoản và chính sách bảo mật",
    path: ["terms"]
  });
  
export type RegisterFormValues = z.infer<typeof registerSchema>;
