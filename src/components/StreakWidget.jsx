import { useEffect, useState } from "react";
import StreakBadgeCarousel from "../components/StreakBadgeCarousel";

export default function StreakWidget({ streakCount, dailyActivity }) {
  const dummy = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* 連続日数 */}
      <div className="text-6xl font-extrabold text-[var(--color-accent)]">
        {streakCount}
        {streakCount <= 1 ? "Day" : "Days"}
      </div>
      <div className="text-gray-600 font-JP">連続学習中</div>

      {/* 7日間ブロック */}
      <div className="flex gap-2">
        {dailyActivity ? (
          <>
            {Object.entries(dailyActivity).map(([date, studied]) => (
              <div key={date} className="flex flex-col gap-2">
                <div
                  className={`w-8 h-8 rounded transition-colors duration-300 ${
                    studied ? "bg-[var(--color-accent)]" : "bg-gray-300"
                  }`}
                ></div>
                <p className="text-center text-xs h-4">
                  {new Date(date).toDateString().slice(0, 3)}
                </p>
              </div>
            ))}
          </>
        ) : (
          <>
            {dummy.map((data, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="w-8 h-8 rounded animation-pulse bg-gray-200"></div>
                <p className="h-4 bg-gray-200 animation-pulse rounded-xl"></p>
              </div>
            ))}
          </>
        )}
      </div>
      <StreakBadgeCarousel streakCount={streakCount} />
    </div>
  );
}
