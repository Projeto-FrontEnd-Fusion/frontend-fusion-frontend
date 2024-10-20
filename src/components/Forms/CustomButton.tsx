import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

import { FiLoader } from "react-icons/fi";
import { cn } from "@/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  loading?: boolean;
  children: ReactNode;
}

export const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, loading, children, ...rest }, ref) => {

    return (
      <button
        className={cn("p-2 text-black font-semibold rounded-md border", className)}
        {...rest}
        ref={ref}
      >
        {loading
          ? <FiLoader className="w-4 h-4 animate-spin" />
          : children
        }
      </button>
    )
  }
);

CustomButton.displayName = 'CustomButton';