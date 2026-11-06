function Button({ children, onClick, variant = "primary" }) {
  const baseStyles =
    "rounded-xl px-6 py-3 font-semibold transition-all duration-200";

  const variants = {
    primary: "bg-accent text-background hover:bg-violet-300 hover:scale-[1.02]",
    secondary:
      "border border-glass-border bg-surface text-text-primary hover:bg-surface-elevated",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
}

export default Button;
