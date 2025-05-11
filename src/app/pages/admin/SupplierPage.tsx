import { motion } from 'framer-motion';
import { Search, Eye, ChevronLeft, ChevronRight, Calendar, FileText, ArrowUpDown, Plus, Pencil, Trash2, MoreVertical } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ConfirmDeleteDialog from '@/features/suppliers/components/ConfirmDeleteDialog';
import SupplierDetail from '@/features/suppliers/components/SupplierDetail';
import SupplierDialog from '@/features/suppliers/components/SupplierDialog';
import { useSuppliers } from '@/features/suppliers/hooks/useSuppliers';
import { Supplier } from '@/types/supplier';

const SupplierPage = () => {
  const [isSupplierDetailOpen, setIsSupplierDetailOpen] = useState(false);
  const [isSupplierFormOpen, setIsSupplierFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  
  const {
    suppliers,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    goToPage,
    handleSort,
    filters,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    isCreating,
    isUpdating,
    isDeleting
  } = useSuppliers();
  
  // View supplier details
  const handleViewSupplier = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setIsSupplierDetailOpen(true);
  };
  
  // Open create form
  const handleAddNewClick = () => {
    setCurrentSupplier(null);
    setIsSupplierFormOpen(true);
  };
  
  // Open edit form
  const handleEditClick = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setIsSupplierFormOpen(true);
  };
  
  // Open delete confirmation
  const handleDeleteClick = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setIsDeleteDialogOpen(true);
  };
  
  // Handle form submission (create/update)
  const handleFormSubmit = (formData: FormData) => {
    if (currentSupplier) {
      // Update existing supplier
      updateSupplier({ id: currentSupplier.id, formData });
    } else {
      // Create new supplier
      createSupplier(formData);
    }
    setIsSupplierFormOpen(false);
  };
  
  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (currentSupplier) {
      deleteSupplier(currentSupplier.id);
      setIsDeleteDialogOpen(false);
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

  // Generate initials for supplier avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Toggle sort direction
  const toggleSort = (column: string) => {
    const direction = 
      filters.sortBy === column && filters.sortDirection === 'asc' 
        ? 'desc' 
        : 'asc';
    handleSort(column, direction);
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
            ({filters.sortDirection === 'asc' ? '↑' : '↓'})
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
        <h1 className="text-2xl font-bold">Supplier Management</h1>
        <Button onClick={handleAddNewClick} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Supplier
        </Button>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}
      
      {/* Data Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {renderSortableHeader("name", "Supplier")}
              {renderSortableHeader("description", "Description")}
              {renderSortableHeader("createdAt", "Created")}
              {renderSortableHeader("createdBy", "Created By")}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading suppliers...
                </TableCell>
              </TableRow>
            ) : suppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No suppliers found.
                </TableCell>
              </TableRow>
            ) : (
              suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted">
                        {supplier.image ? (
                          <img
                            src={supplier.image}
                            alt={supplier.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-medium">{getInitials(supplier.name)}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-xs text-muted-foreground">#{supplier.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1">
                      <FileText className="mt-0.5 h-3 w-3 flex-shrink-0 text-muted-foreground" />
                      <span className="max-w-[300px] truncate text-sm">
                        {supplier.description || "No description available."}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{formatDate(supplier.createdAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{supplier.createdBy}</span>
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
                        <DropdownMenuItem onClick={() => handleViewSupplier(supplier)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(supplier)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit supplier
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteClick(supplier)}
                          className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete supplier
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
      {totalItems > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} suppliers
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => goToPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
      
      {/* Supplier Detail Dialog */}
      {currentSupplier && (
        <SupplierDetail
          open={isSupplierDetailOpen}
          onClose={() => setIsSupplierDetailOpen(false)}
          supplier={currentSupplier}
        />
      )}
      
      {/* Supplier Form Dialog */}
      <SupplierDialog
        open={isSupplierFormOpen}
        onClose={() => setIsSupplierFormOpen(false)}
        onSubmit={handleFormSubmit}
        supplier={currentSupplier}
        isSubmitting={isCreating || isUpdating}
      />
      
      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        supplier={currentSupplier}
        isDeleting={isDeleting}
      />
    </motion.div>
  );
};

export default SupplierPage;