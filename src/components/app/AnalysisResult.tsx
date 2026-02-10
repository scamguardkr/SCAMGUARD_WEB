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
            {/* Main Risk Assessment Card */}
            <MainRiskCard
                riskAssessment={riskAssessment}
                scamClassification={scamClassification}
                analysisSummary={analysisSummary}
                analysisDetails={analysisDetails}
            />

            {/* Detected Signals */}
            <DetectedSignals detectedSignals={detectedSignals} />

            {/* Psychological Tactics */}
            <PsychologicalTactics psychologicalTactics={psychologicalTactics} />

            {/* Similar Cases */}
            <SimilarCases similarCases={similarCases} />

            {/* Recommendations */}
            <Recommendations recommendation={recommendation} />

            {/* Disclaimer */}
            <Disclaimer />
        </div>
    );
};

export default AnalysisResult;
