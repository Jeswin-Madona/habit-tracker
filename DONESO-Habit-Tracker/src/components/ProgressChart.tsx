import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Habit } from "@/hooks/useHabits";

interface ProgressChartProps {
  habit: Habit;
  weeklyData: { day: string; date: string; completed: number }[];
  monthlyData: { week: string; completed: number; total: number }[];
}

export function ProgressChart({ habit, weeklyData, monthlyData }: ProgressChartProps) {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");

  const data = view === "weekly" ? weeklyData : monthlyData;
  const key = view === "weekly" ? "day" : "week";
  const valueKey = "completed";

  const completionRate =
    view === "weekly"
      ? Math.round((weeklyData.filter((d) => d.completed).length / 7) * 100)
      : Math.round((monthlyData.reduce((s, w) => s + w.completed, 0) / 28) * 100);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-card text-xs">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-muted-foreground">
            {payload[0].value} {view === "weekly" ? "day" : "days"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setView("weekly")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              view === "weekly"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            This week
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              view === "monthly"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            This month
          </button>
        </div>
        <span className="text-sm font-medium" style={{ color: habit.color }}>
          {completionRate}%
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={80}>
        <BarChart data={data} barSize={view === "weekly" ? 20 : 30}>
          <XAxis
            dataKey={key}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "hsl(215.4 16.3% 46.9%)" }}
          />
          <YAxis hide domain={[0, view === "weekly" ? 1 : 7]} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(38 20% 92%)" }} />
          <Bar dataKey={valueKey} radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  (view === "weekly" ? entry.completed : (entry as any).completed) > 0
                    ? habit.color
                    : "hsl(38 20% 90%)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
