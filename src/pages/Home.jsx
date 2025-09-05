import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { get, ref } from "firebase/database";
import ProgressChart from "../components/ProgressChart";
import StudyHistoryChart from "../components/StudyHistoryChart";
import { useAuth } from "../contexts/AuthContext";
export const Home = () => {
  const { user, loading } = useAuth();
  return (
    <>
      <div className="p-4 flex flex-col items-center h-full">
        <h1 className="font-bold text-xl">
          Welcome back, {user?.displayName}!
        </h1>
        <div className="flex flex-col gap-2 p-2 flex-1 overflow-auto">
          <ProgressChart values={[2, 0, 0, 540]} />
          <StudyHistoryChart />
        </div>
      </div>
    </>
  );
};
export default Home;
