import { useState } from "react";
import { Habit, TimeOfDay } from "@/hooks/useHabits";
import { AddHabitModal } from "./AddHabitModal";
import { Check, MoreVertical, Pencil, Trash2, Calendar, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HabitCardProps {
  habit: Habit;
  isCompletedToday: boolean;
  onToggleToday: () => void;
  onEdit: (name: string, emoji: string, color: string, timeOfDay: TimeOfDay) => void;
  onDelete: () => void;
}

export function HabitCard({
  habit,
  isCompletedToday,
  onToggleToday,
  onEdit,
  onDelete,
}: HabitCardProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100 flex items-center justify-between group hover:border-primary/20 transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="flex items-center gap-4">
          {/* Status Indicator / Icon */}
          <div
            className={cn(
              "w-12 h-12 rounded-[1rem] flex items-center justify-center transition-all duration-300",
              isCompletedToday
                ? "bg-success text-white shadow-lg shadow-success/20"
                : "bg-slate-100 text-slate-400"
            )}
          >
            {isCompletedToday ? (
              <Check className="h-6 w-6 stroke-[3px]" />
            ) : (
              <span className="text-xl grayscale opacity-50">{habit.emoji}</span>
            )}
          </div>

          {/* Name and Time */}
          <div>
            <h3 className={cn(
              "font-bold text-lg transition-all",
              isCompletedToday ? "text-slate-400 line-through decoration-2" : "text-slate-800"
            )}>
              {habit.name}
            </h3>
            <p className="text-xs font-bold text-slate-400 capitalize tracking-wider">{habit.timeOfDay}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl border-none shadow-elevated p-1">
              <DropdownMenuItem onClick={() => setEditOpen(true)} className="flex items-center gap-2 rounded-lg py-2 font-medium">
                <Pencil className="h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="flex items-center gap-2 rounded-lg py-2 font-medium text-destructive focus:text-destructive">
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Checkbox */}
          <button
            onClick={onToggleToday}
            className={cn(
              "w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
              isCompletedToday
                ? "bg-success border-success text-white"
                : "bg-white border-slate-200 hover:border-primary"
            )}
          >
            {isCompletedToday && <Check className="h-4 w-4 stroke-[3px]" />}
          </button>
        </div>
      </div>

      <AddHabitModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={onEdit}
        initial={{
          name: habit.name,
          emoji: habit.emoji,
          color: habit.color,
          timeOfDay: habit.timeOfDay
        }}
        mode="edit"
      />
    </>
  );
}
