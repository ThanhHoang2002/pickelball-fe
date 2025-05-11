import { useCallback, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { login } from "../apis/login";
import { register } from "../apis/register";
import { useLoginForm } from "../hooks/useLoginForm";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { LoginFormValues } from "../schema/login.schema";
import { RegisterFormValues } from "../schema/register.schema";
import { AuthMode } from "../types/auth.type";

import { loginBackground, registerBackground } from "@/assets/images";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ROLES } from "@/constant/role";
import { useAuthFormStore } from "@/features/auth/stores/authFormStore";
import useAuthStore from "@/features/auth/stores/authStore";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/utils/cn";
export interface AuthDialogProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: AuthMode;
    onModeChange?: (mode: AuthMode) => void;
  }

const ANIMATION_DURATION = 250 as const;
const EXIT_ANIMATION_DURATION = 200 as const;

export const AuthDialog = ({ 
  isOpen, 
  onClose, 
  initialMode = "login",
  onModeChange
}: AuthDialogProps) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const {toast} = useToast();
  const {setIsOpen} = useAuthFormStore()
  const {setCurrentUser} = useAuthStore()
  const navigate = useNavigate();
  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsExiting(false);
    } else {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, EXIT_ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Form hooks
  const { 
    register: registerLogin, 
    handleSubmit: handleLoginSubmit, 
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    reset: resetLoginForm
  } = useLoginForm();


  const { 
    register: registerSignup, 
    handleSubmit: handleRegisterSubmit, 
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
    reset: resetRegisterForm
    } = useRegisterForm()

  // Sync mode with props
  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode]);

  // Reset forms
  const resetForms = useCallback(() => {
    resetLoginForm();
    resetRegisterForm();
  }, [resetLoginForm, resetRegisterForm]);

  useEffect(() => {
    if (!isOpen) {
      resetForms();
    }
  }, [isOpen, resetForms]);

  // Form handlers
  const onLoginSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await login(data);
      localStorage.setItem('accessToken', response.access_token);
      setIsOpen(false)
      setCurrentUser(response.user)
      if(response.user.role.name.toLowerCase() === ROLES.ADMIN.toLocaleLowerCase()){
        navigate('/admin')
      }else{
        navigate('/');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Email or password is incorrect",
        variant: "destructive",
      });
    }
  };

  const onRegisterSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
        const response = await register(data)
       if( !response.error){ setMode("login")
        toast({
          title: "Đăng ký thành công",
          description: "Đăng nhập để tiếp tục",
        });}
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "Email already exists",
        variant: "destructive",
      });
    }
  };

  // Animation handling
  const toggleMode = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      const newMode = mode === "login" ? "register" : "login";
      setMode(newMode);
      onModeChange?.(newMode);
      setTimeout(() => {
        setIsAnimating(false);
      }, ANIMATION_DURATION);
    }, ANIMATION_DURATION);
  };

  // Handle smooth close animation
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, EXIT_ANIMATION_DURATION);
  };

  const isSubmitting = isLoginSubmitting || isRegisterSubmitting;
  const isDisabled = isSubmitting || isAnimating;

  if (!shouldRender) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && handleClose()}>
      <DialogContent 
        className={cn(
          "flex h-auto max-h-[90vh] min-h-[580px] max-w-6xl flex-row overflow-hidden p-0 transition-all duration-500 ease-in-out sm:rounded-2xl",
          isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <div className="flex w-full">
          {/* Image Section */}
          <div className={cn(
            "z-20 hidden w-[50%] transition-transform duration-500 md:block",
            mode === "register" && "translate-x-full"
          )}>          
            <div 
              className="relative h-full w-full overflow-hidden bg-cover bg-center" 
              style={{ backgroundImage: `url(${mode === "login" ? loginBackground : registerBackground})` }}
            >
              <div className="absolute inset-0 bg-primary/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <h2 className="mb-4 text-3xl font-bold text-white">HoangTu Sport</h2>
                <p className="text-md mb-6 max-w-md leading-relaxed text-white">
                  {mode === "login"
                    ? "Login to experience our services and receive attractive offers."
                    : "Register an account to experience our services and receive attractive offers."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className={cn(
            "w-full p-8 transition-transform duration-500 md:w-[50%]",
            mode === "register" && "-translate-x-full"
          )}>
            <DialogHeader className="mb-6">
              <DialogTitle className="text-center text-2xl font-bold">
                {mode === "login" ? "Login" : "Register"}
              </DialogTitle>
              <DialogDescription className="text-center">
                {mode === "login"
                  ? "Login to your account to continue."
                  : "Create a new account to experience our services."}
              </DialogDescription>
            </DialogHeader>

            <div className="h-[380px] overflow-y-auto px-1">
              {mode === "login" ? (
                <LoginForm 
                  register={registerLogin}
                  errors={loginErrors}
                  isSubmitting={isLoginSubmitting}
                  onSubmit={handleLoginSubmit(onLoginSubmit)}
                />
              ) : (
                <RegisterForm
                  register={registerSignup}
                  errors={registerErrors}
                  isSubmitting={isRegisterSubmitting}
                  onSubmit={handleRegisterSubmit(onRegisterSubmit)}
                />
              )}
            </div>

            <div className="flex items-center justify-center space-x-2 border-t pt-6">
              <p className="text-sm text-gray-500">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                type="button"
                variant="link"
                onClick={toggleMode}
                className="h-10 p-0 text-sm"
                disabled={isDisabled}
              >
                {mode === "login" ? "Register now" : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 