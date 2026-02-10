import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    direction?: 'up' | 'down';
    trigger?: React.ReactNode;
    disabled?: boolean;
}

export const Dropdown = ({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    className,
    direction = 'down',
    trigger,
    disabled = false
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => !disabled && setIsOpen(!isOpen)} className={cn(disabled && "opacity-50 cursor-not-allowed pointer-events-none")}>
                {trigger ? (
                    trigger
                ) : (
                    <button
                        type="button"
                        className={cn(
                            "flex items-center justify-between w-full px-4 py-3 text-left bg-white border border-gray-200 rounded-xl transition-all duration-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary active:scale-[0.98]",
                            isOpen && "border-primary ring-2 ring-primary/20",
                            className
                        )}
                    >
                        <span className={cn("block truncate", !value && "text-gray-400")}>
                            {value || placeholder}
                        </span>
                        <ChevronDown
                            className={cn(
                                "w-4 h-4 text-gray-400 transition-transform duration-200 ml-2 shrink-0",
                                isOpen && "transform rotate-180 text-primary"
                            )}
                        />
                    </button>
                )}
            </div>

            {/* Dropdown Menu */}
            <div
                className={cn(
                    "absolute z-50 w-full min-w-[200px] bg-white border border-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform origin-top transition-all duration-200 ease-out",
                    direction === 'up' ? "bottom-full mb-2 origin-bottom" : "mt-2 origin-top",
                    direction === 'up' ? "left-0" : "left-0", // Adjust alignment if needed
                    isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 " + (direction === 'up' ? "translate-y-2 pointer-events-none" : "-translate-y-2 pointer-events-none")
                )}
            >
                <div className="py-1 max-h-60 overflow-auto scrollbar-hide">
                    {options.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => handleSelect(option)}

                            className={cn(
                                "flex items-center justify-between w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors",
                                value === option ? "text-primary font-medium bg-primary/5" : "text-gray-700"
                            )}
                        >
                            <span className="truncate">{option}</span>
                            {value === option && (
                                <Check className="w-4 h-4 text-primary shrink-0 ml-2" />
                            )}
                        </button>
                    ))}
                    {options.length === 0 && (
                        <div className="px-4 py-3 text-sm text-gray-400 text-center">
                            No options available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
