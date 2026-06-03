import { useState } from "react";

interface ProfileAvatarProps {
  foto?: string;
  label: string;
  size?: number;
  borderColor?: string;
}

/**
 * Circular profile avatar. Falls back to an initial-letter circle
 * when no `foto` is provided or when the image fails to load.
 */
const ProfileAvatar = ({ foto, label, size = 32, borderColor }: ProfileAvatarProps) => {
  const [failed, setFailed] = useState(false);
  const initial = (label || "?").trim().charAt(0).toUpperCase() || "?";

  const baseStyle: React.CSSProperties = {
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    border: borderColor ? `1.5px solid ${borderColor}` : undefined,
  };

  if (!foto || failed) {
    return (
      <span
        className="rounded-full shrink-0 inline-flex items-center justify-center font-semibold text-white select-none"
        style={{
          ...baseStyle,
          background: "hsl(258, 80%, 62%)",
          fontSize: Math.max(10, Math.round(size * 0.42)),
        }}
        aria-label={label}
      >
        {initial}
      </span>
    );
  }

  return (
    <img
      src={`https://images.weserv.nl/?url=${encodeURIComponent(foto)}`}
      alt={label}
      className="rounded-full object-cover shrink-0"
      style={baseStyle}
      onError={() => setFailed(true)}
    />
  );
};

export default ProfileAvatar;
