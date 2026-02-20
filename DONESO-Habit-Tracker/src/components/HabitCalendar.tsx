import { useState } from "react";
import { Habit } from "@/hooks/useHabits";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HabitCalendarProps {
  habit: Habit;
  onToggle: (date: string) => void;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toDateStr(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function HabitCalendar({ habit, onToggle }: HabitCalendarProps) {
  const [viewDate, setViewDate] = useState(new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const today = toDateStr(new Date());

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="space-y-3">
      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <span className="font-medium text-sm text-foreground">
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((d) => (
          <div key={d} className="h-7 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">{d}</span>
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;

          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isCompleted = habit.completedDates.includes(dateStr);
          const isToday = dateStr === today;
          const isFuture = dateStr > today;

          return (
            <button
              key={dateStr}
              onClick={() => !isFuture && onToggle(dateStr)}
              disabled={isFuture}
              className={`h-8 w-full rounded-md text-xs font-medium transition-all ${
                isCompleted
                  ? "text-white scale-95"
                  : isToday
                  ? "bg-muted text-foreground ring-1 ring-streak hover:ring-2"
                  : isFuture
                  ? "text-muted-foreground/40 cursor-default"
                  : "text-foreground hover:bg-muted"
              }`}
              style={
                isCompleted
                  ? { backgroundColor: habit.color }
                  : undefined
              }
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
