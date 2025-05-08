import { z } from "zod";

export const loginSchema = z.object({
    username: z.string()
      .min(1, { message: "Email là bắt buộc" })
      .email({ message: "Email không hợp lệ" }),
    password: z.string()
      .min(1, { message: "Mật khẩu là bắt buộc" }),
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
