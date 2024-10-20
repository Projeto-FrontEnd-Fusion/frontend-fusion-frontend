import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FormEventHandler, forwardRef, ReactNode } from "react";

interface FormContainerProps extends ComponentPropsWithoutRef<"form"> {
  className?: string;
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const FormContainer = forwardRef<HTMLFormElement, FormContainerProps>(
  ({ className, children, onSubmit, ...rest }, ref) => {
    return (
      <form className={cn("flex flex-col gap-4", className)} onSubmit={onSubmit} ref={ref} {...rest}>
        {children}
      </form>
    )
  }
)

FormContainer.displayName = 'FormContainer';