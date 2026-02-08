import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { ShieldAlert } from 'lucide-react';

const LoginPage = () => {
    const [loginId, setLoginId] = useState('');
    const [loginPw, setLoginPw] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login({ loginId, loginPw });
            navigate('/app');
        } catch (err: any) {
            console.error(err);
            setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md shadow-lg border-primary/20">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                        <ShieldAlert className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">로그인</CardTitle>
                    <CardDescription>
                        ScamGuard에 다시 오신 것을 환영합니다.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="loginId" className="text-sm font-medium text-gray-700">아이디</label>
                            <Input
                                id="loginId"
                                type="text"
                                placeholder="아이디를 입력하세요"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="loginPw" className="text-sm font-medium text-gray-700">비밀번호</label>
                            <Input
                                id="loginPw"
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                value={loginPw}
                                onChange={(e) => setLoginPw(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? '로그인 중...' : '로그인'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-gray-100 pt-6">
                    <p className="text-sm text-gray-500">
                        계정이 없으신가요?{' '}
                        <Link to="/register" className="text-primary font-medium hover:underline underline-offset-4">
                            회원가입
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
