import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeWatcher() {
  const { theme } = useTheme();

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;

    if (theme === "level1") {
      meta.setAttribute("content", "#10b981"); // emerald-400
    } else if (theme === "level2") {
      meta.setAttribute("content", "#0ea5e9"); // sky-500
    } else if (theme === "level3") {
      meta.setAttribute("content", "#a855f7"); // purple-500
    }
  }, [theme]);

  return null; // UIに何も描画しない
}
