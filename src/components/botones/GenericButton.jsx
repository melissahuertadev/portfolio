const baseButtonClasses = `
  px-4 py-2 rounded-lg font-medium text-sm
  flex items-center justify-center gap-2
  transition-all duration-200
  hover:scale-105 hover:shadow-md
`;

function GenericButton({ onClick, children, className = "" }) {
    return (
        <button 
            onClick={onClick} 
            className={`${baseButtonClasses} ${className}`}
            >
            {children}
        </button>
    );
}

export default GenericButton;
