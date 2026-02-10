import React from 'react';
import {
    ShieldAlert,
    ShieldCheck,
    Info,
    AlertTriangle,
    AlertOctagon
} from 'lucide-react';
import type { RiskLevelV2, Severity, ScamType } from '@/types/scam-analysis';

export const riskConfig: Record<RiskLevelV2, {
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

export const severityConfig: Record<Severity, {
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

export const scamTypeLabels: Record<ScamType, string> = {
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
