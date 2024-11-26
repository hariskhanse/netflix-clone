const Button = ({ children, onClick, disabled, className }) => {
    return (
        <button
            className={`w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
