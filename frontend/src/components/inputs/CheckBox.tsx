import { InputHTMLAttributes } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface CheckboxProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegister<T>;
  registerName: Path<T>;
  registerProps?: FieldValues;
  isDisabled?: boolean;
  error?: FieldValues["errors"];
}

const Checkbox = <T extends FieldValues>({
  label,
  register,
  registerName,
  registerProps,
  isDisabled,
  error,
  className,
  ...rest
}: CheckboxProps<T>) => {
  return (
    <div className={`flex items-center gap-2 w-full ${className}`}>
      <input
        {...rest}
        type="checkbox"
        id={registerName}
        className={`form-checkbox h-4 w-4 border-gray-300 rounded`}
        {...register(registerName, registerProps)}
        disabled={isDisabled}
      />
      <label htmlFor={registerName} className="ml-2 text-md">
        {label}
      </label>
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
};

export default Checkbox;
