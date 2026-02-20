import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Heart, Share2, Search, Flame, Award, Plus, Users, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const Community = () => {
    const posts = [
        {
            user: "Sarah Chen",
            avatar: "https://i.pravatar.cc/150?u=sarah",
            badge: "Streak Master",
            time: "12m ago",
            text: "Just hit my 30-day streak for Yoga! 🧘‍♀️ If you're struggling, remember that the hardest part is just showing up.",
            stats: { likes: 24, comments: 5, shares: 2 },
            achievement: "30 DAY STREAK",
        },
        {
            user: "Marcus Voe",
            avatar: "https://i.pravatar.cc/150?u=marcus",
            badge: "Early Bird",
            time: "1h ago",
            text: "Started the 5 AM club today. Who else is currently tracking 'Early Wake Up'?",
            stats: { likes: 56, comments: 12, shares: 4 },
        },
        {
            user: "Elena Rose",
            avatar: "https://i.pravatar.cc/150?u=elena",
            badge: "Consistency King",
            time: "3h ago",
            text: "Adding 'Reading' to my daily stack. Any book recommendations for productivity?",
            stats: { likes: 12, comments: 45, shares: 1 },
            achievement: "NEW HABIT ADDED",
        }
    ];

    return (
        <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#f5f7f8] custom-scrollbar pb-20 lg:pb-0">
                <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden w-12" />
                        <h1 className="text-lg sm:text-xl font-black text-slate-800">Community</h1>
                        <div className="hidden sm:flex items-center gap-4 ml-4">
                            <button className="text-primary font-black text-[10px] uppercase tracking-widest border-b-2 border-primary pb-1">Feed</button>
                            <button className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-800 pb-1">Global</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                            <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>
                    </div>
                </header>

                <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 pb-20">
                    {/* Feed Column */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* New Post Box */}
                        <Card className="border-none rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-6 bg-white shadow-sm flex gap-3 sm:gap-4 items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden shrink-0">
                                <img src="https://i.pravatar.cc/150?u=darren" alt="me" />
                            </div>
                            <input
                                type="text"
                                placeholder="Share your progress..."
                                className="flex-1 bg-slate-50 border-none rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-primary/5 transition-all"
                            />
                        </Card>

                        {posts.map((post, i) => (
                            <Card key={i} className="border-none rounded-[1.5rem] sm:rounded-[3rem] p-6 sm:p-8 bg-white shadow-xl shadow-slate-200/50 space-y-4 sm:space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-[1.25rem] overflow-hidden">
                                            <img src={post.avatar} alt={post.user} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-800 text-xs sm:text-base leading-tight">{post.user}</h4>
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <span className="text-[8px] sm:text-[10px] font-black text-primary uppercase tracking-tighter">{post.badge}</span>
                                                <span className="text-slate-200 text-xs">•</span>
                                                <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase">{post.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 text-slate-300 hover:text-slate-800 transition-colors">
                                        <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                </div>

                                <p className="text-slate-600 font-medium text-xs sm:text-base leading-relaxed">{post.text}</p>

                                {post.achievement && (
                                    <div className="bg-success/5 border border-success/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-success/10 flex items-center justify-center">
                                                <Flame className="h-5 w-5 sm:h-6 sm:w-6 text-success fill-success" />
                                            </div>
                                            <p className="text-[9px] sm:text-xs font-black text-success uppercase tracking-widest">{post.achievement}</p>
                                        </div>
                                        <Award className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
                                    </div>
                                )}

                                <div className="flex items-center gap-4 sm:gap-8 pt-4 border-t border-slate-50">
                                    <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors">
                                        <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span className="text-[10px] sm:text-xs font-black">{post.stats.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                                        <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span className="text-[10px] sm:text-xs font-black">{post.stats.comments}</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors ml-auto">
                                        <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Stats Widget */}
                        <Card className="border-none rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 bg-slate-800 text-white shadow-xl">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Trending Squads</h3>
                            <div className="space-y-4 sm:space-y-6">
                                {[
                                    { name: "5 AM Club", members: 1204, icon: "🌅" },
                                    { name: "Code Sprint", members: 856, icon: "💻" },
                                    { name: "Zen Masters", members: 2341, icon: "🧘" },
                                ].map((squad, i) => (
                                    <div key={i} className="flex items-center gap-3 sm:gap-4">
                                        <div className="text-xl sm:text-2xl">{squad.icon}</div>
                                        <div className="flex-1">
                                            <p className="font-bold text-xs sm:text-base">{squad.name}</p>
                                            <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase">{squad.members} Members</p>
                                        </div>
                                        <button className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[9px] sm:text-[10px] font-black">JOIN</button>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 sm:mt-8 py-2.5 sm:py-3 bg-white text-slate-800 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs">CREATE SQUAD</button>
                        </Card>

                        {/* Discovery Widget */}
                        <Card className="border-none rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 bg-white shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                <h3 className="font-black text-slate-800 text-sm sm:text-base">Global Heatmap</h3>
                            </div>
                            <div className="aspect-video bg-slate-50 rounded-xl sm:rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-slate-200 animate-pulse" />
                                <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase">Live Map Loading...</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Community;
