import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Terminal, Copy, AlertCircle, CheckCircle, Upload } from 'lucide-react';
import { collectScamDocumentV2 } from '@/api/scam';
import { cn } from '@/lib/utils';

const DocumentCollection = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJsonInput(e.target.value);
        setError(null);
        setSuccess(false);
    };

    const handlePasteSample = () => {
        const sample = {
            "scamTitle": "화물차 투자 월 고정수익 보장 폰지형 사기",
            "scamType": "INVESTMENT_FRAUD",
            "scamSubType": "폰지형 투자사기",
            "occurredPeriod": "2017년~2022년",
            "targetProfile": "호남 지역 전·현직 교사 및 가족",
            "contactChannel": "지인 소개, 대면 영업",
            "scamScenario": [
                {
                    "step": 1,
                    "phase": "초기 접근",
                    "description": "운수업체 대표가 중개자를 통해 교사 집단에 접근, 화물차 투자 상품 제안"
                }
            ],
            "keyPhrases": ["화물차 매입에 투자하시면 매달 400만원씩 드립니다"],
            "psychologicalTactics": ["고정 수익 보장"],
            "financialMechanism": "폰지 구조",
            "damageScale": "163억원",
            "redFlags": [
                {
                    "signal": "비현실적 고수익 보장",
                    "description": "설명"
                }
            ],
            "preventionTips": ["확인 필수"],
            "vectorContent": "내용",
            "sourceUrl": "미제공",
            "publishedDate": "2026-01-15"
        };
        setJsonInput(JSON.stringify(sample, null, 2));
    };

    const handleSubmit = async () => {
        if (!jsonInput.trim()) {
            setError('JSON 데이터를 입력해주세요.');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            // Validate JSON
            const parsedData = JSON.parse(jsonInput);

            // Call API
            await collectScamDocumentV2(parsedData);

            setSuccess(true);
            setJsonInput('');
        } catch (err: any) {
            console.error('Failed to collect document:', err);
            if (err instanceof SyntaxError) {
                setError('올바른 JSON 형식이 아닙니다. 형식을 확인해주세요.');
            } else {
                setError(err.response?.data?.errorMessage || '문서 수집에 실패했습니다. 다시 시도해주세요.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">V2 문서 수집</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        새로운 사기 사례 데이터를 JSON 형태로 입력하여 수집 시스템에 추가합니다.
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePasteSample}
                    className="gap-2"
                >
                    <Copy className="w-4 h-4" />
                    샘플 JSON 붙여넣기
                </Button>
            </div>

            <Card className="p-0 overflow-hidden border-gray-200">
                <div className="bg-gray-50 px-4 py-2 border-b flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-gray-500" />
                    <span className="text-xs font-mono text-gray-600 uppercase tracking-wider">JSON Input Editor</span>
                </div>
                <div className="relative">
                    <textarea
                        value={jsonInput}
                        onChange={handleJsonChange}
                        placeholder=' 여기에 JSON 데이터를 붙여넣으세요... '
                        className={cn(
                            "w-full h-[500px] p-6 font-mono text-sm bg-white resize-none focus:outline-none transition-all duration-200",
                            error ? "bg-red-50/30" : "bg-white"
                        )}
                        spellCheck={false}
                    />

                    {error && (
                        <div className="absolute bottom-4 left-4 right-4 bg-red-50 border border-red-100 p-3 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="absolute bottom-4 left-4 right-4 bg-green-50 border border-green-100 p-3 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-green-700">문서가 성공적으로 수집되었습니다!</p>
                        </div>
                    )}
                </div>
            </Card>

            <div className="flex justify-end gap-3">
                <Button
                    variant="outline"
                    onClick={() => setJsonInput('')}
                    disabled={isLoading || !jsonInput}
                >
                    초기화
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !jsonInput}
                    className="gap-2 px-8"
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Upload className="w-4 h-4" />
                    )}
                    {isLoading ? '수집 중...' : '데이터 수집 시작'}
                </Button>
            </div>

            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    도움말
                </h4>
                <ul className="text-xs text-blue-800 space-y-1 ml-4 list-disc">
                    <li>V2 API 규격에 맞는 JSON 형식을 사용해야 합니다.</li>
                    <li>필수 필드가 누락되거나 타입이 맞지 않으면 오류가 발생할 수 있습니다.</li>
                    <li>한 번에 하나의 문서만 수집 가능합니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default DocumentCollection;
