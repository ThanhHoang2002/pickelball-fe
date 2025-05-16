import { memo } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CustomerRow from '@/features/customers/components/CustomerRow';
import { CUSTOMER_TABLE_COLUMNS } from '@/features/customers/constants';
import { Customer } from '@/features/customers/types/customer';

interface CustomerTableProps {
  customers: Customer[];
  loading: boolean;
  onViewCustomer: (customer: Customer) => void;
  onEditCustomer: (customer: Customer) => void;
  formatDate: (dateString: string | null) => string;
}

const CustomerTable = memo(({ 
  customers, 
  loading, 
  onViewCustomer,
  onEditCustomer, 
  formatDate 
}: CustomerTableProps) => {
  const renderTableContent = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="h-24 text-center">
            Loading customers...
          </TableCell>
        </TableRow>
      );
    }

    if (customers.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="h-24 text-center">
            No customers found.
          </TableCell>
        </TableRow>
      );
    }

    return customers.map((customer) => (
      <CustomerRow 
        key={customer.id}
        customer={customer}
        onViewCustomer={onViewCustomer}
        onEditCustomer={onEditCustomer}
        formatDate={formatDate}
      />
    ));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[250px]">{CUSTOMER_TABLE_COLUMNS[0].label}</TableHead>
            <TableHead className="min-w-[200px]">{CUSTOMER_TABLE_COLUMNS[1].label}</TableHead>
            <TableHead className="min-w-[100px]">{CUSTOMER_TABLE_COLUMNS[2].label}</TableHead>
            <TableHead className="min-w-[150px]">{CUSTOMER_TABLE_COLUMNS[3].label}</TableHead>
            <TableHead className="min-w-[80px] text-right">{CUSTOMER_TABLE_COLUMNS[4].label}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {renderTableContent()}
        </TableBody>
      </Table>
    </div>
  );
});

CustomerTable.displayName = 'CustomerTable';

export default CustomerTable; 