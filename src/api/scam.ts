import { client } from './client';
import type { CommonResponse, AvailableModelsResponse, ScamAnalysisRequest, ScamAnalysisResponse, ScamAnalysisHistoryPageResponse, ScamAnalysisDetailResponse } from './types';

export const getAvailableModels = async () => {
    const response = await client.get<CommonResponse<AvailableModelsResponse>>('/api/v1/scam/model/available');
    return response.data;
};

export const analyzeScam = async (data: ScamAnalysisRequest, model: string) => {
    const response = await client.post<CommonResponse<ScamAnalysisResponse>>(`/api/v1/scam/analyze?model=${model}`, data);
    return response.data;
};

export const getUserAnalyzeReportList = async (page: number = 1, limit: number = 10) => {
    const response = await client.get<CommonResponse<ScamAnalysisHistoryPageResponse>>(`/api/v1/scam/analyze/results`, {
        params: { page, limit }
    });
    return response.data;
};

export const getUserDetailAnalyzeReport = async (id: string) => {
    const response = await client.get<CommonResponse<ScamAnalysisDetailResponse>>(`/api/v1/scam/analyze/result/${id}`);
    return response.data;
};
