import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Study } from "./pages/Study";
import { Words } from "./pages/Words";
import BottomNavMenu from "./components/BottomNavMenu";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import { LiaSignInAltSolid } from "react-icons/lia";
import { handleLAnonymousToGoogleUser,handleLogout } from "./services/auth";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {!user && <Login />}
      <div className="h-dvh bg-gray-50 font-Montserrat flex flex-col pb-safe">
        <div className="bg-sky-500 shadow-xl p-2 flex items-center justify-between h-16">
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
