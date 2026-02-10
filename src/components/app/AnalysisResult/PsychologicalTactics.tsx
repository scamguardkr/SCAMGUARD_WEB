import React from 'react';
import { Brain, Activity, Quote } from 'lucide-react';
import type { LlmScamAnalysisResultV2 } from '@/types/scam-analysis';
import SectionCard from './SectionCard';

interface PsychologicalTacticsProps {
    psychologicalTactics: LlmScamAnalysisResultV2['psychologicalTactics'];
}

const PsychologicalTactics: React.FC<PsychologicalTacticsProps> = ({ psychologicalTactics }) => {
    if (psychologicalTactics.length === 0) return null;

    return (
        <SectionCard
            title="심리 전술 분석"
            icon={<Brain className="w-5 h-5" />}
            iconColor="bg-purple-100 text-purple-600"
        >
            <div className="grid gap-4">
                {psychologicalTactics.map((tactic, idx) => (
                    <div
                        key={idx}
                        className="bg-purple-50/50 rounded-xl p-4 border border-purple-100 hover:border-purple-200 transition-all"
                    >
                        <div className="flex items-start gap-3">
                            <div className="shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <Activity className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-purple-900 mb-2">
                                    {tactic.tacticName}
                                </h4>
                                {tactic.evidenceQuote && (
                                    <div className="mb-2 bg-white rounded-lg p-2 border border-purple-100">
                                        <div className="flex items-start gap-2">
                                            <Quote className="w-3 h-3 text-purple-400 mt-0.5 shrink-0" />
                                            <p className="text-sm text-purple-700 italic">
                                                &ldquo;{tactic.evidenceQuote}&rdquo;
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <p className="text-sm text-purple-800/80 leading-relaxed">
                                    {tactic.explanation}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionCard>
    );
};

export default PsychologicalTactics;
