import { useContext,useState,createContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("level1");

    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div data-theme={theme} className="h-dvh">
          {children}
        </div>
      </ThemeContext.Provider>
    );
};

export const useTheme = () =>{
    const ctx = useContext(ThemeContext);
    if(!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
};
