import React from 'react';
import { Brain } from 'lucide-react';
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
            iconColor="bg-[#ec6246]/10 text-[#ec6246]"
        >
            <div className="grid grid-cols-1 gap-5">
                {psychologicalTactics.map((tactic, idx) => (
                    <div
                        key={`${tactic.tacticName}-${idx}`}
                        className="rounded-lg border border-gray-100 bg-[#FDFBF7] p-5 transition-colors hover:border-[#ec6246]/30 dark:border-gray-700 dark:bg-[#211311]"
                    >
                        <div className="mb-3 flex items-center gap-2.5">
                            <Brain className="h-6 w-6 text-[#ec6246]" />
                            <h4 className="text-base font-bold text-gray-800 dark:text-gray-200">{tactic.tacticName}</h4>
                        </div>

                        <p className="mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{tactic.explanation}</p>

                        {tactic.evidenceQuote && (
                            <div className="border-l-2 border-[#ec6246] pl-3 text-sm italic text-gray-700 dark:text-gray-300">
                                &ldquo;{tactic.evidenceQuote}&rdquo;
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </SectionCard>
    );
};

export default PsychologicalTactics;
