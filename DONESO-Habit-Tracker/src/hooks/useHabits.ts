import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "anytime";

export interface Habit {
  id: string;
  name: string;
  emoji: string;
  color: string;
  timeOfDay: TimeOfDay;
  createdAt: string;
  completedDates: string[]; // ISO date strings "YYYY-MM-DD"
  streak: number;
  longestStreak: number;
}

export function toDateStr(date: Date): string {
  // Use local time for the date string to ensure consistency with what user sees
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function calculateStreak(completedDates: string[]): { streak: number; longestStreak: number } {
  if (completedDates.length === 0) return { streak: 0, longestStreak: 0 };

  const sorted = [...new Set(completedDates)].sort((a, b) => b.localeCompare(a));
  const today = toDateStr(new Date());

  // Calculate yesterday correctly
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = toDateStr(yesterdayDate);

  let streak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  // Current streak check
  if (sorted[0] === today || sorted[0] === yesterday) {
    streak = 1;
    let checkDate = new Date(sorted[0].replace(/-/g, '/')); // replace for cross-browser compat
    for (let i = 1; i < sorted.length; i++) {
      const prevDate = new Date(checkDate);
      prevDate.setDate(prevDate.getDate() - 1);
      const prevDateStr = toDateStr(prevDate);

      if (sorted[i] === prevDateStr) {
        streak++;
        checkDate = prevDate;
      } else {
        break;
      }
    }
  }

  // Longest streak calculation
  for (let i = 1; i < sorted.length; i++) {
    const curr = new Date(sorted[i - 1].replace(/-/g, '/'));
    const prev = new Date(sorted[i].replace(/-/g, '/'));
    const diff = Math.round((curr.getTime() - prev.getTime()) / 86400000);

    if (diff === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  return { streak, longestStreak };
}

const STORAGE_KEY = "habit-tracker-data";

export function useHabits() {
  const { toast } = useToast();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from Local Storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Recalculate streaks on load to ensure accuracy
        const validated = parsed.map((h: Habit) => {
          const { streak, longestStreak } = calculateStreak(h.completedDates);
          return { ...h, streak, longestStreak };
        });
        setHabits(validated);
      } catch (e) {
        console.error("Failed to parse habits", e);
      }
    } else {
      setHabits([]);
    }
    setLoading(false);
  }, []);

  // Save to Local Storage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }
  }, [habits, loading]);

  const addHabit = useCallback((name: string, emoji: string, color: string, timeOfDay: TimeOfDay = "anytime") => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      emoji,
      color,
      timeOfDay,
      createdAt: new Date().toISOString(),
      completedDates: [],
      streak: 0,
      longestStreak: 0,
    };
    setHabits((prev) => [...prev, newHabit]);
    toast({ title: "Habit added!", description: `${name} has been created.` });
  }, [toast]);

  const editHabit = useCallback((id: string, name: string, emoji: string, color: string, timeOfDay?: TimeOfDay) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, name, emoji, color, timeOfDay: timeOfDay ?? h.timeOfDay } : h))
    );
    toast({ title: "Habit updated!" });
  }, [toast]);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    toast({ title: "Habit deleted" });
  }, [toast]);

  const toggleCompletion = useCallback((id: string, dateStr?: string) => {
    const todayStr = toDateStr(new Date());
    const targetDate = dateStr ?? todayStr;

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;

        const alreadyDone = h.completedDates.includes(targetDate);
        const updatedDates = alreadyDone
          ? h.completedDates.filter((d) => d !== targetDate)
          : [...h.completedDates, targetDate];

        const { streak, longestStreak } = calculateStreak(updatedDates);
        return { ...h, completedDates: updatedDates, streak, longestStreak };
      })
    );
  }, []);

  const isCompletedToday = useCallback(
    (habit: Habit) => habit.completedDates.includes(toDateStr(new Date())),
    []
  );

  const getWeeklyData = useCallback((habit: Habit) => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = toDateStr(d);
      days.push({
        day: d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0),
        date: dateStr,
        dayNum: d.getDate(),
        completed: habit.completedDates.includes(dateStr),
      });
    }
    return days;
  }, []);

  const getMonthlyData = useCallback((habit: Habit) => {
    const weeks: { week: string; completed: number; total: number }[] = [];
    for (let w = 3; w >= 0; w--) {
      let completed = 0;
      const weekEndDate = new Date();
      weekEndDate.setDate(weekEndDate.getDate() - (w * 7));

      for (let d = 0; d < 7; d++) {
        const checkDate = new Date(weekEndDate);
        checkDate.setDate(checkDate.getDate() - d);
        const date = toDateStr(checkDate);
        if (habit.completedDates.includes(date)) completed++;
      }
      weeks.push({ week: `Week ${4 - w}`, completed, total: 7 });
    }
    return weeks;
  }, []);

  return {
    habits,
    loading,
    addHabit,
    editHabit,
    deleteHabit,
    toggleCompletion,
    isCompletedToday,
    getWeeklyData,
    getMonthlyData,
    toDateStr,
  };
}
