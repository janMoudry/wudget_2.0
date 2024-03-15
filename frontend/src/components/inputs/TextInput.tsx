import { InputHTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface TextInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  registerProps?: RegisterOptions<T, Path<T>>;
  isDisabled?: boolean;
  error?: FieldValues["errors"];
  type: "text" | "email" | "password";
}

const TextInput = <T extends FieldValues>({
  label,
  register,
  registerName,
  registerProps,
  isDisabled,
  error,
  className,
  ...rest
}: TextInputProps<T>) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <label htmlFor={registerName} className="text-md">
        {label}:
      </label>
      <input
        {...rest}
        id={registerName}
        className={`form-input h-10 px-4 border-1 border-gray-300 rounded-md`}
        {...register(registerName, registerProps)}
        disabled={isDisabled}
        type={rest.type}
      />
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
};
export default TextInput;
