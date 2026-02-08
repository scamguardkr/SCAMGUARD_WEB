import React from 'react';
import type { ScamAnalysisResponse, RiskLevel } from '@/api/types';
import { ShieldAlert, ShieldCheck, AlertTriangle, Info, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const getRiskColor = (level: RiskLevel) => {
    switch (level) {
        case 'VERY_DANGEROUS': return 'text-red-600 bg-red-50 border-red-200';
        case 'DANGEROUS': return 'text-orange-600 bg-orange-50 border-orange-200';
        case 'SUSPICIOUS': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        case 'LOW': return 'text-blue-600 bg-blue-50 border-blue-200';
        case 'NONE': return 'text-green-600 bg-green-50 border-green-200';
        default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
};

const getRiskLabel = (level: RiskLevel) => {
    switch (level) {
        case 'VERY_DANGEROUS': return '매우 위험';
        case 'DANGEROUS': return '위험';
        case 'SUSPICIOUS': return '의심';
        case 'LOW': return '주의';
        case 'NONE': return '안전';
        default: return '미확인';
    }
};

interface AnalysisResultProps {
    result: ScamAnalysisResponse;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
    const riskColorClass = getRiskColor(result.risk_level);

    return (
        <div className="space-y-6 w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Header / Summary Card */}
            <div className={cn("rounded-2xl border-2 p-6 shadow-lg relative overflow-hidden", riskColorClass)}>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ShieldAlert className="w-48 h-48" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold border border-current tracking-wide">
                                ANALYSIS REPORT
                            </span>
                            <span className="text-xs opacity-70 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(result.analysis_details.analysis_time).toLocaleString()}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-1 tracking-tight">
                            {getRiskLabel(result.risk_level)}
                        </h2>
                        <p className="text-lg opacity-90 font-medium mb-4">
                            {result.scam_type}
                        </p>

                        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto md:mx-0">
                            <div className="bg-white/60 p-3 rounded-xl border border-current/20">
                                <p className="text-xs opacity-70 mb-1">유사도 점수</p>
                                <p className="text-2xl font-bold">{result.similarity_score.toFixed(1)}%</p>
                            </div>
                            <div className="bg-white/60 p-3 rounded-xl border border-current/20">
                                <p className="text-xs opacity-70 mb-1">AI 모델</p>
                                <p className="text-md font-bold truncate" title={result.analysis_details.model}>
                                    {result.analysis_details.model}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Gauge placeholder or visual - simplified for now */}
                    <div className="shrink-0 relative">
                        {/* Circular Progress (CSS only) */}
                        <div className="w-32 h-32 rounded-full border-8 border-current/20 flex items-center justify-center relative">
                            <svg
                                className="w-full h-full absolute top-0 left-0 -rotate-90"
                                viewBox="0 0 128 128"
                            >
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="60"               // 64 - (strokeWidth/2=4) - (border/2=4) = 56
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={2 * Math.PI * 56}
                                    strokeDashoffset={
                                        2 * Math.PI * 56 * (1 - result.similarity_score / 100)
                                    }
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="text-center">
                                <span className="block text-2xl font-bold">
                                    {Math.round(result.similarity_score)}
                                </span>
                                <span className="text-xs">RISK SCORE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Detected Risks */}
                <div className="bg-white rounded-2xl border shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4 text-red-600">
                        <AlertTriangle className="w-5 h-5" />
                        <h3 className="font-bold text-lg">탐지된 위험 요소</h3>
                    </div>

                    {result.detected_risks.length > 0 ? (
                        <ul className="space-y-3">
                            {result.detected_risks.map((risk, idx) => (
                                <li key={idx} className="flex gap-3 bg-red-50 p-3 rounded-lg border border-red-100">
                                    <div className="shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-red-900 text-sm">{risk.name}</p>
                                        <p className="text-red-700 text-xs mt-0.5 leading-relaxed">{risk.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                            <ShieldCheck className="w-12 h-12 mx-auto mb-2 text-green-500" />
                            <p>탐지된 위험 요소가 없습니다.</p>
                        </div>
                    )}
                </div>

                {/* Similar Case */}
                <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-4 text-primary">
                        <FileText className="w-5 h-5" />
                        <h3 className="font-bold text-lg">유사 사기 사례</h3>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5 border flex-1">
                        {result.similar_case ? (
                            <>
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                                    {result.similar_case.name}
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {result.similar_case.information}
                                </p>
                            </>
                        ) : (
                            <p className="text-gray-500 text-sm text-center py-4">
                                유사한 사례를 찾을 수 없습니다.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-50 border rounded-xl p-4 flex gap-3 text-xs text-gray-500">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                    이 분석 결과는 AI에 의해 생성되었으며, 실제 법적 효력은 없습니다.
                    의심스러운 경우 반드시 관계 기관(경찰청 112, 금융감독원 1332)에 확인하시기 바랍니다.
                </p>
            </div>
        </div>
    );
};

export default AnalysisResult;
