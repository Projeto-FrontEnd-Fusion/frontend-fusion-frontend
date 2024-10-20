import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import { cn } from "@/utils";

interface FormDivProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  children: ReactNode;
}

export const FormDiv = forwardRef<HTMLDivElement, FormDivProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div className={cn("", className)} ref={ref} {...rest}>
      {children}
    </div>
  )
})

FormDiv.displayName = 'FormDiv';