import { FieldErrors, UseFormRegister } from "react-hook-form";

import { RegisterFormValues } from "../schema/register.schema";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";

export interface RegisterFormProps {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const RegisterForm = ({
  register,
  errors,
  isSubmitting,
  onSubmit
} : RegisterFormProps) => {
  return (
    <form onSubmit={onSubmit} className="grid h-full grid-cols-1 gap-x-4 gap-y-5 py-4 md:grid-cols-2">
      <div>
        <FormField
          id="name"
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          error={errors.name}
          disabled={isSubmitting}
          registration={register("name")}
        />
      </div>      
      <div>
        <FormField
          id="email"
          label="Email"
          placeholder="example@gmail.com"
          error={errors.email}
          disabled={isSubmitting}
          registration={register("email")}
        />
      </div>
      
      <div>
        <FormField
          id="registerPassword"
          label="Mật khẩu"
          type="password"
          placeholder="••••••••"
          error={errors.password}
          disabled={isSubmitting}
          registration={register("password")}
        />
      </div>
      
      <div>
        <FormField
          id="confirmPassword"
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword}
          disabled={isSubmitting}
          registration={register("confirmPassword")}
        />
      </div>

      <div>
        <label htmlFor="gender" className="mb-1 block pt-1 text-sm font-medium text-gray-700">
          Giới tính
        </label>
        <select
          id="gender"
          className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          disabled={isSubmitting}
          {...register("gender")}
        >
          <option value="MALE">Nam</option>
          <option value="FEMALE">Nữ</option>
          <option value="OTHER">Khác</option>
        </select>
        {errors.gender && (
          <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <FormField
          id="address"
          label="Địa chỉ"
          placeholder="Hà Nội"
          error={errors.address}
          disabled={isSubmitting}
          registration={register("address")}
        />
      </div>
      
      <div className="flex items-center space-x-2 md:col-span-2">
        <input
          type="checkbox"
          id="terms"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          {...register("terms")}
          disabled={isSubmitting}
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          Tôi đồng ý với điều khoản và chính sách bảo mật
        </label>
      </div>
      
      {errors.terms && (
        <p className="text-xs text-red-500 md:col-span-2">{errors.terms.message}</p>
      )}
      
      <div className="mt-auto pt-2 md:col-span-2">
        <Button 
          type="submit" 
          className="h-12 w-full text-base font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
        </Button>
      </div>
    </form>
  );
}; 