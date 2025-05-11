import { LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { paths } from '@/config/paths';
import useAuthStore from '@/features/auth/stores/authStore';

const UserMenu = () => {
  const { currentUser, logout } = useAuthStore();

  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full p-0 md:h-auto md:w-auto md:px-2">
            <div className="flex items-center">
              <span className="mr-2 hidden text-sm font-medium md:block">
                {currentUser?.name}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground">
                <User className="h-4 w-4" />
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="end">
          <div className="border-b border-border p-3">
            <div className="font-medium text-foreground">{currentUser?.name}</div>
            <div className="text-xs text-muted-foreground">{currentUser?.email}</div>
          </div>
          <div className="py-1">
            <Link
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
              to="/profile"
            >
              <User className="h-4 w-4" /> Thông tin cá nhân
            </Link>
            <Link
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
              to={paths.home}
              onClick={logout}
            >
              <LogOut className="h-4 w-4" /> Đăng xuất
            </Link>
          </div>
        </PopoverContent>
      </Popover>
  );
};

export default UserMenu; 