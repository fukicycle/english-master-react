import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { ref, get } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
ChartJS.register(ArcElement, Tooltip, Legend);
const ProgressChart = ({ values }) => {
  const { user, loading } = useAuth();
  const [progress, setProgress] = useState(0.0);
  const calculateProgress = async (currentUser) => {
    if (!currentUser) {
      setProgress(0.0);
      setCalculating(false);
      return;
    }

    try {
      const progressRef = ref(db, `emr-users/${currentUser.uid}/progress`);
      const progressSnapshot = await get(progressRef);
      const progressData = progressSnapshot.val();

      const wordsRef = ref(db, "words");
      const wordsSnapshot = await get(wordsRef);
      const totalWords = wordsSnapshot.size;

      if (progressData && totalWords > 0) {
        const ratio = Math.round(
          (progressData.currentIndex / totalWords) * 100.0
        );
        setProgress(ratio);
      } else {
        // データが存在しない場合のデフォルト値
        setProgress(0.0);
      }
    } catch (e) {
      console.error("Error calculating progress:", e);
      setProgress(0.0);
    }
  };

  // 2. useEffectを一つにまとめ、依存配列に`user`と`loading`を追加
  useEffect(() => {
    // ローディングが完了し、ユーザー情報が確定した時点で計算を実行
    if (!loading) {
      calculateProgress(user);
    }
  }, [user, loading]);
  const backgroundColors = ["#14B8A6", "#3B82F6", "#F59E0B", "#E5E7EB"];
  const data = {
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors.map((color) => `${color}7F`),
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="relative w-full h-full flex-1 min-h-40">
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <Doughnut data={data} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          {!user ? (
            <p className="text-6xl font-black">-%</p>
          ) : (
            <p className="text-6xl font-black">{progress}%</p>
          )}
        </div>
      </div>
      <div className="flex w-full justify-center gap-4">
        <p className="bg-teal-400/50 px-2 rounded border border-teal-400">
          easy
        </p>
        <p className="bg-blue-400/50 px-2 rounded border border-blue-400">
          normal
        </p>
        <p className="bg-amber-400/50 px-2 rounded border border-amber-400">
          hard
        </p>
        <p className="bg-gray-200/50 px-2 rounded border border-gray-200">
          not study
        </p>
      </div>
    </>
  );
};

export default ProgressChart;
