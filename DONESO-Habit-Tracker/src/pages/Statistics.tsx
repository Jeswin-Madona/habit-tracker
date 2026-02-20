import { useHabits } from "@/hooks/useHabits";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Bell, TrendingUp, Award, Zap, BarChart3, Calendar } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";

const Statistics = () => {
    const { habits, getWeeklyData } = useHabits();

    // Aggregate weekly data for all habits
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyAggregated = days.map((day, i) => {
        let completed = 0;
        habits.forEach(habit => {
            const weekly = getWeeklyData(habit);
            if (weekly[i]?.completed) completed++;
        });
        return { name: day, completions: completed };
    });

    const totalCompletions = habits.reduce((acc, h) => acc + h.completedDates.length, 0);
    const averageStreak = habits.length > 0 ? Math.round(habits.reduce((acc, h) => acc + h.streak, 0) / habits.length) : 0;
    const bestHabit = habits.reduce((prev, curr) => (prev.longestStreak > curr.longestStreak) ? prev : curr, habits[0]);

    return (
        <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#f5f7f8] custom-scrollbar pb-20 lg:pb-0">
                <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden w-12" />
                        <h1 className="text-lg sm:text-xl font-black text-slate-800">Insight Analytics</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                            <img src="https://i.pravatar.cc/150?u=darren" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full space-y-6 sm:space-y-8 pb-20">
                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <Card className="border-none shadow-sm rounded-2xl sm:rounded-[2rem] bg-white p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/5 flex items-center justify-center">
                                    <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Done</p>
                                    <p className="text-xl sm:text-2xl font-black text-slate-800">{totalCompletions}</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="border-none shadow-sm rounded-2xl sm:rounded-[2rem] bg-white p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-500/5 flex items-center justify-center">
                                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Streak</p>
                                    <p className="text-xl sm:text-2xl font-black text-slate-800">{averageStreak}</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="border-none shadow-sm rounded-2xl sm:rounded-[2rem] bg-white p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-success/5 flex items-center justify-center">
                                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
                                </div>
                                <div>
                                    <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Best Habit</p>
                                    <p className="text-sm sm:text-lg font-black text-slate-800 truncate w-20 sm:w-24" title={bestHabit?.name}>{bestHabit?.name || "N/A"}</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="border-none shadow-sm rounded-2xl sm:rounded-[2rem] bg-white p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-500/5 flex items-center justify-center">
                                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</p>
                                    <p className="text-xl sm:text-2xl font-black text-slate-800">{habits.length}</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {/* Completion Chart */}
                        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] sm:rounded-[2.5rem] bg-white p-6 sm:p-8">
                            <h3 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 sm:mb-8">Weekly Completion Trend</h3>
                            <div className="h-[250px] sm:h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={weeklyAggregated}>
                                        <defs>
                                            <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                        />
                                        <RechartsTooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="completions"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorCompletions)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>

                        {/* Daily Distribution */}
                        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] sm:rounded-[2.5rem] bg-white p-6 sm:p-8">
                            <h3 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 sm:mb-8">Completions by Day</h3>
                            <div className="h-[250px] sm:h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyAggregated}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                        />
                                        <RechartsTooltip
                                            cursor={{ fill: '#f8fafc' }}
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Bar
                                            dataKey="completions"
                                            fill="hsl(var(--streak))"
                                            radius={[6, 6, 0, 0]}
                                            barSize={window.innerWidth < 640 ? 20 : 40}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>

                    {/* Detailed Leaderboard */}
                    <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] sm:rounded-[2.5rem] bg-white p-6 sm:p-8">
                        <h3 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 sm:mb-8">Habit Performance</h3>
                        <div className="space-y-2 sm:space-y-4">
                            {habits.sort((a, b) => b.streak - a.streak).map(h => (
                                <div key={h.id} className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl" style={{ backgroundColor: `${h.color}10` }}>
                                            {h.emoji}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-xs sm:text-base">{h.name}</p>
                                            <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase">{h.timeOfDay}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] sm:text-xl font-black text-slate-800">{h.streak}d</p>
                                        <div className="h-1 w-16 sm:w-24 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${Math.min(100, (h.streak / 30) * 100)}%` }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {habits.length === 0 && (
                                <p className="text-center py-10 text-slate-400 font-bold text-xs sm:text-sm">No habits data yet.</p>
                            )}
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Statistics;
