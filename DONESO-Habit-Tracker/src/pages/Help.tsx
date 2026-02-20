import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { HelpCircle, Search, Book, Zap, Shield, MessageSquare, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Help = () => {
    return (
        <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#f5f7f8] custom-scrollbar pb-20 lg:pb-0">
                <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden w-12" />
                        <h1 className="text-lg sm:text-xl font-black text-slate-800">Support Center</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                            <img src="https://i.pravatar.cc/150?u=darren" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full space-y-8 sm:space-y-12 pb-24">
                    {/* Support Hero */}
                    <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 pt-6 sm:pt-10">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-[1.5rem] sm:rounded-[2.5rem] bg-primary/5 flex items-center justify-center">
                            <HelpCircle className="h-8 w-8 sm:h-12 sm:w-12 text-primary animate-pulse" />
                        </div>
                        <div className="space-y-3 sm:space-y-4 w-full">
                            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-800">How can we help?</h2>
                            <div className="relative w-full max-w-xl mx-auto h-12 sm:h-16">
                                <input
                                    type="text"
                                    placeholder="Search guides..."
                                    className="w-full h-full bg-white rounded-xl sm:rounded-[1.5rem] px-10 sm:px-14 border-none shadow-xl shadow-slate-200/50 outline-none font-bold text-slate-800 text-sm sm:text-base focus:ring-2 focus:ring-primary/5 transition-all placeholder:text-slate-300"
                                />
                                <Search className="absolute left-3.5 sm:left-5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-300" />
                            </div>
                        </div>
                    </div>

                    {/* Guide Categories */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[
                            { icon: Book, title: "Start", color: "text-blue-500", bg: "bg-blue-500/10" },
                            { icon: Zap, title: "Pro", color: "text-orange-500", bg: "bg-orange-500/10" },
                            { icon: Shield, title: "Security", color: "text-purple-500", bg: "bg-purple-500/10" },
                        ].map((cat, i) => (
                            <Card key={i} className="border-none rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 bg-white shadow-sm group hover:shadow-xl transition-all cursor-pointer">
                                <div className="flex flex-col items-center text-center gap-2 sm:gap-4">
                                    <div className={cn("w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", cat.bg)}>
                                        <cat.icon className={cn("h-5 w-5 sm:h-7 sm:w-7", cat.color)} />
                                    </div>
                                    <h3 className="font-black text-slate-800 uppercase text-[8px] sm:text-[10px] tracking-widest">{cat.title}</h3>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                        <h3 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-4">Common Questions</h3>
                        <div className="space-y-3 sm:space-y-4">
                            {[
                                { q: "How are streaks calculated?", a: "Streaks increase for every consecutive day you complete a habit." },
                                { q: "Can I sync across devices?", a: "Yes, once you enable Cloud Sync in settings." },
                                { q: "What are XP and levels?", a: "Rewards for consistency that build your global standing." },
                            ].map((faq, i) => (
                                <Card key={i} className="border-none rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-white shadow-sm border border-slate-50">
                                    <h4 className="font-black text-slate-800 text-xs sm:text-base mb-2">{faq.q}</h4>
                                    <p className="text-[10px] sm:text-sm font-bold text-slate-500 leading-relaxed">{faq.a}</p>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Contact Card */}
                    <Card className="bg-primary border-none rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left justify-between gap-6">
                            <div className="space-y-2 sm:space-y-4">
                                <h3 className="text-xl sm:text-3xl font-black tracking-tight">Still need backup?</h3>
                                <p className="text-white/60 font-bold text-xs sm:text-base max-w-xs">Our squad is on standby 24/7 to help you smash your goals.</p>
                                <button className="px-6 py-2.5 sm:py-3 bg-white text-primary font-black text-[10px] sm:text-xs rounded-xl sm:rounded-2xl shadow-xl shadow-black/10 hover:scale-[1.02] transition-all">
                                    CONTACT CO-PILOT
                                </button>
                            </div>
                            <div className="hidden sm:block">
                                <MessageSquare className="h-16 w-16 sm:h-24 sm:w-24 text-white/10" />
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Help;
