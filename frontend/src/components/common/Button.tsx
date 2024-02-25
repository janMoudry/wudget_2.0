interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  variant: "primary" | "secondary";
  type: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  type,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
        variant === "primary"
          ? "bg-black text-white hover:bg-black-light"
          : "bg-transparent text-black hover:text-black-light"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
