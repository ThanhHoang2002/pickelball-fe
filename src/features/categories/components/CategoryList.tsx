import { memo } from "react";

import { Category } from "../types";
import { CategoryCard } from "./CategoryCard";

import GlobalLoading from "@/components/loading/GlobalLoading";
import { EmptyState } from "@/components/ui/empty-state";

interface CategoryListProps {
  categories: Category[];
  isLoading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

export const CategoryList = memo(({ categories, isLoading, onEdit, onDelete }: CategoryListProps) => {
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <GlobalLoading />
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <EmptyState
        title="Không có danh mục nào"
        description="Chưa có danh mục nào được tạo. Hãy thêm danh mục mới."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
});

CategoryList.displayName = 'CategoryList'; 