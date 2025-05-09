import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FieldErrors } from "react-hook-form";

import { LoginFormValues } from "../schema/login.schema";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";


export interface LoginFormProps {
  register: UseFormRegister<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
} 

export const LoginForm = ({ 
  register, 
  errors, 
  isSubmitting, 
  onSubmit 
}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col justify-between space-y-5 py-4">
      <div className="space-y-5">
        <FormField
          id="email"
          label="Email"
          placeholder="example@gmail.com"
          error={errors.username}
          disabled={isSubmitting}
          registration={register("username")}
        />
        
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password}
          disabled={isSubmitting}
          registration={register("password")}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              disabled={isSubmitting}
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-sm text-primary hover:text-primary/80"
            disabled={isSubmitting}
          >
            Forgot password?
          </Button>
        </div>
      </div>
      
      <div className="mt-auto">
        <Button 
          type="submit" 
          className="h-12 w-full text-base font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Login"}
        </Button>
      </div>
    </form>
  );
}; 