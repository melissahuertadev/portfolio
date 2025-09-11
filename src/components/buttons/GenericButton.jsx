const baseButtonClasses = `
  px-4 py-2 rounded-lg font-medium text-sm
  flex items-center justify-center gap-2
  transition-all duration-200
  hover:scale-105 hover:shadow-md
`;

function GenericButton(props) {
    const { as: Component = "button", onClick, children, className = "", style = {}, ...rest } = props;

    return (
        <Component 
            onClick={onClick} 
            className={`${baseButtonClasses} ${className}`}
            style={style}
            {...rest}
        >
            {children}
        </Component>
    );
}

export default GenericButton;
