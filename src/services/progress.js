import { ref, runTransaction, get } from "firebase/database";
import { db } from "./firebase";
import { DateTime, Duration } from "luxon";


export async function updateProgressOnStudy(userId, nextIndex) {
  const todayKey = DateTime.now().setZone("Asia/Tokyo").toFormat("yyyy-MM-dd");
  const progressRef = ref(db, `emr-users/${userId}/progress`);

  await runTransaction(progressRef, (progress) => {
    if (progress === null) {
      // 初回学習時
      return {
        currentIndex: 0,
        repeat: 0,
        streak: 1,
        lastStudiedDate: todayKey,
        dailyActivity: { [todayKey]: true },
      };
    }

    progress.currentIndex = nextIndex;

    if (!progress.dailyActivity) {
      progress.dailyActivity = {};
    }

    // すでに今日学習済みなら streak の更新は不要
    if (progress.dailyActivity[todayKey]) {
      return {
        ...progress,
        dailyActivity: {
          ...progress.dailyActivity,
          [todayKey]: true,
        },
      };
    }

    // 昨日の日付を計算
    const yesterday = DateTime.now().setZone("Asia/Tokyo").minus({ days: 1 });
    const yesterdayKey = yesterday.toFormat("yyyy-MM-dd");

    let newStreak = 1;

    if (progress.lastStudiedDate === yesterdayKey) {
      // 昨日も勉強していた → streakを+1
      newStreak = (progress.streak || 0) + 1;
    } else {
      // 連続が途切れていた → streakリセット
      newStreak = 1;
    }

    return {
      ...progress,
      streak: newStreak,
      lastStudiedDate: todayKey,
      dailyActivity: {
        ...progress.dailyActivity,
        [todayKey]: true,
      },
    };
  });
}

export async function checkLast7Days(userId) {
  const dailyRef = ref(db, `emr-users/${userId}/progress/dailyActivity`);
  const snapshot = await get(dailyRef);
  const data = snapshot.val() || {};

  const results = {};
  for (let i = 6; i >= 0; i--) {
    const d = DateTime.now().setZone("Asia/Tokyo");
    const key = d.minus({ days: i }).toFormat("yyyy-MM-dd"); // yyyy-MM-dd
    results[key] = data[key] === true; // undefined → false
  }

  return results;
}
