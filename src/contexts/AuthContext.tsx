import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { authApi } from '../api/auth';
import type { LoginRequest, RegisterRequest, UserProfile } from '../api/types';


interface AuthContextType {
    user: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const token = Cookies.get('accessToken');
            if (token) {
                const profile = await authApi.getProfile();
                setUser(profile.data);
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const login = async (data: LoginRequest) => {
        const response = await authApi.login(data);
        const { accessToken, refreshToken } = response.data;

        Cookies.set('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);

        // Fetch profile after login to get name/email
        await fetchProfile();
    };

    const register = async (data: RegisterRequest) => {
        const response = await authApi.register(data);
        const { accessToken, refreshToken } = response.data;

        Cookies.set('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);

        await fetchProfile();
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            Cookies.remove('accessToken');
            sessionStorage.removeItem('refreshToken');
            setUser(null);
            // Redirect handled by component or router
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
