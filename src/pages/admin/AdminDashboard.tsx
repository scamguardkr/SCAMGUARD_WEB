import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
    LayoutDashboard,
    FileText,
    Settings,
    ChevronRight,
    LogOut,
    Search,
    Bell,
    Menu,
    X,
    Shield
} from 'lucide-react';
import DocumentCollection from '@/components/admin/DocumentCollection';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('collection');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { id: 'dashboard', label: '대시보드', icon: LayoutDashboard, disabled: true },
        { id: 'collection', label: '문서 수집 V2', icon: FileText, disabled: false },
        { id: 'settings', label: '시스템 설정', icon: Settings, disabled: true },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-0"
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">ScamGuard <span className="text-blue-400">Admin</span></span>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                disabled={item.disabled}
                                onClick={() => setActiveTab(item.id)}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group text-sm",
                                    activeTab === item.id
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800",
                                    item.disabled && "opacity-40 cursor-not-allowed grayscale"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "group-hover:text-blue-400")} />
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                {activeTab === item.id && <ChevronRight className="w-4 h-4" />}
                                {item.disabled && <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">Soon</span>}
                            </button>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-slate-800">
                        <div className="bg-slate-800/50 rounded-2xl p-4 mb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
                                    {user?.name?.[0] || 'A'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate">{user?.name || '관리자'}</p>
                                    <p className="text-xs text-slate-500 truncate">{user?.role || 'ADMIN'}</p>
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-400/10 gap-3"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4" />
                            <span>관리자 로그아웃</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <h1 className="text-lg font-bold text-gray-800">
                            {menuItems.find(m => m.id === activeTab)?.label}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-3 py-1.5 border border-transparent focus-within:border-blue-500 transition-all">
                            <Search className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="데이터 검색..."
                                className="bg-transparent border-none focus:ring-0 text-sm w-48"
                            />
                        </div>
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="w-px h-6 bg-gray-200 mx-2"></div>
                        <Button
                            variant="default"
                            size="sm"
                            onClick={() => navigate('/app')}
                            className="rounded-xl"
                        >
                            분석 화면으로
                        </Button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {activeTab === 'collection' && <DocumentCollection />}
                        {activeTab === 'dashboard' && (
                            <div className="flex items-center justify-center h-[60vh] text-gray-400 flex-col gap-4">
                                <LayoutDashboard className="w-16 h-16 opacity-20" />
                                <p>준비 중인 화면입니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
