import { LucideIcon, ShoppingBag, ShoppingCart, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "./button";

interface EmptyStateAction {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary";
}

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "shopping-bag" | "shopping-cart" | "alert-circle" | LucideIcon;
  action?: EmptyStateAction;
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  icon = "alert-circle",
  action,
  className = "",
}: EmptyStateProps) => {
  // Map string icon names to components
  const getIconComponent = () => {
    if (typeof icon === "string") {
      switch (icon) {
        case "shopping-bag":
          return <ShoppingBag className="h-12 w-12 text-muted-foreground" />;
        case "shopping-cart":
          return <ShoppingCart className="h-12 w-12 text-muted-foreground" />;
        case "alert-circle":
        default:
          return <AlertCircle className="h-12 w-12 text-muted-foreground" />;
      }
    }
    
    // If icon is a component
    const IconComponent = icon;
    return <IconComponent className="h-12 w-12 text-muted-foreground" />;
  };

  return (
    <div
      className={`flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center ${className}`}
    >
      <div className="mx-auto flex max-w-md flex-col items-center">
        {getIconComponent()}
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        {action && (
          <Button
            variant={action.variant || "default"}
            size="sm"
            className="mt-6"
            asChild
          >
            <Link to={action.href}>{action.label}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}; 