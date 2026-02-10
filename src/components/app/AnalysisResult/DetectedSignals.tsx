import React from 'react';
import { AlertOctagon, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LlmScamAnalysisResultV2 } from '@/types/scam-analysis';
import { severityConfig } from './constants';
import SectionCard from './SectionCard';

interface DetectedSignalsProps {
    detectedSignals: LlmScamAnalysisResultV2['detectedSignals'];
}

const DetectedSignals: React.FC<DetectedSignalsProps> = ({ detectedSignals }) => {
    if (detectedSignals.length === 0) return null;

    return (
        <SectionCard
            title="탐지된 위험 신호"
            icon={<AlertOctagon className="w-5 h-5" />}
            iconColor="bg-red-100 text-red-600"
        >
            <div className="space-y-4">
                {detectedSignals.map((signal, idx) => {
                    const severity = severityConfig[signal.severity];
                    return (
                        <div
                            key={idx}
                            className={cn(
                                "rounded-xl border p-4 transition-all hover:shadow-md",
                                severity.bgColor,
                                severity.borderColor
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn(
                                    "shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                                    severity.color,
                                    "bg-white/80"
                                )}>
                                    {signal.severity[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className={cn("font-bold", severity.color)}>
                                            {signal.signalName}
                                        </h4>
                                        <span className={cn(
                                            "text-xs px-2 py-0.5 rounded-full border",
                                            severity.color,
                                            severity.borderColor,
                                            "bg-white/60"
                                        )}>
                                            {severity.label}
                                        </span>
                                    </div>
                                    {signal.evidenceQuote && (
                                        <div className="mb-2 bg-white/60 rounded-lg p-2 border border-current/10">
                                            <div className="flex items-start gap-2">
                                                <Quote className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />
                                                <p className="text-sm text-gray-700 italic">
                                                    &ldquo;{signal.evidenceQuote}&rdquo;
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {signal.explanation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionCard>
    );
};

export default DetectedSignals;
