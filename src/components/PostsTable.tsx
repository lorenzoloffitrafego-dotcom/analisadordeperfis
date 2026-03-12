import { useState } from "react";
import { ExternalLink, FileText, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PostData {
  tipo: string;
  views: number;
  likes: number;
  comentarios: number;
  thumbnail: string;
  url_post: string;
  data_postagem: string;
}

interface PostsTableProps {
  profiles: Record<string, Record<string, any>>;
  profileNames: string[];
  getLabel: (key: string) => string;
  getFoto: (key: string) => string | undefined;
}

function formatNum(n: number): string {
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return v % 1 === 0 ? `${v}M` : `${v.toFixed(1)}M`;
  }
  if (n >= 1_000) {
    const v = n / 1_000;
    return v % 1 === 0 ? `${v}K` : `${v.toFixed(1)}K`;
  }
  return String(n);
}

function formatDate(d: string): string {
  if (!d) return "—";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

const tipoBadge: Record<string, string> = {
  Reel: "bg-[#8B5CF6]/20 text-[#A78BFA] border-[#8B5CF6]/30",
  Imagem: "bg-[#3B82F6]/20 text-[#60A5FA] border-[#3B82F6]/30",
  Carrossel: "bg-[#F97316]/20 text-[#FB923C] border-[#F97316]/30",
};

function getPosts(perfil: Record<string, any>): PostData[] {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((i) => {
      const raw = perfil[`post${i}`];
      if (raw === null || raw === undefined || raw === 0) return null;
      try {
        return typeof raw === "string" ? JSON.parse(raw) : raw;
      } catch {
        return null;
      }
    })
    .filter(Boolean) as PostData[];
}

const GERAL = "__geral__";

type SortKey = "views" | "likes" | "comentarios" | "data_postagem" | null;
type SortDir = "asc" | "desc";

const PostsTable = ({ profiles, profileNames, getLabel, getFoto }: PostsTableProps) => {
  const [selected, setSelected] = useState(GERAL);
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const posts: { post: PostData; owner: string }[] = [];

  if (selected === GERAL) {
    profileNames.forEach((name) => {
      getPosts(profiles[name]).forEach((post) => posts.push({ post, owner: name }));
    });
  } else {
    getPosts(profiles[selected]).forEach((post) => posts.push({ post, owner: selected }));
  }

  if (sortKey) {
    posts.sort((a, b) => {
      let va: number, vb: number;
      if (sortKey === "data_postagem") {
        va = new Date(a.post.data_postagem || "1970-01-01").getTime();
        vb = new Date(b.post.data_postagem || "1970-01-01").getTime();
      } else {
        va = Number(a.post[sortKey]) || 0;
        vb = Number(b.post[sortKey]) || 0;
      }
      return sortDir === "desc" ? vb - va : va - vb;
    });
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDir === "desc") setSortDir("asc");
      else { setSortKey(null); setSortDir("desc"); }
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-30" />;
    return sortDir === "desc"
      ? <ArrowDown className="w-3 h-3 ml-1 text-[hsl(230,80%,70%)]" />
      : <ArrowUp className="w-3 h-3 ml-1 text-[hsl(230,80%,70%)]" />;
  };

  const thSortable = "py-3 px-4 text-right text-[10px] font-semibold uppercase tracking-wider text-[hsl(215,15%,45%)] cursor-pointer select-none hover:text-[hsl(210,40%,80%)] transition-colors";

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[hsl(230,80%,70%)]" />
          <h2 className="font-display text-xl font-bold">
            Posts dos últimos 3 meses
          </h2>
        </div>
        <Select value={selected} onValueChange={(v) => { setSelected(v); setSortKey(null); }}>
          <SelectTrigger className="w-[200px] h-8 text-xs border-[hsl(220,15%,14%)] bg-[hsl(220,20%,6%)]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={GERAL} className="text-xs">Geral</SelectItem>
            {profileNames.map((name) => (
              <SelectItem key={name} value={name} className="text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://images.weserv.nl/?url=${encodeURIComponent(getFoto(name) || "")}`}
                    className="w-5 h-5 rounded-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  {getLabel(name)}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-[hsl(220,15%,12%)] bg-[hsl(220,20%,8%)] p-8 text-center">
          <p className="text-[hsl(215,15%,45%)] text-sm">Sem posts nos últimos 3 meses</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden border border-[hsl(220,15%,12%)] bg-[hsl(220,20%,8%)]" style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.4)" }}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[hsl(220,15%,14%)] bg-[hsl(220,20%,6%)]">
                  <th className="py-3 px-4 text-left text-[10px] font-semibold uppercase tracking-wider text-[hsl(215,15%,45%)]">Post</th>
                  {selected === GERAL && (
                    <th className="py-3 px-4 text-left text-[10px] font-semibold uppercase tracking-wider text-[hsl(215,15%,45%)]">Conta</th>
                  )}
                  <th className={thSortable} onClick={() => handleSort("views")}>
                    <span className="inline-flex items-center justify-end">Views<SortIcon col="views" /></span>
                  </th>
                  <th className={thSortable} onClick={() => handleSort("likes")}>
                    <span className="inline-flex items-center justify-end">Likes<SortIcon col="likes" /></span>
                  </th>
                  <th className={thSortable} onClick={() => handleSort("comentarios")}>
                    <span className="inline-flex items-center justify-end">Comentários<SortIcon col="comentarios" /></span>
                  </th>
                  <th className="py-3 px-4 text-left text-[10px] font-semibold uppercase tracking-wider text-[hsl(215,15%,45%)]">Tipo</th>
                  <th
                    className="py-3 px-4 text-center text-[10px] font-semibold uppercase tracking-wider text-[hsl(215,15%,45%)] cursor-pointer select-none hover:text-[hsl(210,40%,80%)] transition-colors"
                    onClick={() => handleSort("data_postagem")}
                  >
                    <span className="inline-flex items-center justify-center">Data<SortIcon col="data_postagem" /></span>
                  </th>
                  <th className="py-3 px-4 text-center text-[10px] font-semibold uppercase tracking-wider text-[hsl(215,15%,45%)]">Link</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(({ post, owner }, idx) => (
                  <tr key={idx} className="border-b border-[hsl(220,15%,10%)] last:border-b-0 transition-colors hover:bg-[hsl(220,20%,10%)]">
                    <td className="py-3 px-4">
                      <img
                        src={`https://images.weserv.nl/?url=${encodeURIComponent(post.thumbnail || "")}`}
                        alt={`Post ${idx + 1}`}
                        className="w-14 h-14 rounded-lg object-cover"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    </td>
                    {selected === GERAL && (
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://images.weserv.nl/?url=${encodeURIComponent(getFoto(owner) || "")}`}
                            className="w-5 h-5 rounded-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                          <span className="text-xs font-semibold">{getLabel(owner)}</span>
                        </div>
                      </td>
                    )}
                    <td className="py-3 px-4 text-right font-display text-sm font-bold">
                      {formatNum(post.views)}
                    </td>
                    <td className="py-3 px-4 text-right font-display text-sm font-bold">
                      {formatNum(post.likes)}
                    </td>
                    <td className="py-3 px-4 text-right font-display text-sm font-bold">
                      {formatNum(post.comentarios)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={`text-[10px] font-semibold ${tipoBadge[post.tipo] || ""}`}>
                        {post.tipo}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center text-xs text-[hsl(215,15%,50%)]">
                      {formatDate(post.data_postagem)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-[10px] gap-1 px-2.5 border-[hsl(220,15%,14%)] bg-transparent hover:bg-[hsl(220,20%,12%)]"
                        onClick={() => window.open(post.url_post, "_blank")}
                      >
                        Ver post
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsTable;
