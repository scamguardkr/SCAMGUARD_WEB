import React from 'react';
import { Search, FileText, CheckCircle2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LlmScamAnalysisResultV2 } from '@/types/scam-analysis';
import SectionCard from './SectionCard';

interface SimilarCasesProps {
    similarCases: LlmScamAnalysisResultV2['similarCases'];
}

const SimilarCases: React.FC<SimilarCasesProps> = ({ similarCases }) => {
    if (similarCases.length === 0) return null;

    return (
        <SectionCard
            title="유사 사기 사례"
            icon={<Search className="w-5 h-5" />}
            iconColor="bg-indigo-100 text-indigo-600"
        >
            <div className="grid gap-4">
                {similarCases.map((caseItem, idx) => (
                    <div
                        key={idx}
                        className="bg-indigo-50/30 rounded-xl p-5 border border-indigo-100 hover:border-indigo-200 transition-all"
                    >
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-indigo-500" />
                                <h4 className="font-bold text-indigo-900">
                                    {caseItem.caseTitle}
                                </h4>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-right">
                                    <span className="text-xs text-gray-500">유사도</span>
                                    <p className={cn(
                                        "text-lg font-bold",
                                        caseItem.similarityScore >= 80 ? "text-red-600" :
                                            caseItem.similarityScore >= 60 ? "text-orange-600" :
                                                caseItem.similarityScore >= 40 ? "text-amber-600" : "text-blue-600"
                                    )}>
                                        {caseItem.similarityScore}%
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Similarity Score Bar */}
                        <div className="mb-4">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-all duration-1000",
                                        caseItem.similarityScore >= 80 ? "bg-red-500" :
                                            caseItem.similarityScore >= 60 ? "bg-orange-500" :
                                                caseItem.similarityScore >= 40 ? "bg-amber-500" : "bg-blue-500"
                                    )}
                                    style={{ width: `${caseItem.similarityScore}%` }}
                                />
                            </div>
                        </div>

                        {caseItem.matchedPatterns.length > 0 && (
                            <div className="mb-3">
                                <p className="text-xs font-medium text-gray-500 mb-2">일치하는 패턴:</p>
                                <div className="flex flex-wrap gap-2">
                                    {caseItem.matchedPatterns.map((pattern, pIdx) => (
                                        <span
                                            key={pIdx}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-indigo-100 text-indigo-700 border border-indigo-200"
                                        >
                                            <CheckCircle2 className="w-3 h-3" />
                                            {pattern}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {caseItem.caseSource && (
                            <a
                                href={caseItem.caseSource}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 hover:underline"
                            >
                                <ExternalLink className="w-3 h-3" />
                                출처 확인하기
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </SectionCard>
    );
};

export default SimilarCases;
