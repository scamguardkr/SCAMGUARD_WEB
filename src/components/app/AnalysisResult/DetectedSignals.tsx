import React from 'react';
import { Radar } from 'lucide-react';
import type { LlmScamAnalysisResultV2 } from '@/types/scam-analysis';
import type { Severity } from '@/types/scam-analysis';
import { cn } from '@/lib/utils';
import SectionCard from './SectionCard';

interface DetectedSignalsProps {
    detectedSignals: LlmScamAnalysisResultV2['detectedSignals'];
}

const severityStyleMap: Record<Severity, {
    badgeClass: string;
    markerBorderClass: string;
    quoteBorderClass: string;
    quoteHighlightClass: string;
}> = {
    HIGH: {
        badgeClass: 'bg-[#ec6246]/10 text-[#ec6246] border border-[#ec6246]/20',
        markerBorderClass: 'border-[#ec6246]',
        quoteBorderClass: 'border-l-[#ec6246]',
        quoteHighlightClass: 'bg-[#ec6246]/20 dark:bg-[#ec6246]/40 text-gray-900 dark:text-white'
    },
    MEDIUM: {
        badgeClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border border-orange-200 dark:border-orange-800',
        markerBorderClass: 'border-orange-400',
        quoteBorderClass: 'border-l-orange-400',
        quoteHighlightClass: 'bg-orange-100 dark:bg-orange-900/40 text-gray-900 dark:text-white'
    },
    LOW: {
        badgeClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800',
        markerBorderClass: 'border-yellow-400',
        quoteBorderClass: 'border-l-yellow-400',
        quoteHighlightClass: 'bg-yellow-100 dark:bg-yellow-900/40 text-gray-900 dark:text-white'
    }
};

const severityLabelMap: Record<Severity, string> = {
    HIGH: 'HIGH SEVERITY',
    MEDIUM: 'MEDIUM SEVERITY',
    LOW: 'LOW SEVERITY'
};

const DetectedSignals: React.FC<DetectedSignalsProps> = ({ detectedSignals }) => {
    if (detectedSignals.length === 0) return null;

    return (
        <SectionCard
            title="감지된 위험신호"
            icon={<Radar className="w-5 h-5" />}
            iconColor="bg-[#ec6246]/10 text-[#ec6246]"
            contentClassName="px-6 pb-10 pt-0"
        >
            <div className="relative space-y-8 pl-2">
                <div className="absolute left-5 top-8 bottom-0 w-px bg-gray-200 dark:bg-gray-700" aria-hidden="true" />

                {detectedSignals.map((signal, idx) => {
                    const style = severityStyleMap[signal.severity];

                    return (
                        <div key={`${signal.signalName}-${idx}`} className="relative pl-10">
                            <div
                                className={cn(
                                    'absolute left-2.5 top-0 -ml-3 z-10 h-6 w-6 rounded-full border-4 bg-white dark:bg-gray-900',
                                    style.markerBorderClass
                                )}
                            />

                            <div className="mb-1 flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                                <h4 className="text-base font-bold text-gray-900 dark:text-white">{signal.signalName}</h4>
                                <span
                                    className={cn(
                                        'self-start rounded px-2 py-0.5 text-xs font-bold',
                                        style.badgeClass
                                    )}
                                >
                                    {severityLabelMap[signal.severity]}
                                </span>
                            </div>

                            <p className="mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                {signal.explanation}
                            </p>

                            {signal.evidenceQuote && (
                                <blockquote
                                    className={cn(
                                        'rounded-r border-l-4 bg-gray-50 p-3 text-sm italic text-gray-700 dark:bg-gray-800/50 dark:text-gray-300',
                                        style.quoteBorderClass
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'rounded px-1 font-medium not-italic',
                                            style.quoteHighlightClass
                                        )}
                                    >
                                        {signal.evidenceQuote}
                                    </span>
                                </blockquote>
                            )}
                        </div>
                    );
                })}
            </div>
        </SectionCard>
    );
};

export default DetectedSignals;
