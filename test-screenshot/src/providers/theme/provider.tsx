import { useState, useEffect, ReactNode } from "react";
import { ThemeContext } from "./ctx";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    // document.documentElement.style.backgroundColor =
    //   theme === "light" ? "#fff" : "#333";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`${
          theme === "light"
            ? "bg-gray-50 text-gray-950"
            : "bg-gray-950 text-gray-50"
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
