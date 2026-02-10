import React from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
    value: number;
    size?: number;
    strokeWidth?: number;
    color: string;
    label: string;
    subLabel?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    value,
    size = 140,
    strokeWidth = 12,
    color,
    label,
    subLabel
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90 w-full h-full">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-gray-200"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className={cn("transition-all duration-1000 ease-out", color)}
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-3xl font-bold", color)}>{Math.round(value)}%</span>
                <span className="text-xs text-gray-500 font-medium mt-1">{label}</span>
                {subLabel && <span className="text-[10px] text-gray-400 mt-0.5">{subLabel}</span>}
            </div>
        </div>
    );
};

export default CircularProgress;
