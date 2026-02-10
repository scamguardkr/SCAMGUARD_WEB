import React from 'react';
import { Brain, Cpu, Clock, Timer, ShieldAlert, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LlmScamAnalysisResultV2, AnalysisDetails } from '@/types/scam-analysis';
import { riskConfig, scamTypeLabels } from './constants';
import CircularProgress from './CircularProgress';

interface MainRiskCardProps {
    riskAssessment: LlmScamAnalysisResultV2['riskAssessment'];
    scamClassification: LlmScamAnalysisResultV2['scamClassification'];
    analysisSummary: string;
    analysisDetails?: AnalysisDetails;
}

const MainRiskCard: React.FC<MainRiskCardProps> = ({
    riskAssessment,
    scamClassification,
    analysisSummary,
    analysisDetails
}) => {
    const riskConfig_data = riskConfig[riskAssessment.riskLevel];

    const formatAnalysisTime = (timeString: string | undefined) => {
        if (!timeString) return '-';
        try {
            const parts = timeString.split(/[\s-:]/);
            if (parts.length >= 6) {
                const [year, month, day, hour, minute, second] = parts;
                const date = new Date(
                    parseInt(year),
                    parseInt(month) - 1,
                    parseInt(day),
                    parseInt(hour),
                    parseInt(minute),
                    parseInt(second || '0')
                );
                if (!isNaN(date.getTime())) {
                    return date.toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                }
            }
            return timeString;
        } catch {
            return timeString;
        }
    };

    const formatProcessingTime = (ms: number | string | undefined) => {
        if (ms === undefined || ms === null) return '-';
        const numMs = typeof ms === 'string' ? parseInt(ms, 10) : ms;
        if (isNaN(numMs)) return '-';
        if (numMs <= 0) return '-';
        if (numMs < 1000) return `${numMs}ms`;
        if (numMs < 60000) return `${(numMs / 1000).toFixed(1)}초`;
        return `${(numMs / 60000).toFixed(1)}분`;
    };

    return (
        <div className={cn(
            "relative overflow-hidden rounded-2xl border-2 p-6 md:p-8 shadow-lg",
            riskConfig_data.bgColor,
            riskConfig_data.borderColor
        )}>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
                <ShieldAlert className="w-full h-full" />
            </div>

            <div className="relative z-10">
                {/* Header - Single Row Layout */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    {/* Left: AI Report Badge + Confidence */}
                    <div className="flex items-center gap-3">
                        <span className={cn(
                            "px-4 py-2 rounded-full text-sm font-bold border-2 bg-white shadow-sm",
                            riskConfig_data.color,
                            riskConfig_data.borderColor
                        )}>
                            <span className="flex items-center gap-2">
                                <Brain className="w-4 h-4" />
                                AI 분석 리포트
                            </span>
                        </span>
                        <span className={cn(
                            "px-3 py-1.5 rounded-lg text-sm font-bold border bg-white/80",
                            riskConfig_data.color,
                            riskConfig_data.borderColor
                        )}>
                            신뢰도 {riskAssessment.confidenceLevel}%
                        </span>
                    </div>

                    {/* Right: Model & Time Info */}
                    {analysisDetails && (
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                            <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-lg border border-current/20">
                                <Cpu className="w-3.5 h-3.5 text-gray-500" />
                                <span className="font-semibold text-gray-700">{analysisDetails.model}</span>
                            </div>

                            <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-lg border border-current/20">
                                <Clock className="w-3.5 h-3.5 text-gray-500" />
                                <span className="text-gray-600">{formatAnalysisTime(analysisDetails.analysisTime)}</span>
                            </div>

                            <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-lg border border-current/20">
                                <Timer className="w-3.5 h-3.5 text-gray-500" />
                                <span className="text-gray-600">{formatProcessingTime(analysisDetails.totalProcessingTimeMs)}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Risk Level Badge & Description */}
                    <div className="flex-1 text-center md:text-left">
                        <div className={cn(
                            "inline-flex items-center gap-2 px-5 py-3 rounded-xl mb-4",
                            "bg-gradient-to-r text-white shadow-lg",
                            riskConfig_data.gradient
                        )}>
                            {riskConfig_data.icon}
                            <span className="text-2xl font-bold">{riskConfig_data.label}</span>
                        </div>
                        <p className={cn("text-lg font-medium mb-3", riskConfig_data.color)}>
                            {riskConfig_data.description}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
                            {analysisSummary}
                        </p>
                    </div>

                    {/* Risk Score Gauges - Larger */}
                    <div className="flex gap-8 shrink-0">
                        <CircularProgress
                            value={riskAssessment.riskScore}
                            size={130}
                            strokeWidth={10}
                            color={riskConfig_data.color}
                            label="위험 점수"
                        />
                        <CircularProgress
                            value={riskAssessment.confidenceLevel}
                            size={130}
                            strokeWidth={10}
                            color="text-indigo-600"
                            label="신뢰도"
                        />
                    </div>
                </div>

                {/* Scam Type Info */}
                <div className="mt-6 pt-6 border-t border-current/10">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Target className={cn("w-5 h-5", riskConfig_data.color)} />
                            <span className="font-semibold text-gray-900">사기 유형:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className={cn(
                                "px-3 py-1.5 rounded-lg text-sm font-medium border",
                                riskConfig_data.bgColor,
                                riskConfig_data.color,
                                riskConfig_data.borderColor
                            )}>
                                {scamTypeLabels[scamClassification.scamType] || scamClassification.scamType}
                            </span>
                            {scamClassification.scamSubType && (
                                <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                    {scamClassification.scamSubType}
                                </span>
                            )}
                        </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 bg-white/60 p-3 rounded-lg">
                        <span className="font-medium text-gray-900">분류 근거:</span>{' '}
                        {scamClassification.classificationReason}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MainRiskCard;
