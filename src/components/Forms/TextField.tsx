import { cn } from "@/utils";
import { ComponentPropsWithoutRef, ElementRef, forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes, TextareaHTMLAttributes, Ref, DetailedHTMLProps } from "react";

interface TextFieldProps extends ComponentPropsWithoutRef<"input"> {
  value: string;
  name: string,
  label: string,
  type: HTMLInputTypeAttribute | 'textarea',
  divClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  helperText?: string;
  error?: boolean;
}

export const TextField = forwardRef<ElementRef<"input" | "textarea" | any>, TextFieldProps>(
  ({
    value = "",
    name,
    label,
    type,
    divClassName,
    inputClassName,
    labelClassName,
    error,
    helperText,
    ...rest
  }, ref) => {

    const values:
      DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
      | DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
      = {
      name: name,
      value: value,
      type: type == 'password' ? 'password' : undefined,
      className:
        cn(
          "p-2 block rounded-md outline-none border-2 border-black focus:border-blue-500 focus:ring-blue-500 text-black",
          error
            ? 'border-red-500 ring-red-500'
            : 'border-green-500 ring-green-500',
          inputClassName
        ),
      ...rest
    }

    return (
      <div className={cn("flex flex-col gap-2", divClassName)}>
        <label
          htmlFor={name}
          className={cn("text-sm text-black/50 font-semibold", labelClassName)}
        >
          {label}
        </label>
        {type === 'textarea' && (
          <textarea ref={ref as Ref<HTMLTextAreaElement>} {...values as TextareaHTMLAttributes<HTMLTextAreaElement>} />
        )
        }
        {(
          <input ref={ref as Ref<HTMLInputElement>} type={type} {...values as InputHTMLAttributes<HTMLInputElement>} />
        )}
        {helperText && (
          <div className="relative">
            <p className="absolute text-sm -mt-1">{helperText}</p>
          </div>
        )}
      </div>
    )
  }
)

TextField.displayName = 'TextField';