import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { User, Bell, Shield, Palette, Globe, Trash2, LogOut, ChevronRight, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const sections = [
        {
            title: "Account",
            items: [
                { icon: User, label: "Profile Information", sub: "Name, email, and avatar", action: true },
                { icon: Shield, label: "Security", sub: "Password and authentication", action: true },
            ]
        },
        {
            title: "Preferences",
            items: [
                { icon: Bell, label: "Reminders", sub: "Daily habit notifications", toggle: true, value: notifications, setter: setNotifications },
                { icon: Palette, label: "Appearance", sub: "Theme and color system", toggle: true, value: darkMode, setter: setDarkMode },
                { icon: Globe, label: "Language", sub: "English (US)", action: true },
            ]
        },
        {
            title: "Data & Privacy",
            items: [
                { icon: Trash2, label: "Clear Local Data", sub: "Erase all progress and habits", danger: true },
            ]
        }
    ];

    return (
        <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#f5f7f8] custom-scrollbar pb-20 lg:pb-0">
                <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden w-12" />
                        <h1 className="text-lg sm:text-xl font-black text-slate-800">Settings</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                            <img src="https://i.pravatar.cc/150?u=darren" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-8 max-w-3xl mx-auto w-full space-y-6 sm:space-y-10 pb-20">
                    {/* User Profile Summary */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 p-6 sm:p-8 bg-white rounded-2xl sm:rounded-[3rem] shadow-xl shadow-slate-200/50">
                        <div className="relative">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-inner">
                                <img src="https://i.pravatar.cc/150?u=darren" alt="Darren" className="w-full h-full object-cover" />
                            </div>
                            <button className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 bg-primary text-white rounded-lg sm:rounded-2xl flex items-center justify-center border-2 sm:border-4 border-white shadow-lg">
                                <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-800">Darren Hunt</h2>
                            <p className="text-slate-400 font-bold uppercase text-[8px] sm:text-[10px] tracking-widest mt-1">Premium Member since 2024</p>
                            <div className="flex gap-2 mt-3 justify-center sm:justify-start">
                                <span className="px-2.5 py-0.5 bg-success/10 text-success text-[8px] sm:text-[10px] font-black rounded-full uppercase tracking-tighter">ELITE</span>
                                <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[8px] sm:text-[10px] font-black rounded-full uppercase tracking-tighter">PRO</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {sections.map((section, idx) => (
                            <div key={idx} className="space-y-3">
                                <h3 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-4">{section.title}</h3>
                                <div className="space-y-1.5 sm:space-y-2">
                                    {section.items.map((item, i) => (
                                        <Card key={i} className={cn(
                                            "border-none shadow-sm rounded-xl sm:rounded-3xl bg-white overflow-hidden transition-all hover:shadow-md",
                                            item.danger && "hover:bg-red-50"
                                        )}>
                                            <div className="p-4 sm:p-5 flex items-center justify-between">
                                                <div className="flex items-center gap-3 sm:gap-4">
                                                    <div className={cn(
                                                        "w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center",
                                                        item.danger ? "bg-red-500/10 text-red-500" : "bg-slate-50 text-slate-400"
                                                    )}>
                                                        <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                                    </div>
                                                    <div>
                                                        <p className={cn("font-bold text-slate-800 text-sm sm:text-base", item.danger && "text-red-500")}>{item.label}</p>
                                                        <p className="text-[10px] sm:text-xs font-medium text-slate-400">{item.sub}</p>
                                                    </div>
                                                </div>
                                                {item.toggle ? (
                                                    <div onClick={() => item.setter?.(!item.value)} className="cursor-pointer scale-75 sm:scale-100">
                                                        <Switch checked={item.value} />
                                                    </div>
                                                ) : (
                                                    <button className="p-2 text-slate-300 hover:text-slate-800 transition-colors">
                                                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-4 sm:py-6 flex items-center justify-center gap-2 sm:gap-3 bg-slate-800 text-white font-black rounded-xl sm:rounded-[2.5rem] shadow-xl hover:opacity-90 transition-all text-xs sm:text-base">
                        <LogOut className="h-5 w-5 sm:h-6 sm:w-6" />
                        SIGNOUT
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Settings;
