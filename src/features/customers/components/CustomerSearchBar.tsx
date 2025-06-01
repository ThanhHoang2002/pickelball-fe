import { Search, Plus } from 'lucide-react';
import { ChangeEvent, memo } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROLES, ROLES_DISPLAY } from '@/constant/role';

interface CustomerSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onCreateCustomer: () => void;
  selectedRole: string | null;
  setSelectedRole: (role: string | null) => void;
}

const CustomerSearchBar = memo(({ 
  searchTerm, 
  setSearchTerm, 
  onCreateCustomer,
  selectedRole,
  setSelectedRole
}: CustomerSearchBarProps) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value === 'ALL' ? null : value);
  };

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full flex-col gap-3 sm:w-2/3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-9"
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search customers"
            tabIndex={0}
          />
        </div>
        
        <Select
          value={selectedRole || 'ALL'}
          onValueChange={handleRoleChange}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Roles</SelectItem>
            <SelectItem value={ROLES.ADMIN}>{ROLES_DISPLAY[ROLES.ADMIN]}</SelectItem>
            <SelectItem value={ROLES.EMPLOYEE}>{ROLES_DISPLAY[ROLES.EMPLOYEE]}</SelectItem>
            <SelectItem value={ROLES.USER}>{ROLES_DISPLAY[ROLES.USER]}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button 
        onClick={onCreateCustomer} 
        className="gap-2"
        aria-label="Add new customer"
        tabIndex={0}
      >
        <Plus className="h-4 w-4" />
        <span>Add New Customer</span>
      </Button>
    </div>
  );
});

CustomerSearchBar.displayName = 'CustomerSearchBar';

export default CustomerSearchBar; 