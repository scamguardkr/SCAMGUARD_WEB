import React from 'react';
import { Search, ExternalLink, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LlmScamAnalysisResultV2 } from '@/types/scam-analysis';
import SectionCard from './SectionCard';

interface SimilarCasesProps {
    similarCases: LlmScamAnalysisResultV2['similarCases'];
}

const getScoreTextColor = (score: number): string => {
    if (score >= 80) return 'text-[#ec6246]';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-blue-600';
};

const getScoreBarColor = (score: number): string => {
    if (score >= 80) return 'bg-[#ec6246]';
    if (score >= 60) return 'bg-orange-500';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-blue-500';
};

const isExternalUrl = (value: string): boolean => /^https?:\/\//i.test(value);

const SimilarCases: React.FC<SimilarCasesProps> = ({ similarCases }) => {
    if (similarCases.length === 0) return null;

    return (
        <SectionCard
            title="유사 사례 - FROM ScamGuard Intellegence Database"
            icon={<Search className="w-5 h-5" />}
            iconColor="bg-[#ec6246]/10 text-[#ec6246]"
            className="shadow-lg"
        >
            <div className="space-y-4">
                {similarCases.map((caseItem, idx) => {
                    const isLink = isExternalUrl(caseItem.caseSource);

                    return (
                        <div
                            key={`${caseItem.caseTitle}-${idx}`}
                            className="rounded-xl border border-gray-200 p-5 transition-all hover:border-[#ec6246] hover:bg-[#FEF2EF]/30"
                        >
                            <div className="mb-4 flex items-start justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <h4 className="mb-1 text-base font-semibold text-gray-900">
                                        {caseItem.caseTitle}
                                    </h4>

                                    {caseItem.caseSource && (
                                        isLink ? (
                                            <a
                                                href={caseItem.caseSource}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 rounded-full border border-[#ec6246]/30 bg-[#FEF2EF] px-2.5 py-1 text-xs font-medium text-[#ec6246] transition-colors hover:bg-[#f7c9be]"
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                                출처 확인하기
                                            </a>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600">
                                                {caseItem.caseSource}
                                            </span>
                                        )
                                    )}
                                </div>

                                <div className="text-right">
                                    <div className={cn('text-2xl font-bold', getScoreTextColor(caseItem.similarityScore))}>
                                        {caseItem.similarityScore}%
                                    </div>
                                    <div className="text-xs text-gray-500">AI 판단 유사도</div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className={cn('h-full rounded-full transition-all duration-700', getScoreBarColor(caseItem.similarityScore))}
                                        style={{ width: `${Math.max(0, Math.min(100, caseItem.similarityScore))}%` }}
                                    />
                                </div>
                            </div>

                            {caseItem.matchedPatterns.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {caseItem.matchedPatterns.map((pattern, pIdx) => (
                                        <span
                                            key={`${pattern}-${pIdx}`}
                                            className="inline-flex items-center gap-1 rounded-full bg-[#FEF2EF] px-3 py-1 text-xs font-medium text-[#ec6246]"
                                        >
                                            <CheckCircle2 className="h-3 w-3" />
                                            {pattern}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </SectionCard>
    );
};

export default SimilarCases;

