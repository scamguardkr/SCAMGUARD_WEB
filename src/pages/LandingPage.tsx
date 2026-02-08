import { Link } from 'react-router-dom';
import {
    ShieldAlert,
    Zap,
    Users,
    CheckCircle,
    Brain,
    Database
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background text-gray-900 font-sans">
            {/* Header */}
            <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <ShieldAlert className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold tracking-tight">ScamGuard</span>
                    </div>
                    <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
                        <a href="#features" className="hover:text-primary">기능</a>
                        <a href="#how-it-works" className="hover:text-primary">작동 방식</a>
                        <a href="#pricing" className="hover:text-primary">요금</a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Link to="/login">
                            <Button variant="ghost" size="sm">로그인</Button>
                        </Link>
                        <Link to="/register">
                            <Button size="sm">무료 시작</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="pt-32 pb-24 px-6">
                <div className="container mx-auto text-center max-w-4xl">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
                        의심스러운 순간,<br />
                        <span className="text-primary">AI가 먼저 경고합니다</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        ScamGuard는 최신 사기 데이터를 학습한 AI로<br />
                        문자·대화·통화 내용을 분석해 사기 위험을 수치로 보여줍니다.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/register">
                            <Button size="lg" className="px-10 h-12 text-lg">
                                무료로 분석 시작
                                <Zap className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="outline" size="lg" className="px-10 h-12 text-lg">
                                왜 다른가요?
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mockup Image Placeholder */}
            <div className="mt-16 relative mx-auto max-w-5xl rounded-xl border bg-gray-50/50 p-4 shadow-2xl animate-in fade-in zoom-in duration-1000 delay-500">
                <div className="aspect-[16/9] rounded-lg bg-white border flex items-center justify-center text-gray-400">
                    {/* Replace with actual dashboard screenshot */}
                    <div className="text-center">
                        <ShieldAlert className="h-16 w-16 mx-auto mb-4 text-gray-200" />
                        <span className="text-lg">ScamGuard Analysis Dashboard Mockup</span>
                    </div>
                </div>
            </div>

            {/* Features */}
            <section id="features" className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <SectionHeader
                        title="사기를 분석하는 방식이 다릅니다"
                        subtitle="단순 요약이 아닌, 근거 기반 AI 판단"
                    />
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Brain className="h-8 w-8 text-primary" />}
                            title="AI 위험도 분석"
                            description="사기 가능성을 단순 경고가 아닌 퍼센트 수치와 근거로 제공합니다."
                        />
                        <FeatureCard
                            icon={<Database className="h-8 w-8 text-primary" />}
                            title="최신 사기 데이터"
                            description="뉴스·공공 데이터·사용자 제보로 구축된 실시간 사기 인텔리전스 DB."
                        />
                        <FeatureCard
                            icon={<Users className="h-8 w-8 text-primary" />}
                            title="집단지성 네트워크"
                            description="한 명의 제보가 모두를 보호하는 선순환 구조."
                        />
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="py-24">
                <div className="container mx-auto px-6">
                    <SectionHeader
                        title="ScamGuard는 이렇게 작동합니다"
                        subtitle="3단계로 끝나는 사기 분석"
                    />
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <Step
                            step="01"
                            title="대화 입력"
                            desc="의심되는 문자, 채팅, 통화 내용을 입력하세요."
                        />
                        <Step
                            step="02"
                            title="AI 분석"
                            desc="AI가 최신 사기 사례와 의미 기반으로 비교 분석합니다."
                        />
                        <Step
                            step="03"
                            title="위험도 결과"
                            desc="사기 유형·유사 사례·위험 신호를 명확히 제시합니다."
                        />
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <SectionHeader
                        title="요금 안내"
                        subtitle="지금은 무료, 더 강력한 기능은 준비 중입니다"
                    />
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free */}
                        <PricingCard
                            title="Free"
                            price="₩0"
                            desc="개인 사용자를 위한 기본 사기 분석"
                            features={[
                                '텍스트 사기 분석',
                                'AI 위험도 제공',
                                '유사 사기 사례 조회',
                                '분석 기록 저장'
                            ]}
                            highlight
                        />

                        {/* Pro */}
                        <PricingCard
                            title="Pro"
                            price="Coming Soon"
                            desc="더 강력한 보호를 원하는 사용자를 위해"
                            features={[
                                '멀티모달 분석 (음성·이미지)',
                                '실시간 경고',
                                '고급 리포트',
                                '우선 지원'
                            ]}
                            disabled
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-12 border-t">
                <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} ScamGuard. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

/* ---------- Components ---------- */

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
    </div>
);

const FeatureCard = ({ icon, title, description }: any) => (
    <div className="bg-white p-8 rounded-2xl border shadow-sm">
        <div className="mb-6 bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const Step = ({ step, title, desc }: any) => (
    <div>
        <div className="text-primary font-bold text-4xl mb-4">{step}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{desc}</p>
    </div>
);

const PricingCard = ({ title, price, desc, features, highlight, disabled }: any) => (
    <div
        className={`rounded-2xl border p-8 bg-white ${highlight ? 'border-primary shadow-lg' : ''
            } ${disabled ? 'opacity-60' : ''}`}
    >
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-3xl font-extrabold mb-4">{price}</p>
        <p className="text-gray-600 mb-6">{desc}</p>
        <ul className="space-y-3 mb-8">
            {features.map((f: string) => (
                <li key={f} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    {f}
                </li>
            ))}
        </ul>
        {!disabled && (
            <Link to="/register">
                <Button className="w-full">시작하기</Button>
            </Link>
        )}
        {disabled && (
            <Button className="w-full" variant="outline" disabled>
                준비 중
            </Button>
        )}
    </div>
);

export default LandingPage;