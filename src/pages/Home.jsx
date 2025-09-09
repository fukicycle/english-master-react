import { useAuth } from "../contexts/AuthContext";
import StreakWidget from "../components/StreakWidget";
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { db } from "../services/firebase";
import { checkLast7Days } from "../services/progress";
import Modal from "../components/Modal";

export const Home = () => {
  const { user, loading } = useAuth();
  const [streak, setStreak] = useState(1);
  const [dailyActivity, setDailyActivity] = useState(null);
  const [isShow, setIsShow] = useState(true);
  useEffect(() => {
    const getDaysInStudy = async () => {
      if (user) {
        const streakRef = ref(db, `emr-users/${user.uid}/progress/streak`);
        const snapshot = await get(streakRef);
        const streak = snapshot.val() || 0;
        setStreak(streak);
      }
    };
    const getDailyActivity = async () => {
      if (user) {
        const dailyAcitivity = await checkLast7Days(user.uid);
        setDailyActivity(dailyAcitivity);
      }
    };
    getDailyActivity();
    getDaysInStudy();
  }, [user]);
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
      </Modal>
    </>
  );
};
export default Home;
