// Common Response Wrapper
export interface CommonResponse<T> {
    status: string;
    data: T;
    errorCode: string | null;
    errorMessage: string | null;
    fieldErrors: FieldErrorResponse[] | null;
}

export interface FieldErrorResponse {
    field: string;
    constraint: string;
    message: string;
}

// Data Models
export interface AuthResult {
    userId: number;
    accessToken: string;
    refreshToken: string;
}

export interface UserProfile {
    userId: number;
    userEmail: string;
    name: string;
    role: string;
}

// Request Models
export interface LoginRequest {
    loginId: string;
    loginPw: string;
}

export interface RegisterRequest {
    loginId: string;
    loginPw: string;
    name: string;
    email: string;
}

// Response Types (Aliases for convenience)
export type AuthResponse = CommonResponse<AuthResult>;
export type ProfileResponse = CommonResponse<UserProfile>;
// export type RefreshResponse = CommonResponse<AuthResult>;

// Scam/Analysis Models
export interface AvailableModelsResponse {
    models: string[];
}

export interface ScamAnalysisRequest {
    prompt: string;
}

export type RiskLevel = "NONE" | "LOW" | "SUSPICIOUS" | "DANGEROUS" | "VERY_DANGEROUS";

// export interface ScamAnalysisResponse {
//     risk_level: RiskLevel;
//     similarity_score: number;
//     scam_type: string;
//     detected_risks: DetectedRisk[];
//     similar_case: SimilarCase;
//     analysis_details: AnalysisDetails;
// }

export interface DetectedRisk {
    name: string;
    description: string;
}

export interface SimilarCase {
    name: string;
    information: string;
}

export interface AnalysisDetails {
    model: string;
    analysisTime: string; // LocalDateTime string
    totalProcessingTimeMs: number;
}

// V2 Document Collection Request
export interface ScamDocumentV2Request {
    scamTitle: string;
    scamType: string;
    scamSubType: string;
    occurredPeriod: string;
    targetProfile: string;
    contactChannel: string;
    scamScenario: {
        step: number;
        phase: string;
        description: string;
    }[];
    keyPhrases: string[];
    psychologicalTactics: string[];
    financialMechanism: string;
    damageScale: string;
    redFlags: {
        signal: string;
        description: string;
    }[];
    preventionTips: string[];
    vectorContent: string;
    sourceUrl: string;
    publishedDate: string;
}

// History API Responses
export interface ScamAnalysisHistoryPageResponse {
    contents: ScamAnalysisHistoryListResponse[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export interface ScamAnalysisHistoryListResponse {
    documentId: string;
    scamType: string;
    createdAt: string;
}

// // Detail API Response
// export interface ScamAnalysisDetailResponse {
//     documentId: string;
//     userId: number;
//     prompt: string;
//     aiModel: string;
//     riskLevel: RiskLevel;
//     similarityScore: number;
//     scamType: string;
//     detectedRisks: DetectedRisk[]; // Reusing DetectedRisk if structure matches, else create DetectedRiskDetail
//     similarCase: SimilarCase;       // Reusing SimilarCase
//     analysisDetails: AnalysisDetails; // Reusing AnalysisDetails
//     createdAt: string;
// }
