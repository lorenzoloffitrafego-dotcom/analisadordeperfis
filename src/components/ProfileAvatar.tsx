import { useState, useEffect } from "react";

interface ProfileAvatarProps {
  /** Display label/name. Used for the initial fallback. */
  label: string;
  /** Profile picture URL (raw, will be proxied). */
  foto?: string | null;
  /** Diameter in pixels. Defaults to 32. */
  size?: number;
  /** Optional border color (used on image and the fallback ring). */
  ringColor?: string;
  className?: string;
}

const FALLBACK_BG = "hsl(258, 30%, 92%)";
const FALLBACK_TEXT = "hsl(258, 50%, 35%)";

const ProfileAvatar = ({ label, foto, size = 32, ringColor, className = "" }: ProfileAvatarProps) => {
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [foto]);

  const initial = (label || "?").trim().charAt(0).toUpperCase();
  const showImage = !!foto && !errored;
  const border = ringColor ? `1.5px solid ${ringColor}` : undefined;

  if (!showImage) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full shrink-0 font-display font-semibold select-none ${className}`}
        style={{
          width: size,
          height: size,
          background: FALLBACK_BG,
          color: FALLBACK_TEXT,
          fontSize: Math.max(10, Math.round(size * 0.42)),
          border,
        }}
        aria-label={label}
      >
        {initial}
      </span>
    );
  }

  return (
    <img
      src={`https://images.weserv.nl/?url=${encodeURIComponent(foto!)}`}
      alt={label}
      className={`rounded-full object-cover shrink-0 ${className}`}
      style={{ width: size, height: size, border }}
      onError={() => setErrored(true)}
    />
  );
};

export default ProfileAvatar;
