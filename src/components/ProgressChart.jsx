import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { ref,get } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
ChartJS.register(ArcElement, Tooltip, Legend);
const ProgressChart = ({ values }) => {
  const { user, loading } = useAuth();
  const [progress, setProgress] = useState(0.0);
  const [calculating, setCulculating] = useState(true);
  const getWordCount = async () => {
    const wordsRef = ref(db, "words");
    const snapshot = await get(wordsRef);
    return snapshot.size;
  };
  const calculateProgress = async () => {
    if (!user) return 0.0;
    setCulculating(true);
    const progressRef = ref(db, `emr-users/${user.uid}/progress`);
    const snapshot = await get(progressRef);
    const progress = snapshot.val();
    const size = await getWordCount();
    const ratio = Math.round((progress.currentIndex / size) * 100.0);
    setProgress(ratio);
    setCulculating(false);
  };
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
  useEffect(() => calculateProgress, []);

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
