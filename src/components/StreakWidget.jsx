import StreakBadgeCarousel from "../components/StreakBadgeCarousel";
// ダミーデータ
const days = [
  { date: "Mon", studied: true },
  { date: "Tue", studied: true },
  { date: "Wed", studied: true },
  { date: "Thu", studied: true },
  { date: "Fri", studied: true },
  { date: "Sat", studied: false },
  { date: "Sun", studied: false },
];

export default function StreakWidget({ streakCount = 4 }) {
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* 連続日数 */}
      <div className="text-6xl font-extrabold text-[var(--color-accent)]">
        {streakCount}Days
      </div>
      <div className="text-gray-600 font-JP">連続学習中</div>

      {/* 7日間ブロック */}
      <div className="flex gap-1">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`w-6 h-6 rounded transition-colors duration-300 ${
              day.studied ? "bg-[var(--color-accent)]" : "bg-gray-300"
            }`}
            title={day.date}
          ></div>
        ))}
      </div>
      <StreakBadgeCarousel streakCount={streakCount} />
    </div>
  );
}
