import { client } from './client';
import type { CommonResponse, AvailableModelsResponse, ScamAnalysisRequest, ScamAnalysisHistoryPageResponse, ScamDocumentV2Request } from './types';
import type { ScamAnalysisDetailResponseV2, ScamAnalysisResponseV2 } from "@/types/scam-analysis.ts";

export const getAvailableModels = async () => {
    const response = await client.get<CommonResponse<AvailableModelsResponse>>('/api/v1/scam/model/available');
    return response.data;
};

// export const analyzeScam = async (data: ScamAnalysisRequest, model: string) => {
//     const response = await client.post<CommonResponse<ScamAnalysisResponse>>(`/api/v1/scam/analyze?model=${model}`, data);
//     return response.data;
// };

export const analyzeScamV2 = async (data: ScamAnalysisRequest, model: string) => {
    const response = await client.post<CommonResponse<ScamAnalysisResponseV2>>(`/api/v2/scam/analyze?model=${model}`, data);
    return response.data;
};

export const getUserAnalyzeReportList = async (page: number = 1, limit: number = 10) => {
    const response = await client.get<CommonResponse<ScamAnalysisHistoryPageResponse>>(`/api/v2/scam/analyze/results`, {
        params: { page, limit }
    });
    return response.data;
};

// export const getUserDetailAnalyzeReport = async (id: string) => {
//     const response = await client.get<CommonResponse<ScamAnalysisDetailResponse>>(`/api/v1/scam/analyze/result/${id}`);
//     return response.data;
// };

export const getUserDetailAnalyzeReportV2 = async (id: string) => {
    const response = await client.get<CommonResponse<ScamAnalysisDetailResponseV2>>(`/api/v2/scam/analyze/result/${id}`);
    return response.data;
};

export const collectScamDocumentV2 = async (data: ScamDocumentV2Request) => {
    const response = await client.post<CommonResponse<void>>('/api/v2/scam/documents', data);
    return response.data;
};
