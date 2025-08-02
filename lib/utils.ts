import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const showToast = (type: "success" | "error", title: string, description?: string) => {
  if (type === "success") {
    toast.success(title, { description })
  } else {
    toast.error(title, { description })
  }
}