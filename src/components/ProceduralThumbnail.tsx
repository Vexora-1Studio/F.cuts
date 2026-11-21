import React, { useState } from 'react';

interface ProceduralThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  aspectLabel?: string;
}

const THEME_PRESETS: Record<
  string,
  {
    bgFrom: string;
    bgTo: string;
    accentPrimary: string;
    accentSecondary: string;
    motif: 'city' | 'product' | 'kinetic' | 'ui' | 'mountain' | 'perfume' | 'virtual' | 'reels' | 'fashion' | 'dubbing' | 'podcast';
    code: string;
  }
> = {
  'placeholder:tokyo-cyber': {
    bgFrom: '#070910',
    bgTo: '#0B1220',
    accentPrimary: '#00E5FF',
    accentSecondary: '#FF168B',
    motif: 'city',
    code: 'TYO · 24FPS',
  },
  'placeholder:aurapro-ad': {
    bgFrom: '#09070D',
    bgTo: '#140B1C',
    accentPrimary: '#FF168B',
    accentSecondary: '#00E5FF',
    motif: 'product',
    code: 'AURA · STUDIO',
  },
  'placeholder:shorts-kinetic': {
    bgFrom: '#06090D',
    bgTo: '#091822',
    accentPrimary: '#00E5FF',
    accentSecondary: '#FFFFFF',
    motif: 'kinetic',
    code: '9:16 · CUT',
  },
  'placeholder:focuslist-ui': {
    bgFrom: '#07080D',
    bgTo: '#101524',
    accentPrimary: '#00E5FF',
    accentSecondary: '#FF168B',
    motif: 'ui',
    code: 'UI · MOTION',
  },
  'placeholder:swiss-aerial': {
    bgFrom: '#070A0F',
    bgTo: '#0C1624',
    accentPrimary: '#FFFFFF',
    accentSecondary: '#00E5FF',
    motif: 'mountain',
    code: 'ALPS · 4K',
  },
  'placeholder:ai-perfume': {
    bgFrom: '#09070D',
    bgTo: '#180B1E',
    accentPrimary: '#FF168B',
    accentSecondary: '#00E5FF',
    motif: 'perfume',
    code: 'AI · COMMERCIAL',
  },
  'placeholder:ai-virtual-set': {
    bgFrom: '#060A10',
    bgTo: '#081A26',
    accentPrimary: '#00E5FF',
    accentSecondary: '#FF168B',
    motif: 'virtual',
    code: 'AI · VIRTUAL SET',
  },
  'placeholder:ai-reels-pack': {
    bgFrom: '#08080E',
    bgTo: '#170C20',
    accentPrimary: '#FF168B',
    accentSecondary: '#00E5FF',
    motif: 'reels',
    code: 'AI · SHORTS',
  },
  'placeholder:ai-fashion-motion': {
    bgFrom: '#08070B',
    bgTo: '#1A0A1B',
    accentPrimary: '#FF168B',
    accentSecondary: '#FFFFFF',
    motif: 'fashion',
    code: 'AI · IMG2VID',
  },
  'placeholder:ai-dubbing-sync': {
    bgFrom: '#060A0F',
    bgTo: '#0B1726',
    accentPrimary: '#00E5FF',
    accentSecondary: '#FF168B',
    motif: 'dubbing',
    code: 'AI · SYNC',
  },
  'placeholder:ai-podcast-visuals': {
    bgFrom: '#07080C',
    bgTo: '#121022',
    accentPrimary: '#00E5FF',
    accentSecondary: '#FF168B',
    motif: 'podcast',
    code: 'AI · VISUALS',
  },
};

export default function ProceduralThumbnail({
  src,
  alt,
  className = '',
  aspectLabel,
}: ProceduralThumbnailProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const isPlaceholder = !src || src.startsWith('placeholder:');

  if (!isPlaceholder && !imgFailed) {
    return (
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setImgFailed(true)}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  const preset =
    THEME_PRESETS[src] ?? {
      bgFrom: '#07090E',
      bgTo: '#101420',
      accentPrimary: '#00E5FF',
      accentSecondary: '#FF168B',
      motif: 'virtual' as const,
      code: aspectLabel || 'f.cuts · 4K',
    };

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      style={{
        background: `radial-gradient(circle at 75% 25%, ${preset.accentPrimary}22 0%, transparent 55%), radial-gradient(circle at 20% 80%, ${preset.accentSecondary}20 0%, transparent 55%), linear-gradient(135deg, ${preset.bgFrom} 0%, ${preset.bgTo} 100%)`,
      }}
      role="img"
      aria-label={alt}
    >
      <svg
        viewBox="0 0 640 360"
        className="w-full h-full block"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`grad-${preset.motif}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={preset.accentPrimary} stopOpacity="0.85" />
            <stop offset="100%" stopColor={preset.accentSecondary} stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Subtle precision studio grid */}
        <g stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="1">
          <line x1="0" y1="90" x2="640" y2="90" />
          <line x1="0" y1="180" x2="640" y2="180" />
          <line x1="0" y1="270" x2="640" y2="270" />
          <line x1="160" y1="0" x2="160" y2="360" />
          <line x1="320" y1="0" x2="320" y2="360" />
          <line x1="480" y1="0" x2="480" y2="360" />
        </g>

        {/* Motif Artwork */}
        {preset.motif === 'city' && (
          <g>
            <rect x="85" y="130" width="58" height="230" fill="#0F1420" stroke="#1E273B" />
            <rect x="160" y="85" width="76" height="275" fill="#121827" stroke={preset.accentPrimary} strokeOpacity="0.45" />
            <rect x="255" y="110" width="66" height="250" fill="#0E131E" stroke={preset.accentSecondary} strokeOpacity="0.5" />
            <rect x="342" y="65" width="90" height="295" fill="#131928" stroke="#28344E" />
            <rect x="450" y="140" width="74" height="220" fill="#0D121C" stroke={preset.accentPrimary} strokeOpacity="0.35" />
            <line x1="175" y1="115" x2="220" y2="115" stroke={preset.accentPrimary} strokeWidth="4" />
            <line x1="270" y1="145" x2="306" y2="145" stroke={preset.accentSecondary} strokeWidth="4" />
            <line x1="360" y1="100" x2="414" y2="100" stroke="#FFFFFF" strokeWidth="3" strokeOpacity="0.7" />
          </g>
        )}

        {(preset.motif === 'product' || preset.motif === 'perfume') && (
          <g transform="translate(320, 180)">
            <circle cx="0" cy="0" r="118" fill="none" stroke={preset.accentPrimary} strokeOpacity="0.3" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="88" fill="none" stroke={preset.accentSecondary} strokeOpacity="0.5" strokeWidth="2" strokeDasharray="10 8" />
            <polygon points="0,-68 58,0 0,68 -58,0" fill="#0C0E14" stroke={`url(#grad-${preset.motif})`} strokeWidth="2.5" />
            <polygon points="0,-42 36,0 0,42 -36,0" fill={preset.accentPrimary} fillOpacity="0.16" />
          </g>
        )}

        {(preset.motif === 'kinetic' || preset.motif === 'reels') && (
          <g>
            <rect x="235" y="36" width="170" height="288" rx="14" fill="#0B0D14" stroke={preset.accentPrimary} strokeWidth="2" />
            <rect x="255" y="76" width="130" height="24" rx="4" fill={preset.accentPrimary} fillOpacity="0.9" />
            <rect x="255" y="114" width="102" height="18" rx="4" fill="#FFFFFF" fillOpacity="0.85" />
            <rect x="255" y="146" width="118" height="18" rx="4" fill={preset.accentSecondary} fillOpacity="0.85" />
            <line x1="255" y1="245" x2="385" y2="245" stroke="#252B3D" strokeWidth="4" />
            <line x1="255" y1="245" x2="335" y2="245" stroke={preset.accentPrimary} strokeWidth="4" />
          </g>
        )}

        {(preset.motif === 'ui' || preset.motif === 'virtual') && (
          <g>
            <rect x="120" y="64" width="400" height="232" rx="10" fill="#0B0E16" stroke="#242C40" strokeWidth="2" />
            <rect x="144" y="88" width="150" height="106" rx="6" fill="#131928" stroke={preset.accentPrimary} strokeOpacity="0.65" />
            <rect x="312" y="88" width="184" height="46" rx="6" fill="#141926" stroke={preset.accentSecondary} strokeOpacity="0.5" />
            <rect x="312" y="148" width="184" height="46" rx="6" fill="#141926" stroke="#273147" />
            <rect x="144" y="216" width="352" height="52" rx="6" fill="#080A10" stroke="#21283B" />
            <rect x="164" y="232" width="110" height="20" rx="3" fill={preset.accentPrimary} fillOpacity="0.8" />
            <rect x="286" y="232" width="130" height="20" rx="3" fill={preset.accentSecondary} fillOpacity="0.75" />
            <line x1="330" y1="208" x2="330" y2="276" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        )}

        {preset.motif === 'mountain' && (
          <g>
            <polygon points="40,320 205,120 350,320" fill="#0D1522" stroke={preset.accentSecondary} strokeWidth="2" strokeOpacity="0.65" />
            <polygon points="220,320 400,85 595,320" fill="#111A2B" stroke={preset.accentPrimary} strokeWidth="2" strokeOpacity="0.7" />
            <polyline points="355,144 400,85 450,149" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.85" />
            <path d="M 60 270 Q 320 225 580 265" fill="none" stroke={preset.accentSecondary} strokeWidth="2" strokeDasharray="6 6" />
          </g>
        )}

        {preset.motif === 'fashion' && (
          <g transform="translate(320, 180)">
            <rect x="-110" y="-110" width="220" height="220" rx="4" fill="none" stroke={preset.accentPrimary} strokeWidth="2" transform="rotate(14)" />
            <rect x="-95" y="-95" width="190" height="190" rx="4" fill="#0E0B14" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.5" transform="rotate(-8)" />
            <circle cx="0" cy="0" r="44" fill={preset.accentPrimary} fillOpacity="0.22" stroke={preset.accentPrimary} strokeWidth="2" />
          </g>
        )}

        {(preset.motif === 'dubbing' || preset.motif === 'podcast') && (
          <g transform="translate(80, 180)">
            {[18, 44, 72, 32, 96, 58, 112, 82, 38, 92, 64, 108, 48, 76, 30, 62, 42, 22].map((h, i) => (
              <rect
                key={i}
                x={i * 27}
                y={-h / 2}
                width="14"
                height={h}
                rx="3"
                fill={i % 3 === 0 ? preset.accentPrimary : i % 3 === 1 ? preset.accentSecondary : '#F5F7FA'}
                fillOpacity={i % 3 === 2 ? 0.85 : 0.9}
              />
            ))}
          </g>
        )}

        {/* Camera viewfinder corner brackets */}
        <g stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.5" fill="none">
          <path d="M 24 44 L 24 24 L 44 24" />
          <path d="M 596 24 L 616 24 L 616 44" />
          <path d="M 24 316 L 24 336 L 44 336" />
          <path d="M 596 336 L 616 336 L 616 316" />
        </g>

        {/* Subtle technical frame stamp */}
        <text
          x="36"
          y="46"
          fill="#FFFFFF"
          fillOpacity="0.55"
          fontSize="11"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="700"
          letterSpacing="1.2"
        >
          {preset.code}
        </text>
      </svg>
    </div>
  );
}
