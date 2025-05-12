import { 
  User, 
  UserCircle, 
  ChevronDown,
  LogOut,
  ShoppingBag
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "@/components/ui/image";
import { useAuthFormStore } from "@/features/auth/stores/authFormStore";
import useAuthStore from "@/features/auth/stores/authStore";

interface SubMenu {
  label: string;
  icon: React.ReactNode;
  to: string;
}

const subMenus: SubMenu[] = [
  { label: "Personal Information", icon: <UserCircle />, to: "/profile" },
  { label: "My Orders", icon: <ShoppingBag />, to:"/my-orders"}
];

const UserInfo = () => {
  const { currentUser, logout  } = useAuthStore();
  const { setIsOpen } = useAuthFormStore();
  const handleLogout = () => {
    logout()
    setIsOpen(false);
  };

  if (!currentUser) {
    return (    
        <User onClick={() => setIsOpen(true)} className="hidden h-10 w-10 cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-200 md:block lg:block" /> 
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hidden cursor-pointer items-center gap-1 rounded-full p-1 outline-none hover:bg-gray-100 lg:flex">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            {currentUser?.avatar ? (
              <Image src={currentUser.avatar} alt="Avatar" containerClassName="h-full w-full"  className="h-full w-full object-cover"/>
            ) : (
              <User className="h-5 w-5 text-gray-500" />
            )}
          </div>
          <span className="hidden text-sm font-medium text-gray-700 md:block">
            {currentUser?.name}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {
          subMenus.map((menu) => (
            <DropdownMenuItem asChild key={menu.to} className="cursor-pointer">
              <Link to={menu.to} className="flex w-full cursor-pointer">
                {menu.icon}
                <span>{menu.label}</span>
              </Link>
            </DropdownMenuItem>
          ))
        }
        <DropdownMenuItem asChild className="cursor-pointer">
          <button onClick={handleLogout} className="flex w-full cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserInfo;