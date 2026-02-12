import React from 'react';
import { Brain as BrainIcon, Share2 as ShareIcon, Download as DownloadIcon, ShieldAlert, Fingerprint } from 'lucide-react';
import type { LlmScamAnalysisResultV2, AnalysisDetails } from '@/types/scam-analysis';
import { riskConfig, scamTypeLabels } from './constants';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

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

    const riskScore = riskAssessment.riskScore;
    const strokeDasharray = `${riskScore}, 100`;

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8 transition-colors duration-200">
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                {/* Risk Gauge */}
                <div className="flex-shrink-0 flex flex-col items-center relative gap-4">
                    <div className="relative w-48 h-48">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            {/* Background Circle */}
                            <path
                                className="text-gray-100 dark:text-gray-800"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            {/* Value Circle */}
                            <path
                                className="text-primary gauge-circle"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeDasharray={strokeDasharray}
                                strokeWidth="3"
                                style={{
                                    transition: 'stroke-dasharray 1.5s ease-out'
                                }}
                            />
                        </svg>
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center">
                            <span className="text-4xl font-sans font-bold text-gray-900 dark:text-white">{riskScore}</span>
                            <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold mt-1">RISK SCORE</span>
                        </div>
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                            <BrainIcon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">AI 분석 신뢰도: {riskAssessment.confidenceLevel}%</span>
                        </div>
                    </div>
                </div>

                {/* Summary Content */}
                <div className="flex-1 w-full space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI 사기 분석 보고서</h1>
                                <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded text-sm font-bold uppercase tracking-wide flex items-center gap-1">
                                    <ShieldAlert className="w-4 h-4" />
                                    사기 {riskConfig_data.label}
                                </span>
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
                                    {scamTypeLabels[scamClassification.scamType] || scamClassification.scamType}가 의심됩니다
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                                    {analysisSummary}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                                        Type: {scamTypeLabels[scamClassification.scamType] || scamClassification.scamType}
                                    </span>
                                    {scamClassification.scamSubType && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                                            Sub-type: {scamClassification.scamSubType}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Classification Reason - Diagnostic Box */}
                    <div className="bg-slate-50/80 dark:bg-slate-900/40 rounded-xl p-5 border border-slate-100 dark:border-slate-800/60 shadow-inner">
                        <div className="flex items-center gap-2 mb-3">
                            <Fingerprint className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tight">AI 판단 근거 요약</h4>
                        </div>
                        <div className="pl-7 border-l-2 border-slate-200 dark:border-slate-700 ml-2.5">
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                "{scamClassification.classificationReason}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainRiskCard;
