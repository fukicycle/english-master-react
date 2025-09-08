import { useAuth } from "../contexts/AuthContext";
import StreakWidget from "../components/StreakWidget";

export const Home = () => {
  const { user, loading } = useAuth();
  return (
    <>
      <div className="p-4 flex flex-col items-center h-full">
        <h1 className="font-bold text-xl">
          Welcome back, {user?.displayName}!
        </h1>
        <div className="flex gap-2 p-2 flex-1 items-center w-full overflow-x-hidden">
          <StreakWidget streakCount={400} />
        </div>
      </div>
    </>
  );
};
export default Home;
