import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import useAuthStore from '@/stores/authStore';

interface AdminGuardProps {
    children?: ReactNode
}
const AdminGuard = ({ children }: AdminGuardProps) => {
    const { currentUser } = useAuthStore(); 
    if (currentUser?.role?.name !== "ADMIN") {
        return <Navigate to="/" />;
    }
    return children || <Outlet />;
}

export default AdminGuard