import React from 'react';
import { Brain as BrainIcon, Share2 as ShareIcon, Download as DownloadIcon, CpuIcon, ZapIcon } from 'lucide-react';
import type { LlmScamAnalysisResultV2, AnalysisDetails } from '@/types/scam-analysis';
import { riskConfig, scamTypeLabels } from './constants';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import RiskGauge from './RiskGauge';
import ClassificationReasonCard from './ClassificationReasonCard';

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
    const modelName = analysisDetails?.model ?? '-';
    const isLongModelName = modelName.length > 10;

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
                    return date.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
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

    const formatDuration = (ms: number | undefined) => {
        if (ms === undefined) return '-';
        if (ms < 1000) return `${ms}ms`;
        if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}m ${seconds}s`;
    };

    const riskScore = riskAssessment.riskScore;

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8 transition-colors duration-200">
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                {/* Risk Gauge */}
                <div className="flex-shrink-0 w-full max-w-56 lg:w-56 flex flex-col items-center relative gap-4">
                    <RiskGauge
                        riskScore={riskScore}
                        riskLevel={riskAssessment.riskLevel}
                        riskLevelLabel={riskConfig_data.label}
                    />
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                            <BrainIcon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">AI 분석 신뢰도 {riskAssessment.confidenceLevel}%</span>
                        </div>
                    </div>
                    <div className="w-full bg-orange-50/50 dark:bg-gray-800/40 rounded-lg p-3 border border-orange-100/50 dark:border-gray-700/50">
                        <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">Model Metadata</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between items-start text-xs gap-4">
                                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 flex-shrink-0">
                                    <CpuIcon className="w-3.5 h-3.5 text-gray-500" />
                                    <span>Model</span>
                                </div>
                                <span
                                    className={`font-mono text-gray-700 dark:text-gray-300 font-medium text-right whitespace-normal break-all ${isLongModelName ? 'text-[10px] leading-tight max-w-[110px]' : 'text-xs'}`}
                                >
                                    {modelName}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                    <ZapIcon className="w-3.5 h-3.5 text-gray-500" />
                                    <span>Processing</span>
                                </div>
                                <span className="font-mono text-gray-700 dark:text-gray-300 font-medium" title={`${analysisDetails?.totalProcessingTimeMs}ms`}>
                                    {formatDuration(analysisDetails?.totalProcessingTimeMs)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Content */}
                <div className="flex-1 w-full space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI 사기 분석 보고서</h1>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Analyzed on {formatAnalysisTime(analysisDetails?.analysisTime)}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors shadow-sm">
                                <ShareIcon className="w-4 h-4" /> 공유하기
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary-dark transition-colors shadow-sm shadow-primary/30">
                                <DownloadIcon className="w-4 h-4" /> 보고서 다운로드
                            </button>
                        </div>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-5 border border-orange-100 dark:border-orange-900/30">
                        <div className="flex items-start gap-3">
                            <TravelExploreIcon className="w-5 h-5 text-primary mt-1" />
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                                    {scamTypeLabels[scamClassification.scamType] || scamClassification.scamType}가 의심됩니다.
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                                    {analysisSummary}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Classification Reason - Diagnostic Box */}
                    <ClassificationReasonCard
                        riskLevel={riskAssessment.riskLevel}
                        scamClassification={scamClassification}
                    />
                </div>
            </div>
        </div>
    );
};

export default MainRiskCard;
