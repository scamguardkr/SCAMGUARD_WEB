import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (originalRequest.url?.includes('/auth/refresh') || originalRequest.url?.includes('/auth/login')) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = sessionStorage.getItem('refreshToken');

            if (refreshToken) {
                try {
                    // Use a new instance or direct axios to avoid interceptor loop
                    const { data } = await axios.post(`${API_URL}/api/v1/auth/refresh`, null, {
                        params: { refreshToken },
                    });

                    // Check for success status if needed, but for now assuming 200 OK means success
                    // or we should check data.status === 'success'

                    if (data.status === 'fail' || data.status === 'error') {
                        throw new Error(data.message || 'Refresh failed');
                    }

                    const { accessToken, refreshToken: newRefreshToken } = data.data;

                    Cookies.set('accessToken', accessToken);
                    sessionStorage.setItem('refreshToken', newRefreshToken);

                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return client(originalRequest);
                } catch (refreshError) {
                    // Refresh failed
                    Cookies.remove('accessToken');
                    sessionStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            } else {
                Cookies.remove('accessToken');
                sessionStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
