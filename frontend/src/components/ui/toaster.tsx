
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  // Get the toast function from useToast hook (not toasts array)
  const toast = useToast()

  // Since we don't have access to toasts array anymore, we'll use sonner's toasts
  // This component will be replaced by the sonner Toaster
  return (
    <ToastProvider>
      {/* We'll use sonner for toasting instead */}
      <ToastViewport />
    </ToastProvider>
  )
}
