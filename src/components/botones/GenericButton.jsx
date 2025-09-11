import { COLORS } from '../../theme';

function GenericButton({ onClick, children, className = "" }) {
    return (
        <button 
            onClick={onClick} 
            className={`px-4 py-2 text-white rounded-md hover:${COLORS.primary} transition-colors duration-300 ${className}`}
            style={{backgroundColor: COLORS.secondary, color: COLORS.background}}
        >
            {children}
        </button>
    );
}

export default GenericButton;