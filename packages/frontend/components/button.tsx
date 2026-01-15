export default function Button({ children, onClick, secondary }: { children: React.ReactNode, onClick: () => void, secondary?: boolean }) {
    return (
        <button className={`relative bg-blue-500 ${secondary ? 'bg-white text-black' : 'bg-blue-500 text-white'}  p-4 rounded-md min-w-70 text-xl cursor-pointer overflow-hidden group`} onClick={onClick}>
            <span className="relative z-10">{children}</span>
            <span className={`absolute left-0 top-0 h-full w-0 ${secondary ? 'bg-gray-200' : 'bg-blue-700'} transition-all duration-600 group-hover:w-full`}></span>
        </button>
    )
}