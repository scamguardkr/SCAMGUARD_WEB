import React from 'react';
import type { RiskLevelV2 } from '@/types/scam-analysis';
import { riskConfig } from './constants';

interface RiskGaugeProps {
    riskScore: number;
    riskLevel: RiskLevelV2;
    riskLevelLabel: string;
}

const clampScore = (score: number) => Math.max(0, Math.min(100, score));

const scoreToNeedleAngle = (score: number) => {
    const safeScore = clampScore(score);
    return -90 + (safeScore / 100) * 180;
};

const RiskGauge: React.FC<RiskGaugeProps> = ({ riskScore, riskLevel, riskLevelLabel }) => {
    const safeRiskScore = clampScore(riskScore);
    const needleAngle = scoreToNeedleAngle(safeRiskScore);
    const gradientId = React.useId();
    // const glowFilterId = React.useId();
    const riskStyle = riskConfig[riskLevel];
    const [animatedNeedleAngle, setAnimatedNeedleAngle] = React.useState(-90);

    React.useEffect(() => {
        const rafId = window.requestAnimationFrame(() => {
            setAnimatedNeedleAngle(needleAngle);
        });
        return () => window.cancelAnimationFrame(rafId);
    }, [needleAngle]);

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-48 h-28 overflow-hidden">
                <div
                    className="absolute bottom-0 left-1/2 h-24 w-48 -translate-x-1/2 rounded-t-full opacity-70"
                    style={{
                        background:
                            'conic-gradient(from 180deg, #b7f7d1 0deg, #d7f5b0 72deg, #fde8a8 144deg, #ffd2ad 216deg, #ffbfc0 288deg, #ffc9d7 360deg)'
                    }}
                />

                <svg className="absolute bottom-0 left-1/2 h-24 w-48 -translate-x-1/2" viewBox="0 0 200 100" aria-hidden="true">
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="25%" stopColor="#84cc16" />
                            <stop offset="50%" stopColor="#eab308" />
                            <stop offset="75%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                    </defs>
                    <path d="M 20 95 A 80 80 0 0 1 180 95" fill="none" stroke={`url(#${gradientId})`} strokeWidth="12" strokeLinecap="round" />
                </svg>

                <div
                    className="absolute bottom-0 left-1/2 h-20 w-1 -translate-x-1/2 rounded-full bg-gray-800 transition-transform duration-1000 ease-out dark:bg-gray-100"
                    style={{ transform: `translateX(-50%) rotate(${animatedNeedleAngle}deg)`, transformOrigin: 'bottom center' }}
                >
                    <div className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-gray-800 dark:bg-gray-100" />
                </div>

                <div className="absolute bottom-0 left-1/2 h-8 w-8 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-gray-800 bg-surface-light shadow-md dark:border-gray-100 dark:bg-surface-dark" />
            </div>

            <div className="mt-4 text-center">
                <div className={`text-5xl font-extrabold ${riskStyle.color}`}>{safeRiskScore}</div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Risk Score</div>
            </div>

            <div className={`mt-4 rounded-full border-2 px-7 py-3 text-base font-extrabold tracking-wide shadow-md bg-gradient-to-r text-white ${riskStyle.gradient} ${riskStyle.borderColor}`}>
                <span className="flex items-center gap-2">
                    <span className="relative flex h-3.5 w-3.5">
                        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${riskStyle.bgColor}`} />
                        <span className={`relative inline-flex h-3.5 w-3.5 rounded-full border border-white/70 bg-white ${riskStyle.color}`} />
                    </span>
                    {riskLevelLabel}
                </span>
            </div>
        </div>
    );
};

export default RiskGauge;
