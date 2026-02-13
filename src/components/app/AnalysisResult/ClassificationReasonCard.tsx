import React from 'react';
import { ShieldAlertIcon } from 'lucide-react';
import type { LlmScamAnalysisResultV2, RiskLevelV2 } from '@/types/scam-analysis';
import { scamTypeLabels } from './constants';

interface ClassificationReasonCardProps {
    riskLevel: RiskLevelV2;
    scamClassification: LlmScamAnalysisResultV2['scamClassification'];
}

// const riskLevelStyles: Record<RiskLevelV2, { backgroundImage: string; borderColor: string }> = {
//     SAFE: {
//         backgroundImage: 'linear-gradient(to top, #dcfce7 0%, #f0fdf4 65%, #ffffff 100%)',
//         borderColor: '#86efac'
//     },
//     LOW: {
//         backgroundImage: 'linear-gradient(to top, #dbeafe 0%, #eff6ff 65%, #ffffff 100%)',
//         borderColor: '#93c5fd'
//     },
//     MODERATE: {
//         backgroundImage: 'linear-gradient(to top, #fef3c7 0%, #fffbeb 65%, #ffffff 100%)',
//         borderColor: '#fcd34d'
//     },
//     HIGH: {
//         backgroundImage: 'linear-gradient(to top, #ffedd5 0%, #fff7ed 65%, #ffffff 100%)',
//         borderColor: '#fdba74'
//     },
//     CRITICAL: {
//         backgroundImage: 'linear-gradient(to top, #fee2e2 0%, #fff1f2 65%, #ffffff 100%)',
//         borderColor: '#fca5a5'
//     }
// };

const ClassificationReasonCard: React.FC<ClassificationReasonCardProps> = ({ riskLevel, scamClassification }) => {
    // const cardStyle = riskLevelStyles[riskLevel];

    return (
        <div className="rounded-xl p-5 border border-red-100" style={{
            background: 'linear-gradient(to right, #fef2f2, #fff7ed)'
        }}>
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 bg-white flex-shrink-0 items-center justify-center rounded-xl shadow-sm">
                    <ShieldAlertIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white">
                            유형: {scamTypeLabels[scamClassification.scamType] || scamClassification.scamType}
                        </span>
                        {scamClassification.scamSubType && (
                            <span className="rounded-full border border-primary bg-white/95 px-3 py-1 text-sm font-medium text-primary">
                                {scamClassification.scamSubType}
                            </span>
                        )}
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                        {scamClassification.classificationReason}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClassificationReasonCard;
