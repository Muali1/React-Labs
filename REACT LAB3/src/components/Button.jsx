const Button = ({ children, className = "", disabled = false }) => {
  return (
    <button
      className={
        `px-4 py-2 rounded-full transition-shadow inline-flex items-center justify-center
         disabled:opacity-60 disabled:cursor-not-allowed ${className}`
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;