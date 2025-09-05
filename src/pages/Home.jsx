import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { get, ref } from "firebase/database";
import DifficultyChart from "../components/DifficultyChart";
export const Home = () => {
  const [progress, setProgress] = useState(0.0);
  const [loading, setLoading] = useState(true);
  const getWordCount = async () => {
    const wordsRef = ref(db, "words");
    const snapshot = await get(wordsRef);
    return snapshot.size;
  };
  const calculateProgress = async () => {
    if (!auth.currentUser) return 0.0;
    setLoading(true);
    const progressRef = ref(db, `emr-users/${auth.currentUser.uid}/progress`);
    const snapshot = await get(progressRef);
    const progress = snapshot.val();
    const size = await getWordCount();
    const ratio = Math.round((progress.currentIndex / size) * 100.0);
    setProgress(ratio);
    setLoading(false);
  };

  useEffect(() => calculateProgress, []);
  return (
    <>
      <div className="p-4 flex flex-col items-center h-full">
        <h1 className="font-bold text-xl">
          Welcome back, {auth.currentUser?.displayName}!
        </h1>
        <div className="relative w-full flex-1">
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <DifficultyChart values={[2, 0, 0, 520]} />
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            {loading ? (
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
      </div>
    </>
  );
};
export default Home;
