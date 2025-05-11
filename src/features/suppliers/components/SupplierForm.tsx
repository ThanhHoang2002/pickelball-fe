import { ImageIcon, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Supplier } from "@/types/supplier";

interface SupplierFormProps {
  supplier?: Supplier | null;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const SupplierForm = ({
  supplier,
  onSubmit,
  onCancel,
  isSubmitting
}: SupplierFormProps) => {
  const [name, setName] = useState(supplier?.name || "");
  const [description, setDescription] = useState(supplier?.description || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(supplier?.image || null);
  const [imageChanged, setImageChanged] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isEditing = !!supplier;
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageChanged(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData object to send data and image file
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    
    // Add image file if it exists or was changed
    if (imageFile && imageChanged) {
      formData.append("image", imageFile);
    }
    
    // Add flag to indicate if we're keeping the existing image in an update operation
    if (isEditing && !imageChanged) {
      formData.append("keepExistingImage", "true");
    }
    
    onSubmit(formData);
  };

  // Generate initials for supplier avatar preview when no image is available
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Name field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <div className="col-span-3">
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter supplier name"
            />
          </div>
        </div>
        
        {/* Description field */}
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="description" className="pt-2 text-right">
            Description
          </Label>
          <div className="col-span-3">
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter supplier description"
              rows={4}
            />
          </div>
        </div>
        
        {/* Image upload field */}
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="image" className="pt-2 text-right">
            Logo/Image
          </Label>
          <div className="col-span-3">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
              ref={fileInputRef}
              required={!isEditing}
            />
            
            {/* Image preview */}
            {imagePreview ? (
              <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-md border">
                <img 
                  src={imagePreview} 
                  alt="Supplier preview" 
                  className="h-full w-full object-cover"
                />
              </div>
            ) : name ? (
              <div className="relative mt-2 flex h-32 w-32 items-center justify-center overflow-hidden rounded-md border bg-muted">
                <span className="text-2xl font-semibold">{getInitials(name)}</span>
              </div>
            ) : (
              <div className="relative mt-2 flex h-32 w-32 items-center justify-center overflow-hidden rounded-md border bg-muted">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            
            {isEditing && !imageChanged && (
              <p className="mt-1 text-xs text-muted-foreground">
                Select a new image only if you want to change the current one.
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Form actions */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{isEditing ? "Update" : "Create"} Supplier</>
          )}
        </Button>
      </div>
    </form>
  );
}; 