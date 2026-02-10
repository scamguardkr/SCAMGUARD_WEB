import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, MessageSquare, LogOut, Send, Paperclip, Mic, Image as ImageIcon, Zap, Bot } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { getAvailableModels, analyzeScamV2, getUserAnalyzeReportList, getUserDetailAnalyzeReportV2 } from '@/api/scam';
import { Dropdown } from '@/components/ui/Dropdown';
import type { ScamAnalysisHistoryListResponse } from '@/api/types';
import type { LlmScamAnalysisResultV2, AnalysisDetails } from '@/types/scam-analysis';
import AnalysisResult from '@/components/app/AnalysisResult';
import AnalysisSidebar from '@/components/app/AnalysisSidebar';


const AnalysisPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [analysisResult, setAnalysisResult] = useState<LlmScamAnalysisResultV2 | null>(null);
    const [analysisDetails, setAnalysisDetails] = useState<AnalysisDetails | null>(null);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [availableModels, setAvailableModels] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [historyList, setHistoryList] = useState<ScamAnalysisHistoryListResponse[]>([]);

    const loadingSteps = [
        "텍스트 패턴 분석 중...",
        "위험 신호 탐지 중...",
        "심리 전술 분석 중...",
        "유사 사례 매칭 중...",
        "종합 위험도 평가 중...",
        "최종 리포트 생성 중..."
    ];

    // Fetch History
    const fetchHistory = async () => {
        try {
            const response = await getUserAnalyzeReportList(1, 20);
            if (response.status === 'success') {
                setHistoryList(response.data.contents);
            }
        } catch (error) {
            console.error("Failed to fetch history", error);
        }
    };

    // Initialize & Fetch Logic
    useEffect(() => {
        // Fetch Models
        const fetchModels = async () => {
            try {
                const response = await getAvailableModels();
                if (response.status === 'success' && response.data.models.length > 0) {
                    setAvailableModels(response.data.models);
                    if (!selectedModel) setSelectedModel(response.data.models[0]);
                }
            } catch (error) {
                console.error("Failed to fetch models", error);
                setAvailableModels(["OPENAI", "DEEPSEEK_R1_0528", "LLAMA_3_1_405B"]);
                if (!selectedModel) setSelectedModel("OPENAI");
            }
        };
        fetchModels();
        fetchHistory();
    }, []);


    // Handle ID change (Detail View vs New Analysis)
    useEffect(() => {
        if (id) {
            // Detail View Mode
            const fetchDetail = async () => {
                setAnalysisResult(null);
                setAnalysisDetails(null);
                setMessages([]);
                setInput('');
                try {
                    const response = await getUserDetailAnalyzeReportV2(id);
                    if (response.status === 'success') {
                        const data = response.data;
                        // V2 응답 데이터 사용
                        if (data.analysisSummary) {
                            // LLM 분석 결과가 있는 경우
                            setInput(data.prompt.substring(0, 100) + '...');
                            setAnalysisResult({
                                analysisSummary: data.analysisSummary,
                                riskAssessment: data.riskAssessment,
                                scamClassification: data.scamClassification,
                                detectedSignals: data.detectedSignals,
                                psychologicalTactics: data.psychologicalTactics,
                                similarCases: data.similarCases,
                                recommendation: data.recommendation
                            });
                            if (data.analysisDetails) {
                                setAnalysisDetails(data.analysisDetails);
                            }
                            setMessages([
                                { role: 'user', content: data.prompt },
                                { role: 'assistant', content: '분석 결과입니다.' }
                            ]);
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch detail", error);
                    navigate('/app');
                }
            };
            fetchDetail();
        } else {
            // New Analysis Mode
            resetState();
        }
    }, [id, navigate]);

    const resetState = () => {
        setAnalysisResult(null);
        setAnalysisDetails(null);
        setMessages([]);
        setInput('');
        setIsAnalyzing(false);
    };

    useEffect(() => {
        let interval: number;
        if (isAnalyzing) {
            setLoadingStep(0);
            interval = setInterval(() => {
                setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAnalyzing]);


    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isAnalyzing) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setAnalysisResult(null);
        setIsAnalyzing(true);

        try {
            // Call V2 API
            const response = await analyzeScamV2({ prompt: userMessage }, selectedModel);

            if (response.status === 'success' && response.data.isValidAnalysis && response.data.analysisResult) {
                setAnalysisResult(response.data.analysisResult);
                if (response.data.analysisDetails) {
                    setAnalysisDetails(response.data.analysisDetails);
                }
                setMessages(prev => [...prev, { role: 'assistant', content: '분석이 완료되었습니다. 아래 상세 리포트를 확인해주세요.' }]);
                fetchHistory(); // Refresh sidebar history

            } else {
                const errorMsg = response.data.invalidReason || response.errorMessage || '알 수 없는 오류가 발생했습니다.';
                setMessages(prev => [...prev, { role: 'assistant', content: `분석 실패: ${errorMsg}` }]);
            }

        } catch (error) {
            console.error("Analysis failed", error);
            setMessages(prev => [...prev, { role: 'assistant', content: '죄송합니다. 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }]);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="flex h-screen bg-background font-sans overflow-hidden">
            {/* Sidebar */}
            <AnalysisSidebar
                historyList={historyList}
                currentId={id}
                onNewAnalysis={() => navigate('/app')}
                onHistoryItemClick={(id) => navigate(`/app/${id}`)}
                user={user}
                onLogout={async () => {
                    await logout();
                    navigate('/');
                }}
            />


            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-white">
                {/* Header (Mobile only menu trigger could go here) */}
                <header className="h-14 border-b md:hidden flex items-center px-4 justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="h-5 w-5 text-primary" />
                        <span className="font-bold">ScamGuard</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={logout}>
                        <LogOut className="h-5 w-5" />
                    </Button>
                </header>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-8 max-w-2xl mx-auto text-center px-4 animate-in fade-in zoom-in duration-500">
                            <div className="bg-primary/10 p-4 rounded-full">
                                <ShieldAlert className="h-12 w-12 text-primary" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold">
                                무엇이 의심되시나요?
                            </h2>
                            <p className="text-gray-500">
                                사기 의심 상황을 텍스트로 입력해주세요!<br />
                                방대한 사기 인텔리전스 데이터를 바탕으로 AI가 즉시 분석해드립니다.
                            </p>

                            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
                                <CardExample
                                    icon={<MessageSquare className="h-5 w-5 text-blue-500" />}
                                    title="문자 메시지 분석"
                                    desc="받은 문자를 복사해서 붙여넣으세요."
                                    onClick={() => setInput("엄마 나 폰 고장났어 편의점 상품권 좀 사다줘")}
                                />
                                <CardExample
                                    icon={<ImageIcon className="h-5 w-5 text-purple-500" />}
                                    title="이미지 분석"
                                    desc="캡처한 이미지를 드래그하거나 업로드하세요."
                                    onClick={() => { }}
                                />
                                <CardExample
                                    icon={<Mic className="h-5 w-5 text-green-500" />}
                                    title="통화 내용 분석"
                                    desc="통화 녹음 파일을 분석합니다."
                                    onClick={() => { }}
                                />
                                <CardExample
                                    icon={<Zap className="h-5 w-5 text-yellow-500" />}
                                    title="최근 사기 패턴 검색"
                                    desc="최근 유행하는 사기 수법을 확인하세요."
                                    onClick={() => setInput("최근 유행하는 스미싱 수법 알려줘")}
                                />
                            </div> */}
                        </div>
                    ) : (
                        <div className="space-y-6 max-w-4xl mx-auto pb-10">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={cn("flex gap-4", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                    {msg.role === 'assistant' && (
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                            <ShieldAlert className="h-5 w-5 text-primary" />
                                        </div>
                                    )}
                                    <div className={cn(
                                        "px-5 py-3 rounded-2xl max-w-[80%] whitespace-pre-wrap leading-relaxed shadow-sm",
                                        msg.role === 'user'
                                            ? "bg-primary text-white rounded-tr-none"
                                            : "bg-gray-100 text-gray-800 rounded-tl-none border"
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {isAnalyzing && (
                                <div className="flex justify-start gap-4 animate-in fade-in slide-in-from-bottom-2">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 animate-pulse">
                                        <Bot className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="bg-white border rounded-2xl rounded-tl-none p-4 shadow-sm max-w-md w-full">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
                                            </div>
                                            <span className="text-sm font-medium text-primary animate-pulse">
                                                {loadingSteps[loadingStep]}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                                                style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!isAnalyzing && analysisResult && (
                                <AnalysisResult result={analysisResult} analysisDetails={analysisDetails || undefined} />
                            )}
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t bg-white">
                    <div className="max-w-3xl mx-auto relative flex flex-col gap-2">

                        <form onSubmit={handleSend} className="relative flex items-end gap-2 bg-gray-50 border rounded-xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            {/* Model Selection Dropdown Trigger */}
                            <Dropdown
                                options={availableModels}
                                value={selectedModel}
                                onChange={setSelectedModel}
                                direction="up"
                                disabled={!!id || isAnalyzing || !!analysisResult}
                                trigger={
                                    <Button
                                        disabled={!!id || isAnalyzing || !!analysisResult}
                                        type="button"
                                        variant="ghost"
                                        className={cn(
                                            "h-10 px-3 flex items-center gap-2 rounded-lg text-gray-500 hover:text-gray-700 transition-colors",
                                            selectedModel ? "bg-primary/5 text-primary border border-primary/20" : ""
                                        )}
                                    >
                                        <Bot className="h-5 w-5" />
                                        <span className="text-xs font-medium hidden sm:inline">{selectedModel || "모델 선택"}</span>
                                    </Button>
                                }

                            />

                            <Button disabled={!!id || isAnalyzing || !!analysisResult} type="button" variant="ghost" size="icon" className="h-10 w-10 rounded-lg text-gray-500 hover:text-gray-700">
                                <Paperclip className="h-5 w-5" />
                            </Button>
                            <textarea
                                className="flex-1 bg-transparent border-none resize-none focus:ring-0 p-2.5 min-h-[44px] max-h-32 text-gray-900 placeholder:text-gray-400 leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder={id ? "과거 분석 기록입니다." : (analysisResult ? "분석이 완료되었습니다. 새로운 분석을 시작하려면 상단 버튼을 눌러주세요." : "내용을 입력하거나 파일을 첨부하세요...")}
                                rows={1}
                                value={input}
                                disabled={!!id || isAnalyzing || !!analysisResult}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    e.target.style.height = 'auto';
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend(e);
                                    }
                                }}
                            />
                            {!id && !analysisResult && (
                                <Button
                                    type="submit"
                                    size="icon"
                                    className={cn("h-10 w-10 rounded-lg transition-all", input.trim() ? "bg-primary text-white" : "bg-gray-200 text-gray-400 hover:bg-gray-300")}
                                    disabled={!input.trim() || isAnalyzing}
                                >
                                    <Send className="h-4 w-4 ml-0.5" />
                                </Button>
                            )}
                        </form>
                        <p className="text-xs text-center text-gray-400 mt-2">
                            ScamGuard AI는 실수를 할 수 있습니다. 중요한 정보는 다시 확인하세요.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

interface CardExampleProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    onClick?: () => void;
}

const CardExample = ({ icon, title, desc, onClick }: CardExampleProps) => (
    <button onClick={onClick} className="p-4 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group">
        <div className="flex items-center gap-3 mb-2">
            {icon}
            <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{title}</span>
        </div>
        <p className="text-sm text-gray-500">{desc}</p>
    </button>
);

export default AnalysisPage;
