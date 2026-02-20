import { useState } from "react";
import { useHabits, TimeOfDay } from "@/hooks/useHabits";
import { HabitCard } from "@/components/HabitCard";
import { AddHabitModal } from "@/components/AddHabitModal";
import { Sidebar } from "@/components/Sidebar";
import { Plus, Flame, CheckCircle2, TrendingUp, Search, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Index = () => {
  const {
    habits,
    loading,
    addHabit,
    editHabit,
    deleteHabit,
    toggleCompletion,
    isCompletedToday,
    getWeeklyData,
  } = useHabits();

  const [addOpen, setAddOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"All Habits" | TimeOfDay>("All Habits");

  const habitsCount = habits.length;
  const completedTodayCount = habits.filter(isCompletedToday).length;
  const currentStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0;
  const longestStreak = habits.length > 0 ? Math.max(...habits.map(h => h.longestStreak)) : 0;

  const filteredHabits = habits.filter(h => {
    if (activeTab === "All Habits") return true;
    return h.timeOfDay === activeTab;
  });

  const completionRate = habitsCount > 0 ? Math.round((completedTodayCount / habitsCount) * 100) : 0;

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#f5f7f8] custom-scrollbar pb-20 lg:pb-0">
        {/* Top bar */}
        <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="lg:hidden w-12" /> {/* Spacer for menu button */}
            <div className="relative w-96 max-w-[180px] sm:max-w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 font-bold" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-50 border-none rounded-2xl pl-10 pr-4 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-primary/5 transition-all outline-none font-medium placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative group">
              <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-2xl transition-all">
                <Bell className="h-5 w-5" />
              </button>
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-streak text-[8px] font-black text-primary flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                2
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-slate-200">
              <div className="text-right hidden md:block">
                <p className="text-[10px] font-black text-slate-800 leading-none">Jeswin Madona</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Pro level</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-sm">
                <img src="https://i.pravatar.cc/150?u=darren" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full space-y-6 sm:space-y-10 pb-24">
          {/* Dynamic Hero Section */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-800 mb-1">Welcome back, Darren!</h1>
            <p className="text-slate-500 font-bold text-sm sm:text-lg">
              {habitsCount === 0
                ? "Ready to start your first habit today?"
                : habitsCount === completedTodayCount
                  ? "Amazing! You've completed all habits."
                  : `You have ${habitsCount - completedTodayCount} habits left today.`}
            </p>
          </div>

          {/* Real Featured Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {/* Dynamic Streak Card */}
            <Card className="bg-primary text-white border-none overflow-hidden relative shadow-2xl shadow-primary/20 rounded-[2rem] sm:rounded-[2.5rem] group hover:scale-[1.01] transition-transform duration-500">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[1.75rem] bg-white/10 flex items-center justify-center border border-white/10 shadow-inner group-hover:rotate-3 transition-transform">
                    <Flame className="h-10 w-10 sm:h-12 sm:w-12 text-streak fill-streak filter drop-shadow-[0_0_10px_rgba(255,223,102,0.6)]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Current Streak</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-6xl font-black tracking-tighter">{currentStreak}</span>
                      <span className="text-lg sm:text-2xl font-black opacity-60">Days</span>
                    </div>
                  </div>
                </div>
                {/* Real Weekly Data Row - Mobile Scrollable */}
                <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
                  <div className="flex justify-between items-center min-w-[300px] mb-6 sm:mb-8 pt-6 sm:pt-8 border-t border-white/10">
                    {(() => {
                      const topHabit = habits.reduce((prev, curr) => (prev.streak > curr.streak) ? prev : curr, habits[0]);
                      const weekly = topHabit ? getWeeklyData(topHabit) : Array(7).fill(null).map((_, i) => ({
                        day: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][i],
                        dayNum: new Date(Date.now() - (6 - i) * 86400000).getDate(),
                        completed: false
                      }));

                      return ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => {
                        const dayData = weekly[i];
                        const isToday = i === 6;
                        return (
                          <div key={i} className="flex flex-col items-center gap-2 sm:gap-3">
                            <span className="text-[8px] sm:text-[10px] font-black text-white/40 uppercase">{day}</span>
                            <div className={cn(
                              "w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500",
                              dayData?.completed
                                ? "bg-success text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                : isToday
                                  ? "bg-streak text-primary scale-110 shadow-xl"
                                  : "bg-white/5 text-white/30 border border-white/5"
                            )}>
                              {dayData?.completed ? (
                                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 stroke-[3px]" />
                              ) : (
                                <span className="text-[10px] sm:text-xs font-black">{dayData?.dayNum}</span>
                              )}
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                <div className="bg-black/20 backdrop-blur-md text-center py-4 sm:py-5 rounded-[1.5rem] sm:rounded-3xl border border-white/5">
                  <div className="mx-6 sm:mx-8 h-2 sm:h-2.5 bg-white/10 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-success shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-1000 ease-out" style={{ width: `${completionRate}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overall Progress Card */}
            <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 group">
              <CardContent className="p-6 sm:p-8 h-full flex flex-col items-center">
                <h3 className="text-[10px] font-black text-slate-400 mb-6 sm:mb-8 uppercase tracking-[0.2em] self-start">Daily Progress</h3>
                <div className="relative w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-slate-50" />
                    <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="264%" strokeDashoffset={`${264 - (264 * completionRate) / 100}%`} className="text-primary transition-all duration-1000 ease-in-out" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl sm:text-6xl font-black text-slate-800 tracking-tighter">{completionRate}<span className="text-xl sm:text-2xl font-black opacity-20">%</span></span>
                  </div>
                </div>
                <div className="mt-6 sm:mt-10 text-center space-y-2">
                  <p className="text-2xl sm:text-3xl font-black text-slate-800">{completedTodayCount}/{habitsCount} <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Today</span></p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Habits Grid section */}
          <div className="space-y-6 sm:space-y-8 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800">Daily Habits</h2>
              <div className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-2xl border border-slate-200/50 shadow-inner overflow-x-auto scrollbar-hide py-1">
                {["All Habits", "morning", "afternoon", "evening"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={cn(
                      "px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-[11px] font-black capitalize transition-all duration-300 whitespace-nowrap",
                      activeTab === tab ? "bg-white text-primary shadow-md" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-28 sm:h-32 bg-white rounded-[2rem] animate-pulse shadow-sm" />
                ))}
              </div>
            ) : filteredHabits.length === 0 ? (
              <div className="text-center py-16 sm:py-28 bg-white rounded-[2.5rem] sm:rounded-[3.5rem] border-2 border-dashed border-slate-200 shadow-inner">
                <TrendingUp className="h-12 w-12 text-slate-200 mx-auto mb-6" />
                <h3 className="text-xl sm:text-2xl font-black text-slate-800">No habits yet</h3>
                <button onClick={() => setAddOpen(true)} className="mt-8 px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30">
                  CREATE HABIT
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                {filteredHabits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    isCompletedToday={isCompletedToday(habit)}
                    onToggleToday={() => toggleCompletion(habit.id)}
                    onEdit={(name, emoji, color, timeOfDay) => editHabit(habit.id, name, emoji, color, timeOfDay)}
                    onDelete={() => deleteHabit(habit.id)}
                  />
                ))}
                <button
                  onClick={() => setAddOpen(true)}
                  className="col-span-1 sm:col-span-2 py-6 sm:py-8 bg-white/50 border-2 border-dashed border-slate-200 text-slate-400 font-black rounded-3xl hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center gap-4 mt-2"
                >
                  <Plus className="h-6 w-6 stroke-[4px]" />
                  ADD NEW HABIT
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <AddHabitModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={(name, emoji, color, timeOfDay) => addHabit(name, emoji, color, timeOfDay)}
        mode="add"
      />
    </div>
  );
};

export default Index;
