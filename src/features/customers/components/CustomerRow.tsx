import { Calendar, Mail, User, MoreVertical, Eye, Edit } from 'lucide-react';
import { memo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { ROLES } from '@/constant/role';
import { Customer } from '@/features/customers/types/customer';

interface CustomerRowProps {
  customer: Customer;
  onViewCustomer: (customer: Customer) => void;
  onEditCustomer: (customer: Customer) => void;
  formatDate: (dateString: string | null) => string;
}

const CustomerRow = memo(({ 
  customer, 
  onViewCustomer, 
  onEditCustomer, 
  formatDate 
}: CustomerRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <img
              src={customer.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(customer.name)}`}
              alt={customer.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{customer.name}</p>
            <p className="text-xs text-muted-foreground">#{customer.id}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span className="max-w-[200px] truncate text-sm" title={customer.email}>
              {customer.email}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm capitalize">{customer.gender.toLowerCase()}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge 
          variant={customer.role.name.toLowerCase() === ROLES.ADMIN.toLowerCase() ? 'destructive' : 
                 customer.role.name.toLowerCase() === ROLES.EMPLOYEE.toLowerCase() ? 'default' : 'outline'} 
          className="capitalize"
        >
          {customer.role.name}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{formatDate(customer.createdAt)}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              aria-label="Open actions menu"
              tabIndex={0}
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewCustomer(customer)}>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEditCustomer(customer)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
});

CustomerRow.displayName = 'CustomerRow';

export default CustomerRow; 