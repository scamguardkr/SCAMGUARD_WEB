import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { ShieldAlert } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        loginId: '',
        loginPw: '',
        name: '',
        email: '',
    });
    const [error, setError] = useState('');
    const { register, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic Validation
        if (!formData.email.includes('@')) {
            setError('유효한 이메일 주소를 입력해주세요.');
            return;
        }
        if (formData.loginPw.length < 4) {
            setError('비밀번호는 4자 이상이어야 합니다.');
            return;
        }

        try {
            await register(formData);
            navigate('/app');
        } catch (err: any) {
            console.error(err);
            setError('회원가입에 실패했습니다. 아이디 중복 등을 확인해주세요.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
            <Card className="w-full max-w-md shadow-lg border-primary/20">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                        <ShieldAlert className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">회원가입</CardTitle>
                    <CardDescription>
                        ScamGuard와 함께 안전한 일상을 시작하세요.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="loginId" className="text-sm font-medium text-gray-700">아이디</label>
                            <Input
                                id="loginId"
                                name="loginId"
                                type="text"
                                placeholder="아이디"
                                value={formData.loginId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="loginPw" className="text-sm font-medium text-gray-700">비밀번호</label>
                            <Input
                                id="loginPw"
                                name="loginPw"
                                type="password"
                                placeholder="비밀번호"
                                value={formData.loginPw}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">이름</label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="실명"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">이메일</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? '가입 중...' : '회원가입'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-gray-100 pt-6">
                    <p className="text-sm text-gray-500">
                        이미 계정이 있으신가요?{' '}
                        <Link to="/login" className="text-primary font-medium hover:underline underline-offset-4">
                            로그인
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RegisterPage;
