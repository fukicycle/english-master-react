import ProgressChart from "../components/ProgressChart";
import StudyHistoryChart from "../components/StudyHistoryChart";
import { useAuth } from "../contexts/AuthContext";
import StreakWidget from "../components/StreakWidget";

export const Chart = () => {
  const { user, loading } = useAuth();
  return (
    <>
      <div className="p-4 flex flex-col items-center h-full">
        <h1 className="font-bold text-xl">
          Study chart of {user?.displayName}
        </h1>
        <div className="flex flex-col gap-2 p-2 flex-1 overflow-auto w-full">
          <ProgressChart />
          <StudyHistoryChart />
        </div>
      </div>
    </>
  );
};
export default Chart;
