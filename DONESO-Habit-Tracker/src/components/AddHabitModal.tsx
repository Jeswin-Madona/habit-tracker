import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimeOfDay } from "@/hooks/useHabits";
import { cn } from "@/lib/utils";

interface AddHabitModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, emoji: string, color: string, timeOfDay: TimeOfDay) => void;
  initial?: { name: string; emoji: string; color: string; timeOfDay: TimeOfDay };
  mode?: "add" | "edit";
}

const EMOJIS = ["🏃", "📚", "💧", "🧘", "🥗", "😴", "🏋️", "✍️", "🎯", "🎸", "🌿", "💊", "🧹", "🛁", "📝", "🚴"];
const COLORS = [
  "hsl(180 44% 21%)",
  "hsl(153 60% 45%)",
  "hsl(210 80% 50%)",
  "hsl(280 60% 55%)",
  "hsl(340 70% 55%)",
  "hsl(45 90% 50%)",
  "hsl(195 70% 45%)",
  "hsl(50 100% 64%)",
];

const TIMES: TimeOfDay[] = ["morning", "afternoon", "evening", "anytime"];

export function AddHabitModal({ open, onClose, onSave, initial, mode = "add" }: AddHabitModalProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "🎯");
  const [color, setColor] = useState(initial?.color ?? COLORS[0]);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(initial?.timeOfDay ?? "anytime");

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), emoji, color, timeOfDay);
    if (mode === "add") {
      setName("");
      setEmoji("🎯");
      setColor(COLORS[0]);
      setTimeOfDay("anytime");
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md sm:max-w-md bg-white border-none shadow-elevated rounded-[2rem] p-4 sm:p-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader className="px-2">
          <DialogTitle className="text-xl sm:text-2xl font-black text-slate-800">
            {mode === "add" ? "New Habit" : "Edit Habit"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 pt-2 px-2">
          {/* Name */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Habit Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Morning Meditation"
              className="bg-slate-50 border-slate-200 rounded-xl px-4 py-6 text-slate-800 placeholder:text-slate-300 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
          </div>

          {/* Time of Day */}
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Time of Day
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {TIMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeOfDay(t)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-bold border transition-all capitalize",
                    timeOfDay === t
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                      : "bg-white text-slate-500 border-slate-200 hover:border-primary/50"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Emoji picker */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Icon
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {EMOJIS.slice(0, 12).map((e) => (
                  <button
                    key={e}
                    onClick={() => setEmoji(e)}
                    className={cn(
                      "h-10 w-10 rounded-xl text-lg flex items-center justify-center transition-all",
                      emoji === e
                        ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Color picker */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Color
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={cn(
                      "h-8 w-8 rounded-full transition-all border-2 border-transparent",
                      color === c ? "scale-125 border-white shadow-lg ring-2 ring-primary" : "hover:scale-110"
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 italic">
            <span
              className="h-12 w-12 rounded-[1rem] flex items-center justify-center text-2xl shadow-sm"
              style={{ backgroundColor: color + "15", color: color }}
            >
              {emoji}
            </span>
            <div>
              <p className="text-xs font-bold text-slate-400 capitalize">{timeOfDay}</p>
              <p className="font-bold text-slate-800">{name || "Habit Preview"}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-bold rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!name.trim()}
              className="flex-1 bg-primary text-white font-bold py-6 rounded-2xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
            >
              {mode === "add" ? "Create Habit" : "Update Habit"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
