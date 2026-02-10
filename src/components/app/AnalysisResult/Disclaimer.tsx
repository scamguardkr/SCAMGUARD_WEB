import React from 'react';
import { MessageSquareWarning } from 'lucide-react';

const Disclaimer: React.FC = () => {
    return (
        <div className="bg-gray-50 border rounded-xl p-4 flex gap-3 text-xs text-gray-500">
            <MessageSquareWarning className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
                이 분석 결과는 AI에 의해 생성되었으며 참고용으로만 사용하세요. 중요한 결정은 반드시
                관계 기관(경찰청 112, 금융감독원 1332, 한국인터넷진흥원 118)에 문의하시기 바랍니다.
                ScamGuard는 분석 결과의 법적 효력을 보장하지 않습니다.
            </p>
        </div>
    );
};

export default Disclaimer;
