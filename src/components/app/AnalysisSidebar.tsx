import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Plus, MessageSquare, LogOut } from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';
import type { ScamAnalysisHistoryListResponse, UserProfile } from '@/api/types';


interface AnalysisSidebarProps {
    historyList: ScamAnalysisHistoryListResponse[];
    currentId?: string;
    onNewAnalysis: () => void;
    onHistoryItemClick: (id: string) => void;
    user: UserProfile | null;
    onLogout: () => void;
}

const AnalysisSidebar: React.FC<AnalysisSidebarProps> = ({
    historyList,
    currentId,
    onNewAnalysis,
    onHistoryItemClick,
    user,
    onLogout
}) => {
    const navigate = useNavigate();
    const isAdmin = user?.role === 'ADMIN';

    const handleDropdownChange = (value: string) => {
        if (value === '어드민') {
            navigate('/admin');
        } else if (value === '설정') {
            // Handle settings navigation if needed
            console.log('Settings clicked');
        }
    };

    const dropdownOptions = isAdmin ? ['설정', '어드민'] : ['설정'];

    return (
        <aside className="w-64 bg-gray-50 border-r flex flex-col hidden md:flex">
            <div className="p-4 border-b">
                <Button
                    className="w-full justify-start gap-2"
                    variant={!currentId ? "default" : "outline"}
                    onClick={onNewAnalysis}
                >
                    <Plus className="h-4 w-4" />
                    새로운 분석
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <p className="text-xs font-semibold text-gray-500 mb-2">최근 기록</p>
                {historyList.length === 0 && (
                    <div className="text-center py-4 text-xs text-gray-400">
                        기록이 없습니다.
                    </div>
                )}
                {historyList.map(item => (
                    <Button
                        key={item.documentId}
                        variant={currentId === item.documentId ? "secondary" : "ghost"}
                        className="w-full justify-start text-sm truncate h-auto py-2 font-normal text-gray-700"
                        onClick={() => onHistoryItemClick(item.documentId)}
                    >
                        <MessageSquare className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">{item.scamType || "분석 결과"}</span>
                    </Button>
                ))}
            </div>

            <div className="p-4 border-t bg-white">
                <Dropdown
                    options={dropdownOptions}
                    value=""
                    onChange={handleDropdownChange}
                    trigger={
                        <div className="flex items-center gap-3 mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors overflow-hidden">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                                {user?.name?.[0] || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user?.name || '사용자'}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.userEmail || 'user@example.com'}</p>
                            </div>
                        </div>
                    }
                    className="w-full"
                    direction="up"
                />
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={onLogout}
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    로그아웃
                </Button>
            </div>
        </aside>
    );
};

export default AnalysisSidebar;
