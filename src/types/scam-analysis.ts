export interface ScamAnalysisDetailResponseV2 {
  documentId: string;
  userId: number;
  prompt: string;
  // LLM 분석 결과 전체
  analysisSummary: string;

  riskAssessment: RiskAssessment;
  scamClassification: ScamClassification;
  detectedSignals: DetectedSignal[];
  psychologicalTactics: PsychologicalTactic[];
  similarCases: SimilarCaseV2[];
  recommendation: Recommendation;
  analysisDetails: AnalysisDetails
  createdAt: string;
}

export interface AnalysisDetails {
  model: string;
  analysisTime: string;
  totalProcessingTimeMs: number;
}

export interface ScamAnalysisResponseV2 {
  isValidAnalysis: boolean;
  analysisResult: LlmScamAnalysisResultV2 | null;
  analysisDetails: AnalysisDetails;
  invalidReason?: string | null;
}

// -----------------------------세부 타입----------------------

export interface LlmScamAnalysisResultV2 {
  analysisSummary: string;
  riskAssessment: RiskAssessment;
  scamClassification: ScamClassification;
  detectedSignals: DetectedSignal[];
  psychologicalTactics: PsychologicalTactic[];
  similarCases: SimilarCaseV2[];
  recommendation: Recommendation;
}

export interface RiskAssessment {
  riskLevel: RiskLevelV2;
  riskScore: number;        // 0~100
  confidenceLevel: number;  // 0~100
}

export type RiskLevelV2 = "SAFE" | "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface ScamClassification {
  scamType: ScamType;
  scamSubType: string;
  classificationReason: string;
}

export interface DetectedSignal {
  signalName: string;
  severity: Severity;
  evidenceQuote: string;
  explanation: string;
}

export type Severity = "HIGH" | "MEDIUM" | "LOW";

export interface PsychologicalTactic {
  tacticName: string;
  evidenceQuote: string;
  explanation: string;
}

export interface SimilarCaseV2 {
  caseTitle: string;
  similarityScore: number;     // 0~100
  matchedPatterns: string[];
  caseSource: string;          // URL 또는 출처 설명
}

export interface Recommendation {
  immediateActions: string[];
  reportingGuidance: string;
  preventionTips: string[];
}

export type ScamType =
  | "VOICE_PHISHING"
  | "SMISHING"
  | "PHISHING"
  | "INVESTMENT_FRAUD"
  | "ROMANCE_SCAM"
  | "IMPERSONATION"
  | "EMPLOYMENT_SCAM"
  | "SHOPPING_FRAUD"
  | "LOAN_FRAUD"
  | "RENTAL_FRAUD"
  | "CRYPTO_FRAUD"
  | "IDENTITY_THEFT"
  | "OTHER";