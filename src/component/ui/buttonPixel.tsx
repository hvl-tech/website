interface ButtonPixelProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const ButtonPixel = ({ children, className = '', onClick }: ButtonPixelProps) => {
    return (
        <button
            onClick={onClick}
            className={`uppercase font-['Press_Start_2P'] bg-[#fefefe] text-[#00274a] border-4 border-[#00274a] md:px-6 md:py-3 px-5 py-2 md:text-sm text-nowrap text-xs cursor-pointer shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 focus:outline-none focus:ring-0 ${className}`}
        >
            {children}
        </button>
    );
};

export default ButtonPixel;