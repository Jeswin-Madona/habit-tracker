import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { BookOpen, Plus, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Journal = () => {
    const [entries] = useState([
        {
            id: 1,
            date: "Feb 20, 2024",
            title: "Morning Clarity",
            preview: "Finally hit my 10-day meditation streak. The focus and mental clarity I feel today is unparalleled. It's fascinating how a simple 10-minute ritual can reshape your entire perspective on productivity...",
            mood: "Serene",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400",
        },
        {
            id: 2,
            date: "Feb 18, 2024",
            title: "The 5 AM Experiment",
            preview: "Waking up before the world is quiet and empowering. I got more code done in 2 hours than I usually do in 6. The silicon silence is real...",
            mood: "Productive",
        },
        {
            id: 3,
            date: "Feb 15, 2024",
            title: "Consistency vs Perfection",
            preview: "Missed my water goal by 2 glasses but hit everything else. Perfection is the enemy of the good. tomorrow we bounce back stronger.",
            mood: "Reflective",
        }
    ]);

    return (
        <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#f5f7f8] custom-scrollbar pb-20 lg:pb-0">
                <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden w-12" />
                        <h1 className="text-lg sm:text-xl font-black text-slate-800">Mindful Journal</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-primary text-white rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                            <Plus className="h-4 w-4" />
                            NEW ENTRY
                        </button>
                    </div>
                </header>

                <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full space-y-6 sm:space-y-10 pb-20">
                    <Card className="bg-slate-800 text-white border-none rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="px-3 py-1 bg-white/10 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-300">Daily Reflection</div>
                                <Sparkles className="h-4 w-4 text-yellow-400" />
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-black tracking-tighter leading-tight">"Self-discipline is a form <br />of self-love."</h2>
                            <p className="text-slate-400 font-bold text-xs sm:text-base">- Reflect on your habits today.</p>
                        </div>
                        <BookOpen className="absolute -bottom-10 -right-10 h-48 w-48 sm:h-64 sm:w-64 text-slate-700 opacity-20 -rotate-12" />
                    </Card>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                        {entries.map((entry) => (
                            <Card key={entry.id} className="group border-none shadow-xl shadow-slate-200/50 rounded-[1.5rem] sm:rounded-[2.5rem] bg-white overflow-hidden hover:scale-[1.02] transition-all duration-500">
                                {entry.image && (
                                    <div className="h-40 sm:h-48 overflow-hidden">
                                        <img src={entry.image} alt={entry.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                )}
                                <div className="p-6 sm:p-8 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{entry.date}</span>
                                        <div className="px-2.5 py-1 bg-indigo-50 text-indigo-500 rounded-lg text-[9px] font-black uppercase tracking-widest">{entry.mood}</div>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-black text-slate-800 group-hover:text-primary transition-colors">{entry.title}</h3>
                                    <p className="text-xs sm:text-sm font-bold text-slate-500 line-clamp-3 leading-relaxed italic">"{entry.preview}"</p>
                                    <button className="pt-4 text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 group/btn">
                                        READ STORY
                                        <Plus className="h-3 w-3 group-hover/btn:rotate-90 transition-transform" />
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Journal;
