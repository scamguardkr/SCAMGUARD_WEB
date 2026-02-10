import React from 'react';
import type { LlmScamAnalysisResultV2, RiskLevelV2, Severity, ScamType, AnalysisDetails } from '@/types/scam-analysis';
import {
    ShieldAlert,
    ShieldCheck,
    AlertTriangle,
    Info,
    FileText,
    CheckCircle2,
    Brain,
    Target,
    Zap,
    AlertOctagon,
    Scale,
    Phone,
    Lightbulb,
    ExternalLink,
    Quote,
    ChevronRight,
    Activity,
    Search,
    MessageSquareWarning,
    Cpu,
    Clock,
    Timer
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Risk Level Configuration
const riskConfig: Record<RiskLevelV2, {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    gradient: string;
    icon: React.ReactNode;
    description: string;
}> = {
    SAFE: {
        label: '안전',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        gradient: 'from-emerald-500 to-teal-600',
        icon: <ShieldCheck className="w-6 h-6" />,
        description: '사기 징후가 발견되지 않았습니다'
    },
    LOW: {
        label: '주의',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        gradient: 'from-blue-500 to-indigo-600',
        icon: <Info className="w-6 h-6" />,
        description: '경미한 주의가 필요합니다'
    },
    MODERATE: {
        label: '의심',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        gradient: 'from-amber-500 to-orange-600',
        icon: <AlertTriangle className="w-6 h-6" />,
        description: '사기 의심 요소가 존재합니다'
    },
    HIGH: {
        label: '위험',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        gradient: 'from-orange-500 to-red-600',
        icon: <AlertOctagon className="w-6 h-6" />,
        description: '사기 가능성이 높습니다'
    },
    CRITICAL: {
        label: '심각',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        gradient: 'from-red-500 to-rose-700',
        icon: <ShieldAlert className="w-6 h-6" />,
        description: '즉각적인 조치가 필요합니다'
    }
};

// Severity Configuration
const severityConfig: Record<Severity, {
    color: string;
    bgColor: string;
    borderColor: string;
    label: string;
}> = {
    HIGH: {
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        label: '높음'
    },
    MEDIUM: {
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        label: '중간'
    },
    LOW: {
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        label: '낮음'
    }
};

// Scam Type Labels
const scamTypeLabels: Record<ScamType, string> = {
    VOICE_PHISHING: '보이스피싱',
    SMISHING: '스미싱',
    PHISHING: '피싱',
    INVESTMENT_FRAUD: '투자 사기',
    ROMANCE_SCAM: '로맨스 스캠',
    IMPERSONATION: '사칭 사기',
    EMPLOYMENT_SCAM: '취업 사기',
    SHOPPING_FRAUD: '쇼핑 사기',
    LOAN_FRAUD: '대출 사기',
    RENTAL_FRAUD: '임대 사기',
    CRYPTO_FRAUD: '가상화폐 사기',
    IDENTITY_THEFT: '신분 도용',
    OTHER: '기타'
};

interface AnalysisResultProps {
    result: LlmScamAnalysisResultV2;
    analysisDetails?: AnalysisDetails;
}

// Circular Progress Component
const CircularProgress: React.FC<{
    value: number;
    size?: number;
    strokeWidth?: number;
    color: string;
    label: string;
    subLabel?: string;
}> = ({ value, size = 140, strokeWidth = 12, color, label, subLabel }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90 w-full h-full">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-gray-200"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className={cn("transition-all duration-1000 ease-out", color)}
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-3xl font-bold", color)}>{Math.round(value)}%</span>
                <span className="text-xs text-gray-500 font-medium mt-1">{label}</span>
                {subLabel && <span className="text-[10px] text-gray-400 mt-0.5">{subLabel}</span>}
            </div>
        </div>
    );
};

// Section Card Component
const SectionCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    iconColor: string;
    children: React.ReactNode;
    className?: string;
}> = ({ title, icon, iconColor, children, className }) => (
    <div className={cn("bg-white rounded-2xl border shadow-sm overflow-hidden", className)}>
        <div className="px-6 py-4 border-b bg-gray-50/50 flex items-center gap-2">
            <div className={cn("p-1.5 rounded-lg", iconColor)}>
                {icon}
            </div>
            <h3 className="font-bold text-gray-900">{title}</h3>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, analysisDetails }) => {
    const { riskAssessment, scamClassification, detectedSignals, psychologicalTactics, similarCases, recommendation, analysisSummary } = result;
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
        <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Main Risk Assessment Card */}
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
                                {/* Model */}
                                <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-lg border border-current/20">
                                    <Cpu className="w-3.5 h-3.5 text-gray-500" />
                                    <span className="font-semibold text-gray-700">{analysisDetails.model}</span>
                                </div>
                                
                                {/* Analysis Time */}
                                <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-lg border border-current/20">
                                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                                    <span className="text-gray-600">{formatAnalysisTime(analysisDetails.analysisTime)}</span>
                                </div>
                                
                                {/* Processing Time */}
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

            {/* Detected Signals */}
            {detectedSignals.length > 0 && (
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
            )}

            {/* Psychological Tactics */}
            {psychologicalTactics.length > 0 && (
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
            )}

            {/* Similar Cases */}
            {similarCases.length > 0 && (
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
            )}

            {/* Recommendations */}
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

            {/* Disclaimer */}
            <div className="bg-gray-50 border rounded-xl p-4 flex gap-3 text-xs text-gray-500">
                <MessageSquareWarning className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                    이 분석 결과는 AI에 의해 생성되었으며 참고용으로만 사용하세요. 중요한 결정은 반드시
                    관계 기관(경찰청 112, 금융감독원 1332, 한국인터넷진흥원 118)에 문의하시기 바랍니다.
                    ScamGuard는 분석 결과의 법적 효력을 보장하지 않습니다.
                </p>
            </div>
        </div>
    );
};

export default AnalysisResult;
