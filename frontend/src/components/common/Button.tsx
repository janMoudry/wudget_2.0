import { Loader } from ".";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  variant: "primary" | "secondary";
  type: "button" | "submit" | "reset";
  loading?: boolean;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  type,
  className,
  loading,
  loadingText,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
        variant === "primary"
          ? "bg-black text-white hover:bg-black-light"
          : "bg-transparent text-black hover:text-black-light hover:shadow-md"
      } ${className}`}
      disabled={props.disabled || loading}
    >
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <p>{loadingText ? loadingText : "Načítání..."}</p>
          <Loader width="100%" height="100%" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
