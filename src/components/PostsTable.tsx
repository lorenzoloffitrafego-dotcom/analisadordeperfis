import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PostData {
  numero: number;
  tipo: string;
  views: number;
  likes: number;
  comentarios: number;
  compartilhamentos: number;
  thumbnail: string;
  url_post: string;
  data_postagem: string;
}

interface PostsTableProps {
  perfil: Record<string, any>;
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
  Reel: "bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/20",
  Imagem: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/20",
  Carrossel: "bg-[#F97316]/15 text-[#F97316] border-[#F97316]/20",
};

const PostsTable = ({ perfil }: PostsTableProps) => {
  const posts: PostData[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((i) => {
      const raw = perfil[`post${i}`];
      if (!raw || raw === "0") return null;
      try {
        return typeof raw === "string" ? JSON.parse(raw) : raw;
      } catch {
        return null;
      }
    })
    .filter(Boolean) as PostData[];

  if (posts.length === 0) {
    return (
      <div className="glass-surface rounded-2xl tactile-shadow p-8 text-center">
        <p className="text-muted-foreground text-sm">Sem posts nos últimos 3 meses</p>
      </div>
    );
  }

  return (
    <div className="glass-surface rounded-2xl tactile-shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="py-3 px-4 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Post
              </th>
              <th className="py-3 px-4 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Tipo
              </th>
              <th className="py-3 px-4 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Views
              </th>
              <th className="py-3 px-4 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Likes
              </th>
              <th className="py-3 px-4 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Comentários
              </th>
              <th className="py-3 px-4 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Data
              </th>
              <th className="py-3 px-4 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr
                key={idx}
                className="border-b border-border/30 last:border-b-0 transition-colors hover:bg-muted/20"
              >
                <td className="py-3 px-4">
                  <img
                    src={post.thumbnail}
                    alt={`Post ${post.numero}`}
                    className="w-14 h-14 rounded-lg object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </td>
                <td className="py-3 px-4">
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-semibold ${tipoBadge[post.tipo] || ""}`}
                  >
                    {post.tipo}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right font-display text-sm font-bold text-foreground">
                  {formatNum(post.views)}
                </td>
                <td className="py-3 px-4 text-right font-display text-sm font-bold text-foreground">
                  {formatNum(post.likes)}
                </td>
                <td className="py-3 px-4 text-right font-display text-sm font-bold text-foreground">
                  {formatNum(post.comentarios)}
                </td>
                <td className="py-3 px-4 text-center text-xs text-muted-foreground">
                  {formatDate(post.data_postagem)}
                </td>
                <td className="py-3 px-4 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-[10px] gap-1 px-2.5"
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
  );
};

export default PostsTable;
