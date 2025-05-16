import { Search, Plus } from 'lucide-react';
import { ChangeEvent, memo } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CustomerSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onCreateCustomer: () => void;
}

const CustomerSearchBar = memo(({ 
  searchTerm, 
  setSearchTerm, 
  onCreateCustomer 
}: CustomerSearchBarProps) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="relative w-full md:w-1/3">
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