import { useState, useRef } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

const sanitize = (v: string) => v.replace(/@/g, "").trim();

const TagInput = ({ tags, onTagsChange, placeholder = "nomedaconta", maxTags = 1 }: TagInputProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    const value = sanitize(input);
    if (!value || tags.includes(value) || tags.length >= maxTags) return;
    onTagsChange([...tags, value]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onTagsChange(tags.filter((t) => t !== tag));
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex flex-wrap items-center gap-2 min-h-[48px] w-full rounded-xl bg-secondary/50 border border-border/50 px-3 py-2 cursor-text focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 ring-offset-background transition-shadow"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 bg-accent/15 text-accent border border-accent/25 rounded-full px-3 py-1 text-sm font-medium"
        >
          @{tag}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
            className="rounded-full p-0.5 hover:bg-accent/20 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      {tags.length < maxTags && (
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-sm"
        />
      )}
    </div>
  );
};

export default TagInput;
