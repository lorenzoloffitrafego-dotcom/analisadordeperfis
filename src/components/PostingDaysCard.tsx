import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LabelList } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PostingDaysCardProps {
  profiles: Record<string, Record<string, any>>;
  profileNames: string[];
  getLabel: (key: string) => string;
  getFoto: (key: string) => string | undefined;
}

const DAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const BASE_COLOR = "#F97455";

function getPostsByDay(profile: Record<string, any>): number[] {
  const counts = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i <= 9; i++) {
    const raw = profile[`post${i}`];
    if (!raw || raw === 0) continue;
    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (parsed?.data_postagem) {
        const date = new Date(parsed.data_postagem + "T12:00:00");
        if (!isNaN(date.getTime())) {
          counts[date.getDay()]++;
        }
      }
    } catch {}
  }
  return counts;
}

function getBarColor(value: number, max: number): string {
  if (value === 0 || max === 0) return "transparent";
  const ratio = value / max;
  // Interpolate opacity/saturation: lighter for small, darker for max
  const lightness = 55 - ratio * 15; // 55% -> 40%
  const saturation = 70 + ratio * 20; // 70% -> 90%
  return `hsl(14, ${saturation}%, ${lightness}%)`;
}

const PostingDaysCard = ({ profiles, profileNames, getLabel, getFoto }: PostingDaysCardProps) => {
  const [account, setAccount] = useState(profileNames[0] || "meu_perfil");

  const profile = profiles[account] || {};
  const counts = getPostsByDay(profile);
  const max = Math.max(...counts);

  const chartData = DAY_LABELS.map((day, i) => ({
    day,
    posts: counts[i],
  }));

  // Table data: only days with posts, sorted desc
  const tableData = chartData
    .filter((d) => d.posts > 0)
    .sort((a, b) => b.posts - a.posts);

  return (
    <div
      className="rounded-2xl border border-[hsl(220,15%,14%)]/50 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm p-6 flex flex-col"
      style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.5)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-[#F97455]" />
          <h3 className="font-display font-bold text-sm">Dia das Postagens</h3>
        </div>
        <Select value={account} onValueChange={setAccount}>
          <SelectTrigger className="w-[180px] h-8 text-xs border-[hsl(220,15%,14%)] bg-[hsl(220,20%,6%)]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {profileNames.map((name) => (
              <SelectItem key={name} value={name} className="text-xs">
                <div className="flex items-center gap-2">
                  {getFoto(name) && (
                    <img
                      src={`https://images.weserv.nl/?url=${encodeURIComponent(getFoto(name) || "")}`}
                      className="w-5 h-5 rounded-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  )}
                  {getLabel(name)}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-[180px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 5, left: 5, bottom: 0 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215,15%,50%)", fontSize: 11, fontWeight: 600 }}
            />
            <Bar dataKey="posts" radius={[6, 6, 0, 0]} maxBarSize={36}>
              <LabelList
                dataKey="posts"
                position="top"
                style={{ fill: "hsl(210,40%,85%)", fontSize: 12, fontWeight: 700 }}
                formatter={(v: number) => (v === 0 ? "" : v)}
              />
              {chartData.map((entry, idx) => (
                <Cell
                  key={idx}
                  fill={getBarColor(entry.posts, max)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      {tableData.length > 0 && (
        <div className="rounded-xl overflow-hidden border border-[hsl(220,15%,14%)]/50">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[hsl(220,15%,14%)] bg-[hsl(220,20%,5%)]/80">
                <th className="py-2.5 px-4 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-[hsl(215,15%,45%)]">Dia</th>
                <th className="py-2.5 px-4 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-[hsl(215,15%,45%)]">Posts</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr
                  key={row.day}
                  className="border-b border-[hsl(220,15%,10%)] last:border-b-0 transition-all duration-200 hover:bg-[hsl(230,30%,12%)]/60"
                >
                  <td className="py-2.5 px-4 text-xs font-medium">{row.day}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span
                      className="font-display text-sm font-bold"
                      style={{ color: idx === 0 ? "#F97455" : "hsl(215,15%,60%)" }}
                    >
                      {row.posts}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PostingDaysCard;
