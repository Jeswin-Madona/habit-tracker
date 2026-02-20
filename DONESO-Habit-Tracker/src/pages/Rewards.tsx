import { useHabits } from "@/hooks/useHabits";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Award, Star, Flame, Trophy, Lock, Rocket, Coffee, Heart, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Rewards = () => {
    const { habits } = useHabits();

    const totalCompletions = habits.reduce((acc, h) => acc + h.completedDates.length, 0);
    const maxStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0;

    const milestones = [
        { title: "Day One", desc: "Start your first habit", reached: habits.length > 0, icon: Rocket, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Weekly Warrior", desc: "Reach a 7-day streak", reached: maxStreak >= 7, icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
        { title: "Habit Master", desc: "Complete 100 sessions", reached: totalCompletions >= 100, icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
        { title: "Consistency King", desc: "Maintain 3 active habits", reached: habits.filter(h => h.streak > 0).length >= 3, icon: Trophy, color: "text-indigo-500", bg: "bg-indigo-500/10" },
        { title: "Zen Garden", desc: "Reach 30 days of meditation", reached: habits.some(h => h.name.toLowerCase().includes('meditat') && h.streak >= 30), icon: Heart, color: "text-pink-500", bg: "bg-pink-500/10" },
        { title: "Night Owl", desc: "Complete an evening habit", reached: habits.some(h => h.timeOfDay === 'evening' && h.completedDates.length > 0), icon: Coffee, color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    return (
        <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#f5f7f8] custom-scrollbar pb-20 lg:pb-0">
                <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden w-12" />
                        <h1 className="text-lg sm:text-xl font-black text-slate-800">Hall of Fame</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-yellow-500 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-white" />
                            2,450 XP
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full space-y-6 sm:space-y-10 pb-20">
                    {/* Progress Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                        <Card className="bg-slate-800 text-white border-none rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 relative overflow-hidden shadow-2xl">
                            <div className="relative z-10 space-y-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Rank</p>
                                <h2 className="text-3xl sm:text-5xl font-black tracking-tighter">Gold Tier</h2>
                                <div className="flex items-center gap-4 pt-2 sm:pt-4">
                                    <div className="flex -space-x-3 sm:-space-x-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-800 overflow-hidden bg-slate-700">
                                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                            </div>
                                        ))}
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-800 bg-primary flex items-center justify-center text-[8px] sm:text-[10px] font-black">
                                            +42
                                        </div>
                                    </div>
                                    <p className="text-[10px] sm:text-xs font-bold text-slate-400">Join 42 others in Gold</p>
                                </div>
                            </div>
                            <Trophy className="absolute -bottom-10 -right-10 h-48 w-48 sm:h-64 sm:w-64 text-slate-700 opacity-20 -rotate-12" />
                        </Card>

                        <Card className="border-none rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 bg-white shadow-xl shadow-slate-200/50">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Level Milestone</h3>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl sm:text-3xl font-black text-slate-800">Level 8</span>
                                <span className="text-[10px] sm:text-xs font-black text-slate-400">1,250 / 2,000 XP</span>
                            </div>
                            <div className="h-4 sm:h-5 bg-slate-100 rounded-full overflow-hidden shadow-inner p-1">
                                <div className="h-full bg-primary rounded-full shadow-lg" style={{ width: '65%' }} />
                            </div>
                            <p className="text-[10px] sm:text-xs font-bold text-slate-400 mt-4 italic">Finish your next habit to level up!</p>
                        </Card>
                    </div>

                    {/* Milestones Grid */}
                    <div className="space-y-6 sm:space-y-8">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-800">Milestones</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {milestones.map((m, i) => (
                                <Card key={i} className={cn(
                                    "border-none rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 transition-all duration-500 relative overflow-hidden group",
                                    m.reached ? "bg-white shadow-xl" : "bg-slate-50 opacity-60 grayscale"
                                )}>
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className={cn("w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", m.bg)}>
                                            <m.icon className={cn("h-6 w-6 sm:h-7 sm:w-7", m.color)} />
                                        </div>
                                        <h4 className="text-base sm:text-lg font-black text-slate-800 mb-2">{m.title}</h4>
                                        <p className="text-xs sm:text-sm font-medium text-slate-500">{m.desc}</p>
                                        <div className="mt-8 flex items-center justify-between">
                                            {m.reached ? (
                                                <div className="flex items-center gap-1.5 text-success font-black text-[10px] uppercase tracking-widest">
                                                    <CheckCircle2 className="h-3.5 w-3.5" /> REACHED
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                                                    <Lock className="h-3.5 w-3.5" /> LOCKED
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Rewards;
