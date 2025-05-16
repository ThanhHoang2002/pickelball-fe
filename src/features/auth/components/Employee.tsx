import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import useAuthStore from '@/features/auth/stores/authStore';

interface EmployeeGuardProps {
    children?: ReactNode
}
const EmployeeGuard = ({ children }: EmployeeGuardProps) => {
    const { currentUser } = useAuthStore(); 
    if (currentUser?.role?.name.toLocaleLowerCase() !== "employee" && currentUser?.role?.name.toLocaleLowerCase() !== "admin") {
        return <Navigate to="/" />;
    }
    return children || <Outlet />;
}

export default EmployeeGuard