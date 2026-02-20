import { useHabits } from "@/hooks/useHabits";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Bell, Zap, Trophy, Target, Star, ChevronRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
    const { habits, isCompletedToday } = useHabits();

    const habitsCount = habits.length;
    const completedTodayCount = habits.filter(isCompletedToday).length;
    const totalStreaks = habits.reduce((acc, h) => acc + h.streak, 0);
    const completionRate = habitsCount > 0 ? Math.round((completedTodayCount / habitsCount) * 100) : 0;

    return (
        <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#f5f7f8] custom-scrollbar pb-20 lg:pb-0">
                <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden w-12" />
                        <h1 className="text-lg sm:text-xl font-black text-slate-800">Command Center</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                            <img src="https://i.pravatar.cc/150?u=darren" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full space-y-6 sm:space-y-8 pb-20">
                    {/* Hero Banner */}
                    <div className="bg-primary rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="space-y-4">
                                <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">Focus on your growth, <br />Darren Hunt.</h2>
                                <p className="text-white/60 font-bold text-xs sm:text-base max-w-md">Consistency: {completionRate}% this week. You're in the top 15%!</p>
                                <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-streak text-primary font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-xl shadow-black/10 hover:scale-105 transition-transform">
                                    VIEW FULL REPORT
                                </button>
                            </div>
                            <div className="hidden lg:block">
                                <Star className="h-40 w-40 text-streak fill-streak opacity-20 rotate-12" />
                            </div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
                    </div>

                    {/* Core Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
                        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] bg-white p-6 sm:p-8 group">
                            <div className="space-y-4 sm:space-y-6">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-orange-500 fill-orange-500" />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Streak Energy</h3>
                                    <p className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tighter">{totalStreaks}</p>
                                </div>
                                <div className="flex items-center gap-2 text-success font-black text-[10px]">
                                    <ChevronRight className="h-3 w-3 rotate-[-90deg]" />
                                    <span>+12% from yesterday</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] bg-white p-6 sm:p-8 group">
                            <div className="space-y-4 sm:space-y-6">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Target className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-500 fill-indigo-500" />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Completion Power</h3>
                                    <p className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tighter">{completionRate}<span className="text-xl sm:text-2xl opacity-20">%</span></p>
                                </div>
                                <div className="w-full h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500" style={{ width: `${completionRate}%` }} />
                                </div>
                            </div>
                        </Card>

                        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] bg-white p-6 sm:p-8 group sm:col-span-2 md:col-span-1">
                            <div className="space-y-4 sm:space-y-6">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-yellow-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Trophy className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-500 fill-yellow-500" />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Standing</h3>
                                    <p className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tighter">Elite</p>
                                </div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Next tier: Master @ 50 streaks</p>
                            </div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                        {/* Activity Suggestion */}
                        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] sm:rounded-[2.5rem] bg-white p-6 sm:p-8 relative overflow-hidden">
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-black text-slate-800">Smart Insights</h3>
                                    <Activity className="h-5 w-5 text-slate-300" />
                                </div>
                                <div className="space-y-4">
                                    {habits.length > 0 ? (
                                        <div className="p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                                            <p className="text-xs sm:text-sm font-bold text-slate-700">Evening energy is low.</p>
                                            <p className="text-[10px] sm:text-xs font-medium text-slate-500 mt-1">Try moving your coding habit to morning.</p>
                                        </div>
                                    ) : (
                                        <p className="text-slate-400 font-bold text-xs sm:text-sm">Add habits to get AI-powered insights!</p>
                                    )}
                                    <div className="p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                                        <p className="text-xs sm:text-sm font-bold text-slate-700">Consistency Alert!</p>
                                        <p className="text-[10px] sm:text-xs font-medium text-slate-500 mt-1">You've hit a 5-day streak on Meditation.</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Recent Wins */}
                        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] sm:rounded-[2.5rem] bg-white p-6 sm:p-8">
                            <h3 className="text-lg font-black text-slate-800 mb-6">Recent Wins</h3>
                            <div className="space-y-4">
                                {[
                                    { label: "Meditation Pro", time: "2 hours ago", icon: "🧘" },
                                    { label: "Water Champion", time: "5 hours ago", icon: "💧" },
                                    { label: "Early Bird", time: "Yesterday", icon: "☀️" },
                                ].map((win, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl sm:rounded-2xl transition-colors cursor-pointer">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-lg sm:text-xl shadow-sm">
                                            {win.icon}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-xs sm:text-sm">{win.label}</p>
                                            <p className="text-[9px] font-black text-slate-400 uppercase">{win.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
