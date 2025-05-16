import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Upload, X, Loader2, Eye, EyeOff } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROLES, ROLES_DISPLAY } from '@/constant/role';
import { CustomerDialogMode } from '@/features/customers/constants';
import { Customer } from '@/features/customers/types/customer';

// Role ID mapping
const ROLE_ID_MAP: Record<string, number> = {
  [ROLES.ADMIN]: 1,
  [ROLES.EMPLOYEE]: 3,
  [ROLES.USER]: 2
};

// Reverse mapping from ID to role name
const ROLE_NAME_MAP: Record<number, string> = {
  1: ROLES.ADMIN,
  3: ROLES.EMPLOYEE,
  2: ROLES.USER
};

// Function to convert role name from API (lowercase) to our ROLES constants (uppercase)
const normalizeRoleName = (roleName: string): string => {
  // Convert to uppercase
  const uppercaseName = roleName.toUpperCase();
  
  // Check if the uppercase name exists in ROLES
  if (Object.values(ROLES).includes(uppercaseName)) {
    return uppercaseName;
  }
  
  // Fallback mappings for specific roles if needed
  const roleMapping: Record<string, string> = {
    'admin': ROLES.ADMIN,
    'employee': ROLES.EMPLOYEE,
    'user': ROLES.USER
  };
  
  return roleMapping[roleName] || ROLES.USER; // Fallback to USER if unknown
};

// Default form values
const defaultFormValues = {
  name: '',
  email: '',
  gender: 'MALE' as const,
  roleId: 2, // Default to USER role
  address: '',
  avatar: null,
  password: '',
};

// Email validation regex for @hoangtusport.vn domain
const emailRegex = /@hoangtusport\.vn$/;

// Schema validation
const customerFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string()
    .email({ message: 'Invalid email address' })
    .refine(
      (email) => emailRegex.test(email),
      { message: 'Email must end with @hoangtusport.vn' }
    ),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  roleId: z.number(),
  address: z.string().optional(),
  // Avatar is optional and can be null
  avatar: z.any().optional().nullable(),
  // Password is optional for updates but required for create
  password: z.string().optional(),
});

// Create mode schema requires password
const createCustomerFormSchema = customerFormSchema.extend({
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

interface CustomerDialogProps {
  open: boolean;
  onClose: () => void;
  customer?: Customer | null;
  mode: CustomerDialogMode;
  onSave: (customer: CustomerFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

const CustomerDialog = ({
  open,
  onClose,
  customer,
  mode,
  onSave,
  isSubmitting = false,
}: CustomerDialogProps) => {
  // Reference to file input element
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for image preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // State for selected role name (for display purposes)
  const [selectedRoleName, setSelectedRoleName] = useState<string>(ROLES.USER);
  
  // State for form submission
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  // Choose schema based on mode
  const formSchema = mode === CustomerDialogMode.CREATE 
    ? createCustomerFormSchema 
    : customerFormSchema;
  
  // Form initialization
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  // Update form when customer data or mode changes
  useEffect(() => {
    if (customer && (mode === CustomerDialogMode.EDIT || mode === CustomerDialogMode.VIEW)) {
      form.reset({
        name: customer.name,
        email: customer.email,
        gender: customer.gender as "MALE" | "FEMALE" | "OTHER",
        roleId: customer.role.id,
        address: customer.address || '',
        avatar: null, // We don't set the avatar file here, just use it for preview
        password: '', // Reset password field when editing
      });
      
      // Set role name for display - normalize the role name from API
      const normalizedRoleName = normalizeRoleName(customer.role.name);
      setSelectedRoleName(normalizedRoleName);
      
      // Set image preview if customer has avatar
      if (customer.avatar) {
        setImagePreview(customer.avatar);
      } else {
        setImagePreview(null);
      }
    } else if (mode === CustomerDialogMode.CREATE) {
      form.reset(defaultFormValues);
      setSelectedRoleName(ROLES.USER);
      setImagePreview(null);
    }
  }, [customer, form, mode]);

  // Reset loading state when isSubmitting prop changes
  useEffect(() => {
    setIsLoading(isSubmitting);
  }, [isSubmitting]);

  // Set initial role name when component mounts
  useEffect(() => {
    // Set the initial role name based on the default roleId
    const initialRoleId = defaultFormValues.roleId;
    const initialRoleName = ROLE_NAME_MAP[initialRoleId];
    setSelectedRoleName(initialRoleName);
  }, []);

  // Reset form when dialog is closed
  useEffect(() => {
    if (!open) {
      // Small delay to allow the dialog animation to complete
      const timeoutId = setTimeout(() => {
        form.reset(defaultFormValues);
        setSelectedRoleName(ROLES.USER);
        setImagePreview(null);
        setShowPassword(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 300);
      
      return () => clearTimeout(timeoutId);
    }
  }, [open, form]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Update form value
      form.setValue('avatar', file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove the selected avatar image
  const handleRemoveImage = () => {
    form.setValue('avatar', null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Trigger file input click
  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle closing dialog
  const handleDialogClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  // Form submission
  const onSubmit = async (values: CustomerFormValues) => {
    try {
      setIsLoading(true);
      await onSave(values);
    } finally {
      // If component is still mounted and not controlled by parent
      if (!isSubmitting) {
        setIsLoading(false);
      }
    }
  };

  // Dialog title based on mode
  const getDialogTitle = () => {
    switch (mode) {
      case CustomerDialogMode.CREATE:
        return 'Add New Customer';
      case CustomerDialogMode.EDIT:
        return 'Edit Customer';
      case CustomerDialogMode.VIEW:
        return 'Customer Details';
      default:
        return 'Customer';
    }
  };

  // Is form in read-only mode
  const isReadOnly = mode === CustomerDialogMode.VIEW;

  // Get avatar display image (preview or default)
  const getAvatarDisplay = () => {
    if (imagePreview) {
      return imagePreview;
    }
    
    // Fallback to default avatar with name as seed
    const name = form.watch('name') || 'User';
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
  };

  // Handle role selection
  const handleRoleChange = (roleName: string) => {
    setSelectedRoleName(roleName);
    // Lấy roleId tương ứng với roleName được chọn
    const roleId = ROLE_ID_MAP[roleName];
    form.setValue('roleId', roleId);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            {mode === CustomerDialogMode.VIEW
              ? 'View customer information.'
              : 'Fill in the information to create or update a customer.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Avatar upload section */}
            <div className="mb-6 flex flex-col items-center">
              <div className="relative">
                <div className="mb-2 h-24 w-24 overflow-hidden rounded-full border-2 border-border">
                  <img
                    src={getAvatarDisplay()}
                    alt="User avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                {!isReadOnly && (
                  <div className="absolute bottom-0 right-0 flex gap-1">
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={handleSelectImage}
                      aria-label="Upload avatar"
                      disabled={isLoading}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    {imagePreview && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={handleRemoveImage}
                        aria-label="Remove avatar"
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
              
              {form.watch('avatar') && (
                <Badge variant="outline" className="mt-2 gap-1">
                  <Upload className="h-3 w-3" />
                  {(form.watch('avatar') as File).name}
                </Badge>
              )}
              
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isReadOnly || isLoading}
              />
            </div>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter name" 
                      {...field} 
                      disabled={isReadOnly || isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="username@hoangtusport.vn" 
                      {...field} 
                      disabled={isReadOnly || isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                  {!isReadOnly && (
                    <p className="text-xs text-muted-foreground">
                      Email must end with @hoangtusport.vn
                    </p>
                  )}
                </FormItem>
              )}
            />
            
            {/* Password field - only show in CREATE mode or optional in EDIT mode */}
            {mode !== CustomerDialogMode.VIEW && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password
                      {mode === CustomerDialogMode.EDIT && <span className="ml-1 text-xs text-muted-foreground">(optional)</span>}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"}
                          placeholder={mode === CustomerDialogMode.CREATE ? "Enter password" : "Enter to change password"} 
                          {...field} 
                          disabled={isReadOnly || isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={togglePasswordVisibility}
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select 
                      disabled={isReadOnly || isLoading}
                      onValueChange={field.onChange} 
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="roleId"
                render={() => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select 
                      disabled={isReadOnly || isLoading}
                      onValueChange={handleRoleChange}
                      value={selectedRoleName}
                      defaultValue={selectedRoleName}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ROLES.ADMIN}>{ROLES_DISPLAY[ROLES.ADMIN]}</SelectItem>
                        <SelectItem value={ROLES.EMPLOYEE}>{ROLES_DISPLAY[ROLES.EMPLOYEE]}</SelectItem>
                        <SelectItem value={ROLES.USER}>{ROLES_DISPLAY[ROLES.USER]}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter address" 
                      {...field} 
                      disabled={isReadOnly || isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              {!isReadOnly && (
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="min-w-[100px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {mode === CustomerDialogMode.CREATE ? 'Creating...' : 'Updating...'}
                    </>
                  ) : (
                    mode === CustomerDialogMode.CREATE ? 'Create' : 'Update'
                  )}
                </Button>
              )}
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isLoading}
              >
                {isReadOnly ? 'Close' : 'Cancel'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDialog; 