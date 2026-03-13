import { useState } from "react";
import { FileText, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PostData {
  tipo: string;
  views: number;
  likes: number;
  comentarios: number;
  thumbnail: string;
  url_post: string;
  data_postagem: string;
  legenda?: string;
  _account?: string;
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

const tipoBadge: Record<string, { bg: string; text: string; glow: string }> = {
  Reel: { bg: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(139,92,246,0.1))", text: "#A78BFA", glow: "0 0 12px rgba(139,92,246,0.3)" },
  Imagem: { bg: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(59,130,246,0.1))", text: "#60A5FA", glow: "0 0 12px rgba(59,130,246,0.3)" },
  Carrossel: { bg: "linear-gradient(135deg, rgba(249,115,22,0.25), rgba(249,115,22,0.1))", text: "#FB923C", glow: "0 0 12px rgba(249,115,22,0.3)" },
};

function getPosts(perfil: Record<string, any>, accountKey?: string): PostData[] {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((i) => {
      const raw = perfil[`post${i}`];
      if (raw === null || raw === undefined || raw === 0) return null;
      try {
        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
        return { ...parsed, _account: accountKey };
      } catch {
        return null;
      }
    })
    .filter(Boolean) as PostData[];
}

type SortKey = "likes" | "comentarios" | "data_postagem" | null;
type SortDir = "asc" | "desc";

const PostsTable = ({ profiles, profileNames, getLabel, getFoto }: PostsTableProps) => {
  const [filter, setFilter] = useState("geral");
  const [sortKey, setSortKey] = useState<SortKey>("likes");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Collect posts
  let posts: PostData[] = [];
  if (filter === "geral") {
    profileNames.forEach((name) => {
      posts.push(...getPosts(profiles[name], name));
    });
  } else {
    posts = getPosts(profiles[filter], filter);
  }

  // Sort
  const sorted = [...posts];
  if (sortKey) {
    sorted.sort((a, b) => {
      let va: number, vb: number;
      if (sortKey === "data_postagem") {
        va = new Date(a.data_postagem || "1970-01-01").getTime();
        vb = new Date(b.data_postagem || "1970-01-01").getTime();
      } else {
        va = Number(a[sortKey]) || 0;
        vb = Number(b[sortKey]) || 0;
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

  const thBase = "py-3 px-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-[hsl(215,15%,45%)]";
  const thSortable = `${thBase} text-right cursor-pointer select-none hover:text-[hsl(210,40%,80%)] transition-colors duration-200`;

  return (
    <div className="mt-10">
      <div
        className="rounded-2xl overflow-hidden border border-[hsl(220,15%,14%)]/50 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm"
        style={{ boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.5)" }}
      >
        {/* Header with title + dropdown INSIDE the block */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[hsl(230,80%,70%)]" />
            <h2 className="font-display text-lg font-bold">Ranking de Posts</h2>
            <span className="text-[10px] text-[hsl(215,15%,40%)] font-medium ml-1">
              {sorted.length} {sorted.length === 1 ? "post" : "posts"}
            </span>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px] h-8 text-xs border-[hsl(220,15%,14%)] bg-[hsl(220,20%,6%)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="geral" className="text-xs">
                <span className="font-medium">Geral</span>
              </SelectItem>
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
          <div className="p-8 text-center">
            <p className="text-[hsl(215,15%,45%)] text-sm">Sem posts nos últimos 3 meses</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[hsl(220,15%,14%)] bg-[hsl(220,20%,5%)]/80">
                  <th className={`${thBase} text-left`}>Conta</th>
                  <th className={`${thBase} text-left`}>Capa</th>
                  <th className={`${thBase} text-left`}>Legenda</th>
                  <th className={thSortable} onClick={() => handleSort("likes")}>
                    <span className="inline-flex items-center justify-end">Likes<SortIcon col="likes" /></span>
                  </th>
                  <th className={thSortable} onClick={() => handleSort("comentarios")}>
                    <span className="inline-flex items-center justify-end">Comentários<SortIcon col="comentarios" /></span>
                  </th>
                  <th className={`${thBase} text-left`}>Tipo</th>
                  <th
                    className={`${thBase} text-center cursor-pointer select-none hover:text-[hsl(210,40%,80%)] transition-colors duration-200`}
                    onClick={() => handleSort("data_postagem")}
                  >
                    <span className="inline-flex items-center justify-center">Data<SortIcon col="data_postagem" /></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((post, idx) => {
                  const badge = tipoBadge[post.tipo];
                  const accountLabel = post._account ? getLabel(post._account) : "";
                  const accountFoto = post._account ? getFoto(post._account) : undefined;
                  return (
                    <tr
                      key={idx}
                      className="border-b border-[hsl(220,15%,10%)] last:border-b-0 transition-all duration-200 hover:bg-[hsl(230,30%,12%)]/60"
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px -2px hsl(230 80% 65% / 0.08)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                    >
                      {/* Conta */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {accountFoto && (
                            <img
                              src={`https://images.weserv.nl/?url=${encodeURIComponent(accountFoto)}`}
                              className="w-5 h-5 rounded-full object-cover"
                              onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                          )}
                          <span className="text-xs text-[hsl(215,15%,60%)] font-medium">{accountLabel}</span>
                        </div>
                      </td>
                      {/* Capa */}
                      <td className="py-3 px-4">
                        <a href={post.url_post} target="_blank" rel="noopener noreferrer">
                          <img
                            src={`https://images.weserv.nl/?url=${encodeURIComponent(post.thumbnail || "")}`}
                            alt={`Post ${idx + 1}`}
                            className="w-14 h-14 rounded-lg object-cover border border-transparent hover:border-[hsl(230,80%,65%)]/30 transition-colors duration-200 cursor-pointer"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                        </a>
                      </td>
                      {/* Legenda */}
                      <td className="py-3 px-4 max-w-[200px]">
                        <span className="text-xs text-[hsl(215,15%,60%)] line-clamp-2">
                          {post.legenda || "—"}
                        </span>
                      </td>
                      {/* Likes */}
                      <td className="py-3 px-4 text-right font-display text-sm font-semibold">
                        {formatNum(post.likes)}
                      </td>
                      {/* Comentários */}
                      <td className="py-3 px-4 text-right font-display text-sm font-semibold">
                        {formatNum(post.comentarios)}
                      </td>
                      {/* Tipo */}
                      <td className="py-3 px-4">
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold border border-transparent"
                          style={{
                            background: badge?.bg || "rgba(100,100,100,0.2)",
                            color: badge?.text || "#aaa",
                            boxShadow: badge?.glow || "none",
                          }}
                        >
                          {post.tipo}
                        </span>
                      </td>
                      {/* Data */}
                      <td className="py-3 px-4 text-center text-xs text-[hsl(215,15%,50%)] font-normal">
                        {formatDate(post.data_postagem)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsTable;