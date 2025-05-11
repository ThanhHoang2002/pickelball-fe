import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useDebounceSearch } from "@/hooks/useDebounce";

interface CategoryToolbarProps {
  onSearch: (search: string) => void;
  onAddNew: () => void;
}

export const CategoryToolbar = ({ onSearch }: CategoryToolbarProps) => {
  // Sử dụng hook useDebounceSearch để tự động search khi người dùng gõ
  const { searchTerm, setSearchTerm } = useDebounceSearch(onSearch, {
    delay: 500, // Độ trễ 500ms
  });

  return (
    <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-full pr-8"
          />
          <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}; 