import React from 'react';
import { Scale, Zap, Phone, Lightbulb, ChevronRight } from 'lucide-react';
import type { LlmScamAnalysisResultV2 } from '@/types/scam-analysis';
import SectionCard from './SectionCard';

interface RecommendationsProps {
    recommendation: LlmScamAnalysisResultV2['recommendation'];
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendation }) => {
    return (
        <SectionCard
            title="대응 권고"
            icon={<Scale className="w-5 h-5" />}
            iconColor="bg-teal-100 text-teal-600"
        >
            <div className="space-y-6">
                {/* Immediate Actions */}
                {recommendation.immediateActions.length > 0 && (
                    <div>
                        <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                            <Zap className="w-4 h-4 text-amber-500" />
                            즉시 실행할 조치
                        </h4>
                        <div className="space-y-2">
                            {recommendation.immediateActions.map((action, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-3 bg-amber-50 p-3 rounded-lg border border-amber-100"
                                >
                                    <div className="shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
                                        {idx + 1}
                                    </div>
                                    <p className="text-sm text-gray-800 leading-relaxed">{action}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reporting Guidance */}
                {recommendation.reportingGuidance && (
                    <div className="pt-4 border-t">
                        <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                            <Phone className="w-4 h-4 text-blue-500" />
                            신고 및 상담 안내
                        </h4>
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                {recommendation.reportingGuidance}
                            </p>
                        </div>
                    </div>
                )}

                {/* Prevention Tips */}
                {recommendation.preventionTips.length > 0 && (
                    <div className="pt-4 border-t">
                        <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                            <Lightbulb className="w-4 h-4 text-green-500" />
                            예방 조언
                        </h4>
                        <div className="grid gap-2">
                            {recommendation.preventionTips.map((tip, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-2 text-sm text-gray-700"
                                >
                                    <ChevronRight className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                    <span>{tip}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </SectionCard>
    );
};

export default Recommendations;
