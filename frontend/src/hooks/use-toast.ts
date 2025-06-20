
import { toast as sonnerToast } from "sonner";

export type ToastProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
};

export const toast = ({ 
  title, 
  description, 
  action,
  variant = "default" 
}: ToastProps) => {
  const options: Record<string, any> = {};
  
  if (action) {
    options.action = action;
  }

  if (variant === "destructive") {
    return sonnerToast.error(title, {
      description,
      ...options
    });
  } 
  
  if (variant === "success") {
    return sonnerToast.success(title, {
      description,
      ...options
    });
  }

  return sonnerToast(title, {
    description,
    ...options
  });
};

export const useToast = () => {
  return toast; // Return the toast function directly
};
