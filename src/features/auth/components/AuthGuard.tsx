import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";



import GlobalLoading from "@/components/loading/GlobalLoading";
import { getCurrentUser } from "@/features/auth/apis/getCurrentUser";
import { useAuthFormStore } from "@/stores/authFormStore";
import useAuthStore from "@/stores/authStore";

interface AuthGuardProps {
    children?: ReactNode
} 

export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const {setCurrentUser} = useAuthStore()
  const {setIsOpen} = useAuthFormStore()
  const { data, error } = useQuery({
    queryKey: ["info"],
    queryFn: () => getCurrentUser(),
    enabled: !!token,
  });
  useEffect(() => {
    if (!token || error) {
      setIsOpen(true)
      navigate("/");
    }
  }, [token, error, navigate]);

  // set to store
  useEffect(() => {
    if (data) {
      setCurrentUser(data);
    }
  }, [data, setCurrentUser]);

  if (data) {
    return children || <Outlet />;
  }

  return <GlobalLoading />;
}
