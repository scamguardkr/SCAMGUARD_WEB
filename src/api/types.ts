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
export type RefreshResponse = CommonResponse<AuthResult>;

// Scam/Analysis Models
export interface AvailableModelsResponse {
    models: string[];
}

export interface ScamAnalysisRequest {
    prompt: string;
}

export type RiskLevel = "NONE" | "LOW" | "SUSPICIOUS" | "DANGEROUS" | "VERY_DANGEROUS";
export type AiModelType = "GPT_5_NANO" | "DEEPSEEK_R1_0528" | "LLAMA_3_1_405B" | "GPT_OSS_120B";

export interface ScamAnalysisResponse {
    risk_level: RiskLevel;
    similarity_score: number;
    scam_type: string;
    detected_risks: DetectedRisk[];
    similar_case: SimilarCase;
    analysis_details: AnalysisDetails;
}

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
    analysis_time: string; // LocalDateTime string
    total_processing_time_ms: number;
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
    createdAt: string; // LocalDateTime
    riskLevel?: RiskLevel;
    similarityScore?: number;
}

// Detail API Response
export interface ScamAnalysisDetailResponse {
    documentId: string;
    userId: number;
    prompt: string;
    aiModel: AiModelType;
    riskLevel: RiskLevel;
    similarityScore: number;
    scamType: string;
    detectedRisks: DetectedRisk[]; // Reusing DetectedRisk if structure matches, else create DetectedRiskDetail
    similarCase: SimilarCase;       // Reusing SimilarCase
    analysisDetails: AnalysisDetails; // Reusing AnalysisDetails
    createdAt: string;
}
