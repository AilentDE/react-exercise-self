import { useTheme } from "../providers/theme/hook";

import IconSun from "./icons/Sun";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex w-full min-h-4 justify-end">
      <button className="p-2 text-sm" onClick={toggleTheme}>
        <IconSun
          className="size-4"
          fill={theme === "light" ? "#231F20" : "#fff"}
        />
      </button>
    </header>
  );
};

export default Header;
