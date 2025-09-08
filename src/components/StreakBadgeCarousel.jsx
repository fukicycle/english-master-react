import React, { useEffect, useRef } from "react";
import StreakBadgesLightFixed from "./StreakBadgesLightFixed";

const badgeDays = [5, 10, 20, 30, 60, 100, 150, 200, 250, 300, 365];

export default function StreakBadgeCarousel({ streakCount }) {
  const containerRef = useRef(null);
  const badgeRefs = useRef([]);

  // 最新達成バッジのindex
  const latestIndex = badgeDays.filter((d) => d <= streakCount).length - 1;

  // 最新バッジをセンターにスクロール
  useEffect(() => {
    if (containerRef.current && badgeRefs.current[latestIndex]) {
      const container = containerRef.current;
      const badge = badgeRefs.current[latestIndex];

      const containerWidth = container.offsetWidth;
      const badgeWidth = badge.offsetWidth;
      const badgeLeft = badge.offsetLeft;

      const scrollPos = badgeLeft - containerWidth / 2 + badgeWidth / 2;

      container.scrollTo({
        left: scrollPos,
        behavior: "smooth",
      });
    }
  }, [latestIndex]);

  return (
    <div
      ref={containerRef}
      className="flex gap-4 overflow-x-auto px-4 py-6 w-full snap-x snap-mandatory scrollbar-hide"
    >
      {badgeDays.map((days, idx) => (
        <div
          key={idx}
          className="snap-center flex-shrink-0 h-fit"
          ref={(el) => (badgeRefs.current[idx] = el)}
        >
          <StreakBadgesLightFixed
            streakCount={days}
            isGot={days <= streakCount}
          />
        </div>
      ))}
    </div>
  );
}
