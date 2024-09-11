interface BgChangButtonProps {
    title: string;
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
}

const BgChangButton: React.FC<BgChangButtonProps> = ({
    title,
    activeMenu,
    setActiveMenu,
}) => {
    return (
        <button
            className={`text-xl mb-[10px] hover:bg-gray-300 w-[148px] text-left ${activeMenu === title ? 
                'bg-gray-300' : ''
                }`}
            onClick={() => setActiveMenu(title)}
        >
            {title}
        </button>
    );
};

export default BgChangButton;