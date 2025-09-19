import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import StreakWidget from "../components/StreakWidget";
import { useEffect, useState } from "react";
import { get, ref, set, update } from "firebase/database";
import { db } from "../services/firebase";
import { checkLast7Days } from "../services/progress";
import Modal from "../components/Modal";
import StreakBadgesLightFixed from "../components/StreakBadgesLightFixed";
import Cracker from "../components/Cracker";
import { getLevelWithRepeatNumber } from "../services/level";

export const Home = () => {
  const { user, loading } = useAuth();
  const [streak, setStreak] = useState(null);
  const [dailyActivity, setDailyActivity] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const badgeDays = [5, 10, 20, 30, 60, 100, 150, 200, 250, 300, 365];
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const getDaysInStudy = async () => {
      if (user) {
        const streakRef = ref(db, `emr-users/${user.uid}/progress/streak`);
        const snapshot = await get(streakRef);
        const streak = snapshot.val() || 0;
        setStreak(streak);
      }
    };
    const getUserLevel = async () => {
      if (user) {
        let level = localStorage.getItem("level");
        if (level) {
          const repeatRef = ref(db, `emr-users/${user.uid}/progress/repeat`);
          const snapshot = await get(repeatRef);
          const repeat = snapshot.val() || 0;
          level = getLevelWithRepeatNumber(repeat);
        }
        setTheme(level);
      }
    };
    const getDailyActivity = async () => {
      if (user) {
        const dailyAcitivity = await checkLast7Days(user.uid);
        setDailyActivity(dailyAcitivity);
      }
    };
    getUserLevel();
    getDailyActivity();
    getDaysInStudy();
  }, [user]);
  useEffect(() => {
    const updateBadge = async () => {
      if (user && streak) {
        if (badgeDays.includes(streak) || streak == 1) {
          const badgesRef = ref(db, `emr-users/${user.uid}/progress/badges`);
          const snapshot = await get(badgesRef);
          const badges = snapshot.val() || {};
          const myBadges = Object.entries(badges).map(([day, isGot]) => ({
            day,
            isGot,
          }));
          const target = myBadges.find((badge) => badge.day == streak);
          if (!target && streak != 1) {
            setIsShow(true);
            const updateData = {
              [streak]: true,
            };
            await update(badgesRef, updateData);
          } else if (streak == 1) {
            await set(badgesRef, null);
          }
        }
      }
    };
    updateBadge();
  }, [streak]);
  return (
    <>
      <div className="p-4 flex flex-col items-center h-full">
        <h1 className="font-bold text-xl">
          Welcome back, {user?.displayName}!
        </h1>
        <div className="flex gap-2 p-2 flex-1 items-center w-full overflow-x-hidden">
          <StreakWidget streakCount={streak} dailyActivity={dailyActivity} />
        </div>
      </div>
      <Modal isShow={isShow} setIsShow={setIsShow}>
        {badgeDays.includes(streak) && (
          <div className="flex flex-col gap-8 items-center justify-center relative">
            <p className="text-2xl font-bold text-center text-amber-500">
              <p>Congratulations!</p>
              <p>
                You got a new <strong className="font-extrabold">Badge</strong>!
              </p>
            </p>
            <div className="animate-bounce">
              <StreakBadgesLightFixed
                streakCount={streak}
                isGot={true}
                isNew={true}
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
              <Cracker />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
export default Home;
