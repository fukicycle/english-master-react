import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Study } from "./pages/Study";
import { Words } from "./pages/Words";
import BottomNavMenu from "./components/BottomNavMenu";
import Login from "./components/Login";
import { LiaSignInAltSolid } from "react-icons/lia";
import { handleLAnonymousToGoogleUser, handleLogout } from "./services/auth";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import { useTheme } from "./contexts/ThemeContext";
import { getLevelWithRepeatNumber } from "./services/level";
import { ref, get } from "firebase/database";
import { db } from "./services/firebase";

function App() {
  const { user, loading } = useAuth();
  const { theme, setTheme } = useTheme();

  const setThemeFromDatabase = async () => {
    try {
      const userId = user.uid;
      const progressRepeatRef = ref(db, `emr-users/${userId}/progress/repeat`);
      const snapshot = await get(progressRepeatRef);
      const repeat = snapshot.val() || 0;
      const level = getLevelWithRepeatNumber(repeat);
      setTheme(level);
      localStorage.setItem("level", level);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    const level = localStorage.getItem("level");
    if (level) {
      setTheme(level);
    } else {
      setThemeFromDatabase();
    }
  });

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-dvh flex justify-center items-center bg-gray-400/50">
          <div className="loader border-r-2 border-2 border-transparent border-r-[var(--color-accent)]"></div>
        </div>
      ) : (
        !user && <Login />
      )}
      <div className="h-full bg-[var(--color-bg)] text-[var(--color-text)] font-Montserrat flex flex-col pb-safe">
        <div className="bg-[var(--color-accent)] shadow-xl p-2 flex items-center justify-between h-16">
          <Link to="/" className=" text-white text-xl text-bold">
            English Master
          </Link>
          {user && !user.isAnonymous ? (
            <img
              src={user.photoURL}
              className="rounded-full h-full shadow-md"
              onClick={handleLogout}
            />
          ) : (
            <button className="btn-icon" onClick={handleLAnonymousToGoogleUser}>
              <LiaSignInAltSolid className="size-8" />
            </button>
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study" element={<Study />} />
            <Route path="/words" element={<Words />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <BottomNavMenu />
      </div>
    </>
  );
}

export default App;
