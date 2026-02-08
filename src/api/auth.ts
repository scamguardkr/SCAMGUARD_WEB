import { client } from './client';
import type { AuthResponse, LoginRequest, ProfileResponse, RegisterRequest } from './types';

export const authApi = {
    login: async (data: LoginRequest) => {
        const response = await client.post<AuthResponse>('/api/v1/auth/login', data);
        return response.data;
    },

    register: async (data: RegisterRequest) => {
        const response = await client.post<AuthResponse>('/api/v1/auth/join', data);
        return response.data;
    },

    logout: async () => {
        // Usually no body for logout, but headers are handled by interceptor
        await client.post('/api/v1/auth/logout');
    },

    getProfile: async () => {
        const response = await client.get<ProfileResponse>('/api/v1/auth/profile');
        return response.data;
    },
};
