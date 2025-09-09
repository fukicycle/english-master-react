import React from "react";

const badgeList = [
  { days: 5, borderColor: "#FBBF24" },
  { days: 10, borderColor: "#F59E0B" },
  { days: 20, borderColor: "#FB923C" },
  { days: 30, borderColor: "#EA580C" },
  { days: 60, borderColor: "#2563EB" },
  { days: 100, borderColor: "#9333EA" },
  { days: 150, borderColor: "#D97706" },
  { days: 200, borderColor: "#FBBF24" },
  { days: 250, borderColor: "#F59E0B" },
  { days: 300, borderColor: "#EAB308" },
  { days: 365, borderColor: "#FFD700" },
];

export default function StreakBadgesLightFixed({
  streakCount,
  isGot,
  isNew = false,
}) {
  return (
    <div
      className={`flex items-center justify-center relative transform transition-all duration-500 ${
        isGot ? "animate-pulse" : "animate-none"
      } ${isNew ? "w-28 h-28" : "w-20 h-20"}`}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <clipPath id="hexClip">
            <polygon points="50,5 93,25 93,75 50,95 7,75 7,25" />
          </clipPath>

          <filter id="glass" x="0" y="0" width="100%" height="100%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#ffffff" floodOpacity="0.3" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="sparkGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ライトグラスモーフィズム背景 */}
        <rect
          width="100"
          height="100"
          rx="12"
          ry="12"
          fill="rgba(255,255,255,0.4)"
          filter="url(#glass)"
          clipPath="url(#hexClip)"
        />

        {/* Border */}
        <polygon
          points="50,5 93,25 93,75 50,95 7,75 7,25"
          fill="none"
          stroke={
            isGot
              ? badgeList.find((day) => day.days == streakCount).borderColor
              : "#EEEEEE"
          }
          strokeWidth="4"
        />

        {/* 中央の数字 */}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontFamily="'Montserrat', sans-serif"
          fontWeight="100"
          fontSize="22"
          fill={isGot ? "#111111" : "#CCCCCC"}
        >
          {streakCount}
        </text>

        {/* キラキラ粒子アニメーション（365日達成時のみ） */}
        {isGot &&
          streakCount === 365 &&
          [...Array(8)].map((_, i) => {
            const angle = (i / 8) * 2 * Math.PI;
            const radius = 40;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            const dur = 1 + Math.random();

            return (
              <circle key={i} cx={x} cy={y} r="2" fill="url(#sparkGrad)">
                <animate
                  attributeName="r"
                  values="2;5;2"
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="1;0.2;1"
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
      </svg>
    </div>
  );
}
