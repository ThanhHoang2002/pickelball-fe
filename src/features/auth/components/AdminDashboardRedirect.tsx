import { Navigate } from 'react-router-dom';

import { ROLES } from '@/constant/role';
import useAuthStore from '@/features/auth/stores/authStore';

/**
 * Component kiểm tra role của người dùng và redirect đến trang phù hợp trong admin area
 * - Admin: Chuyển đến dashboard
 * - Employee: Chuyển đến products
 */
const AdminDashboardRedirect = () => {
  const { currentUser } = useAuthStore();
  
  // Kiểm tra role của người dùng
  const isAdmin = currentUser?.role?.name?.toUpperCase() === ROLES.ADMIN;
  
  // Redirect dựa trên role
  if (isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }
  
  // Nếu là employee hoặc các role khác, chuyển đến trang products
  return <Navigate to="/admin/products" />;
};

export default AdminDashboardRedirect; 