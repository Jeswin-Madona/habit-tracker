import { LayoutDashboard, CheckSquare, BarChart2, Award, Settings, Users, BookOpen, HelpCircle, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";
import { useHabits } from "@/hooks/useHabits";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function SidebarContent({ className, onItemClick }: { className?: string, onItemClick?: () => void }) {
    const { habits, isCompletedToday } = useHabits();
    const totalToday = habits.length;
    const completedToday = habits.filter(isCompletedToday).length;
    const progressPercent = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
        { icon: CheckSquare, label: "My Habits", to: "/" },
        { icon: BarChart2, label: "Statistics", to: "/statistics" },
        { icon: Award, label: "Rewards", to: "/rewards" },
        { icon: Users, label: "Community", to: "/community" },
        { icon: BookOpen, label: "Journal", to: "/journal" },
        { icon: Settings, label: "Settings", to: "/settings" },
        { icon: HelpCircle, label: "Help", to: "/help" },
    ];

    return (
        <div className={cn("bg-sidebar text-white flex flex-col h-full border-r border-white/5", className)}>
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/20 flex items-center justify-center p-1 border border-white/20">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-serif text-xl font-black tracking-tighter text-white uppercase italic">DONEZO</span>
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto scrollbar-hide">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.to}
                        onClick={onItemClick}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all border border-transparent"
                        activeClassName="bg-white/10 text-white shadow-xl shadow-black/10 border-white/10"
                    >
                        <item.icon className="h-4 w-4" />
                        <span className="font-bold text-xs tracking-wide">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 mt-auto mb-20 lg:mb-0">
                <div className="bg-white/5 rounded-[1.5rem] p-5 border border-white/10">
                    <div className="flex items-center gap-2 mb-3 text-streak brightness-150">
                        <BarChart2 className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Daily Progress</span>
                    </div>
                    <div className="flex items-baseline justify-between mb-2">
                        <span className="text-2xl font-black text-white tracking-tighter">{completedToday}/{totalToday}</span>
                        <span className="text-xs text-white/50 font-black">{progressPercent}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                        <div
                            className="h-full bg-streak shadow-[0_0_15px_rgba(255,223,102,0.4)] transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <p className="text-[10px] font-bold text-white/60 mb-4 tracking-tight">
                        {completedToday === totalToday && totalToday > 0 ? "Perfect day!" : "Keep moving forward!"}
                    </p>
                    <button className="w-full py-2.5 bg-white text-primary hover:bg-white/90 rounded-xl text-[10px] font-black transition-all shadow-xl shadow-black/20">
                        OPEN ANALYTICS
                    </button>
                </div>
            </div>
        </div>
    );
}

export function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col shrink-0 h-screen sticky top-0 overflow-hidden">
                <SidebarContent />
            </aside>

            {/* Mobile Nav Trigger */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <button className="p-3 bg-sidebar text-white rounded-2xl shadow-xl shadow-black/20 border border-white/10">
                            <Menu className="h-5 w-5" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 border-none w-72 bg-sidebar">
                        <SidebarContent onItemClick={() => setOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Mobile Bottom Nav */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center rounded-t-[2.5rem] shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                <NavLink to="/dashboard" className="p-2 text-slate-400" activeClassName="text-primary bg-primary/5 rounded-2xl">
                    <LayoutDashboard className="h-6 w-6" />
                </NavLink>
                <NavLink to="/" className="p-2 text-slate-400" activeClassName="text-primary bg-primary/5 rounded-2xl">
                    <CheckSquare className="h-6 w-6" />
                </NavLink>
                <NavLink to="/statistics" className="p-2 text-slate-400" activeClassName="text-primary bg-primary/5 rounded-2xl">
                    <BarChart2 className="h-6 w-6" />
                </NavLink>
                <NavLink to="/rewards" className="p-2 text-slate-400" activeClassName="text-primary bg-primary/5 rounded-2xl">
                    <Award className="h-6 w-6" />
                </NavLink>
                <NavLink to="/settings" className="p-2 text-slate-400" activeClassName="text-primary bg-primary/5 rounded-2xl">
                    <Settings className="h-6 w-6" />
                </NavLink>
            </div>
        </>
    );
}
