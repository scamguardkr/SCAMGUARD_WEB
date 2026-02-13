import React from 'react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
    title: string;
    icon: React.ReactNode;
    iconColor: string;
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
    title,
    icon,
    iconColor,
    children,
    className,
    contentClassName
}) => (
    <div className={cn('bg-white rounded-2xl border shadow-sm overflow-hidden', className)}>
        <div className="px-6 py-4 border-b bg-gray-50/50 flex items-center gap-2">
            <div className={cn('p-1.5 rounded-lg', iconColor)}>
                {icon}
            </div>
            <h3 className="font-bold text-gray-900">{title}</h3>
        </div>
        <div className={cn('p-6', contentClassName)}>
            {children}
        </div>
    </div>
);

export default SectionCard;
