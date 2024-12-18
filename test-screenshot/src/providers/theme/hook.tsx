import { useContext } from "react";
import { ThemeContext } from "./ctx";

export const useTheme = () => useContext(ThemeContext);
