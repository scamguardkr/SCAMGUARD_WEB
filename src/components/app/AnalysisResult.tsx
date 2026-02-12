import React from 'react';
import type { LlmScamAnalysisResultV2, AnalysisDetails } from '@/types/scam-analysis';
import MainRiskCard from './AnalysisResult/MainRiskCard';
import DetectedSignals from './AnalysisResult/DetectedSignals';
import PsychologicalTactics from './AnalysisResult/PsychologicalTactics';
import SimilarCases from './AnalysisResult/SimilarCases';
import Recommendations from './AnalysisResult/Recommendations';
import Disclaimer from './AnalysisResult/Disclaimer';

export interface AnalysisResultProps {
    result: LlmScamAnalysisResultV2;
    analysisDetails?: AnalysisDetails;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, analysisDetails }) => {
    const {
        riskAssessment,
        scamClassification,
        detectedSignals,
        psychologicalTactics,
        similarCases,
        recommendation,
        analysisSummary
    } = result;

    return (
        <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* 메인 분석 리포트 컴포넌트 */}
            <MainRiskCard
                riskAssessment={riskAssessment}
                scamClassification={scamClassification}
                analysisSummary={analysisSummary}
                analysisDetails={analysisDetails}
            />

            {/* 탐지된 위협 신호 컴포넌트 */}
            <DetectedSignals detectedSignals={detectedSignals} />

            {/* 심리 전술 분석 컴포넌트 */}
            <PsychologicalTactics psychologicalTactics={psychologicalTactics} />

            {/* 유사 사기 사례 컴포넌트 */}
            <SimilarCases similarCases={similarCases} />

            {/* 대응 권고 컴포넌트 */}
            <Recommendations recommendation={recommendation} />

            {/* 면책 조항 컴포넌트 */}
            <Disclaimer />
        </div>
    );
};

export default AnalysisResult;
