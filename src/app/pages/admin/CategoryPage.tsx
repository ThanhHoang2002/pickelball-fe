import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, FileText, MoreVertical, ArrowUpDown, Plus, Pencil, Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CategoryDialog } from '@/features/categories/components/CategoryDialog';
import { CategoryToolbar } from '@/features/categories/components/CategoryToolbar';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { useDeleteCategory } from '@/features/categories/hooks/useDeleteCategory';
import { Category } from '@/features/categories/types';

const CategoryPage = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Use the category hooks
  const {
    categories,
    meta,
    isLoading,
    filters,
    handleSearch,
    handlePageChange,
    handleSortChange,
  } = useCategories();

  const { deleteCategory, isDeleting } = useDeleteCategory({
    onSuccess: () => {
      setIsDeleteDialogOpen(false);
    }
  });

  // Handle edit button click
  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsFormDialogOpen(true);
  };

  // Handle delete button click
  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  // Handle add new button click
  const handleAddNewClick = () => {
    setSelectedCategory(null);
    setIsFormDialogOpen(true);
  };

  // Handle delete confirmation
  const handleConfirmDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory.id);
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  // Toggle sort direction
  const toggleSort = (column: string) => {
    const direction = 
      filters.sortBy === column && filters.sortOrder === 'asc' 
        ? 'desc' 
        : 'asc';
    handleSortChange(column, direction);
  };

  // Render sortable header
  const renderSortableHeader = (column: string, label: string) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => toggleSort(column)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown size={14} className="ml-1" />
        {filters.sortBy === column && (
          <span className="ml-1 text-xs">
            ({filters.sortOrder === 'asc' ? '↑' : '↓'})
          </span>
        )}
      </div>
    </TableHead>
  );

  return (
    <motion.div 
      className="container mx-auto py-8" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Button onClick={handleAddNewClick} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>
      
      {/* Search and add toolbar */}
      <CategoryToolbar 
        onSearch={handleSearch}
        onAddNew={handleAddNewClick}
      />
      
      {/* Data Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {renderSortableHeader("name", "Category")}
              {renderSortableHeader("description", "Description")}
              {renderSortableHeader("createdAt", "Created")}
              {renderSortableHeader("createdBy", "Created By")}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading categories...
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category: Category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted">
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-medium">
                            {category.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-xs text-muted-foreground">#{category.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1">
                      <FileText className="mt-0.5 h-3 w-3 flex-shrink-0 text-muted-foreground" />
                      <span className="max-w-[300px] truncate text-sm">
                        {category.description || "No description available."}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{formatDate(category.createdAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{category.createdBy}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(category)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit category
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteClick(category)}
                          className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete category
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {meta && meta.total > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {(meta.page - 1) * meta.pageSize + 1}-{Math.min(meta.page * meta.pageSize, meta.total)} of {meta.total} categories
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(meta.page - 1)}
              disabled={meta.page === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            {Array.from({ length: Math.min(meta.pages, 5) }, (_, i) => {
              let pageNumber;
              if (meta.pages <= 5) {
                pageNumber = i + 1;
              } else if (meta.page <= 3) {
                pageNumber = i + 1;
              } else if (meta.page >= meta.pages - 2) {
                pageNumber = meta.pages - 4 + i;
              } else {
                pageNumber = meta.page - 2 + i;
              }

              return (
                <Button
                  key={pageNumber}
                  variant={meta.page === pageNumber ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(meta.page + 1)}
              disabled={meta.page === meta.pages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
      
      {/* Category form dialog */}
      <CategoryDialog
        isOpen={isFormDialogOpen}
        category={selectedCategory}
        onOpenChange={setIsFormDialogOpen}
        onSuccess={() => setIsFormDialogOpen(false)}
      />
      
      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Delete Category
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedCategory && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 rounded-md border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{selectedCategory.name}</p>
                  <p className="text-sm text-muted-foreground">ID: {selectedCategory.id}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Category"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CategoryPage;